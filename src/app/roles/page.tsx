'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import * as XLSX from 'xlsx';
import styles from './page.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ResidentInfo {
  nombre: string;
  año: string;
  vacaciones?: string; // e.g. "V 18-29"
}

interface Roster {
  A: ResidentInfo[];
  B: ResidentInfo[];
  C: ResidentInfo[];
  D: ResidentInfo[];
}

interface PatientData {
  nombre: string;
  diagnostico: string;
  cirugia: string;
}

interface SalaData {
  qx: string;
  pacientes: PatientData[];
}

interface Assignment {
  salas: Record<string, string>;
  especiales: Record<string, string>;
  notas?: string;
}

interface HistoryEntry {
  fecha: string;
  guardia: string;
  asignaciones: Record<string, string>;
}

type AgentStatus = 'idle' | 'running' | 'done' | 'error';

const HISTORY_KEY = 'roles_history_v1';
const ROSTER_KEY = 'roles_roster_v1';

const GUARDIA_COLORS: Record<string, string> = {
  A: '#e8f5e9',
  B: '#e3f2fd',
  C: '#f3e5f5',
  D: '#fff8e1',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseRosterFromXLSX(file: File): Promise<Roster> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

        const roster: Roster = { A: [], B: [], C: [], D: [] };

        // Row 0: title, Row 1: guardia headers (A/B/C/D), Row 2+: residents
        for (let i = 2; i < rows.length; i++) {
          const row = rows[i];
          // Columns: A=0,1  B=2,3  C=4,5  D=6,7
          const addResident = (guardiaKey: keyof Roster, nameCell: any, yearCell: any) => {
            if (!nameCell) return;
            const raw = String(nameCell).trim();
            const vacMatch = raw.match(/\(V\s*([\d\-]+)\)/i);
            roster[guardiaKey].push({
              nombre: raw.replace(/\s*\(V[\s\d\-]+\)/i, '').trim().toUpperCase(),
              año: yearCell ? String(yearCell).trim() : 'R1',
              vacaciones: vacMatch ? vacMatch[1] : undefined,
            });
          };
          addResident('A', row[0], row[1]);
          addResident('B', row[2], row[3]);
          addResident('C', row[4], row[5]);
          addResident('D', row[6], row[7]);
        }
        resolve(roster);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

function isOnVacation(resident: ResidentInfo, dayOfMonth: number): boolean {
  if (!resident.vacaciones) return false;
  const parts = resident.vacaciones.split('-');
  if (parts.length === 2) {
    const start = parseInt(parts[0]);
    const end = parseInt(parts[1]);
    return dayOfMonth >= start && dayOfMonth <= end;
  }
  return false;
}

function getAvailableResidents(roster: Roster, guardia: keyof Roster, date: Date): ResidentInfo[] {
  const day = date.getDate();
  return (roster[guardia] || []).filter(r => !isOnVacation(r, day));
}

function loadHistory(): HistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch { return []; }
}

function saveHistory(entry: HistoryEntry) {
  const history = loadHistory();
  const idx = history.findIndex(h => h.fecha === entry.fecha);
  if (idx >= 0) history[idx] = entry;
  else history.unshift(entry);
  // Keep last 30 days
  const trimmed = history.slice(0, 30);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

function getLast7Days(): HistoryEntry[] {
  return loadHistory().slice(0, 7);
}

// ─── Excel Export ─────────────────────────────────────────────────────────────
function exportToExcel(
  salas: SalaData[],
  assignment: Assignment,
  fecha: string,
  guardia: string
) {
  const wb = XLSX.utils.book_new();
  const wsData: any[][] = [];

  const fechaStr = new Date(fecha + 'T12:00:00').toLocaleDateString('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const fechaCap = fechaStr.charAt(0).toUpperCase() + fechaStr.slice(1);

  wsData.push(['ROL DE SALAS DIARIO — HOSPITAL TECAMAC · TURNO VESPERTINO', '', '', '', '']);
  wsData.push([`${fechaCap}  |  GUARDIA ${guardia}`, '', '', '', '']);
  wsData.push(['Qx', 'Nombre', 'Diagnóstico', 'Cirugía', 'Residente']);

  for (const sala of salas) {
    const resident = assignment.salas[sala.qx] || '';
    sala.pacientes.forEach((p, idx) => {
      wsData.push([sala.qx, p.nombre, p.diagnostico, p.cirugia, idx === 0 ? resident : '']);
    });
  }

  // Special services
  const specials = ['TOCO', 'UX', 'REQ', 'CONSUL', 'VPA'];
  for (const sp of specials) {
    const res = assignment.especiales?.[sp];
    if (res) wsData.push([sp, res, '', '', '']);
  }

  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Column widths
  ws['!cols'] = [{ wch: 8 }, { wch: 35 }, { wch: 35 }, { wch: 28 }, { wch: 14 }];

  XLSX.utils.book_append_sheet(wb, ws, 'Rol de Salas');

  const dateTag = fecha.replace(/-/g, '');
  XLSX.writeFile(wb, `rol_salas_${dateTag}_guardia${guardia}.xlsx`);
}

// ─── Agent Step Component ─────────────────────────────────────────────────────
function AgentStep({ num, title, status, result }: {
  num: number;
  title: string;
  status: AgentStatus;
  result?: any;
}) {
  const icon = status === 'idle' ? '○' : status === 'running' ? '◌' : status === 'done' ? '✓' : '✗';
  return (
    <div className={`${styles.agentStep} ${styles[`agent${status}`]}`}>
      <div className={styles.agentHeader}>
        <span className={styles.agentIcon}>{icon}</span>
        <span className={styles.agentNum}>Agente {num}</span>
        <span className={styles.agentTitle}>{title}</span>
      </div>
      {result && status === 'done' && (
        <div className={styles.agentResult}>
          <pre>{typeof result === 'string' ? result : JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      {result && status === 'error' && (
        <div className={styles.agentError}>{String(result)}</div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function RolesPage() {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState('');

  const [roster, setRoster] = useState<Roster | null>(null);
  const [rosterName, setRosterName] = useState('');
  const [guardia, setGuardia] = useState<keyof Roster>('A');
  const [fecha, setFecha] = useState(() => new Date().toISOString().split('T')[0]);
  const [scheduleImage, setScheduleImage] = useState<{ base64: string; mime: string } | null>(null);
  const [imageName, setImageName] = useState('');

  const [agentStatuses, setAgentStatuses] = useState<AgentStatus[]>(['idle', 'idle', 'idle', 'idle']);
  const [agentResults, setAgentResults] = useState<any[]>([null, null, null, null]);
  const [running, setRunning] = useState(false);
  const [finalAssignment, setFinalAssignment] = useState<Assignment | null>(null);
  const [extractedSalas, setExtractedSalas] = useState<SalaData[]>([]);

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const rosterInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(ROSTER_KEY);
    if (saved) {
      try {
        const { roster: r, name } = JSON.parse(saved);
        setRoster(r);
        setRosterName(name);
      } catch {}
    }
    setHistory(loadHistory());
  }, []);

  function handleLogin() {
    if (!pwInput.trim()) { setPwError('Ingresa la contraseña'); return; }
    sessionStorage.setItem('roles_auth', pwInput);
    setAuthed(true);
    setPwError('');
  }

  async function handleRosterUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const parsed = await parseRosterFromXLSX(file);
      setRoster(parsed);
      setRosterName(file.name);
      localStorage.setItem(ROSTER_KEY, JSON.stringify({ roster: parsed, name: file.name }));
    } catch (err) {
      alert('Error al leer el Excel: ' + String(err));
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = (ev.target!.result as string).split(',')[1];
      setScheduleImage({ base64, mime: file.type });
      setImageName(file.name);
    };
    reader.readAsDataURL(file);
  }

  const setAgentStatus = useCallback((idx: number, status: AgentStatus) => {
    setAgentStatuses(prev => { const n = [...prev]; n[idx] = status; return n; });
  }, []);

  const setAgentResult = useCallback((idx: number, result: any) => {
    setAgentResults(prev => { const n = [...prev]; n[idx] = result; return n; });
  }, []);

  async function callAgent(agentNum: number, data: any) {
    const pw = sessionStorage.getItem('roles_auth') || pwInput;
    const res = await fetch('/api/roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-key': pw },
      body: JSON.stringify({ agent: agentNum, data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Error del servidor');
    }
    const json = await res.json();
    return json.result;
  }

  async function runAgents() {
    if (!roster || !scheduleImage) {
      alert('Necesitas subir el rol mensual y la imagen del programa del día.');
      return;
    }
    setRunning(true);
    setFinalAssignment(null);
    setAgentStatuses(['idle', 'idle', 'idle', 'idle']);
    setAgentResults([null, null, null, null]);

    try {
      const fechaDate = new Date(fecha + 'T12:00:00');
      const availableResidents = getAvailableResidents(roster, guardia, fechaDate);

      // Agent 1: Extract
      setAgentStatus(0, 'running');
      let salas: SalaData[] = [];
      let especiales: string[] = [];
      try {
        const r1 = await callAgent(1, { imageBase64: scheduleImage.base64, imageMime: scheduleImage.mime });
        salas = r1.salas || [];
        especiales = r1.especiales || ['TOCO', 'UX', 'REQ', 'CONSUL', 'VPA'];
        setExtractedSalas(salas);
        setAgentResult(0, r1);
        setAgentStatus(0, 'done');
      } catch (err) {
        setAgentResult(0, String(err));
        setAgentStatus(0, 'error');
        setRunning(false);
        return;
      }

      // Agent 2: Distribute
      setAgentStatus(1, 'running');
      let propuesta: Assignment = { salas: {}, especiales: {} };
      try {
        const r2 = await callAgent(2, { salas, especiales, residentes: availableResidents, fecha });
        propuesta = { salas: r2.salas || {}, especiales: r2.especiales || {}, notas: r2.notas };
        setAgentResult(1, r2);
        setAgentStatus(1, 'done');
      } catch (err) {
        setAgentResult(1, String(err));
        setAgentStatus(1, 'error');
        setRunning(false);
        return;
      }

      // Agent 3: Verify
      setAgentStatus(2, 'running');
      let verificacion: any = {};
      try {
        const historial = getLast7Days();
        const r3 = await callAgent(3, {
          propuesta,
          historial,
          residentes: availableResidents,
        });
        verificacion = r3;
        setAgentResult(2, r3);
        setAgentStatus(2, 'done');
      } catch (err) {
        setAgentResult(2, String(err));
        setAgentStatus(2, 'error');
        setRunning(false);
        return;
      }

      // Agent 4: Final review
      setAgentStatus(3, 'running');
      try {
        const r4 = await callAgent(4, { propuesta, verificacion, salas, fecha, guardia });
        const rolFinal: Assignment = r4.rolFinal || propuesta;
        setAgentResult(3, r4);
        setAgentStatus(3, 'done');
        setFinalAssignment(rolFinal);
      } catch (err) {
        setAgentResult(3, String(err));
        setAgentStatus(3, 'error');
      }
    } finally {
      setRunning(false);
    }
  }

  function handleSaveAndExport() {
    if (!finalAssignment) return;
    const entry: HistoryEntry = {
      fecha,
      guardia,
      asignaciones: {
        ...finalAssignment.salas,
        ...finalAssignment.especiales,
      },
    };
    saveHistory(entry);
    setHistory(loadHistory());
    exportToExcel(extractedSalas, finalAssignment, fecha, guardia);
  }

  const availableNow = roster ? getAvailableResidents(roster, guardia, new Date(fecha + 'T12:00:00')) : [];

  // ── Auth gate ──────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className={styles.authWrap}>
        <div className={styles.authCard}>
          <div className={styles.authLogo}>🏥</div>
          <h1 className={styles.authTitle}>Rol de Salas</h1>
          <p className={styles.authSub}>AnesthTR · Acceso restringido</p>
          <input
            className={styles.authInput}
            type="password"
            placeholder="Contraseña"
            value={pwInput}
            onChange={e => setPwInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
          {pwError && <p className={styles.authError}>{pwError}</p>}
          <button className={styles.authBtn} onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    );
  }

  // ── Main UI ────────────────────────────────────────────────────────────────
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.headerIcon}>🏥</span>
          <div>
            <h1 className={styles.headerTitle}>Rol de Salas</h1>
            <p className={styles.headerSub}>Distribución automática de residentes</p>
          </div>
        </div>
        <button className={styles.historyBtn} onClick={() => setShowHistory(v => !v)}>
          📋 Historial
        </button>
      </header>

      <div className={styles.main}>
        {/* ── Left panel: Setup ── */}
        <div className={styles.panel}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Rol Mensual</h2>
            <div className={styles.uploadBox} onClick={() => rosterInputRef.current?.click()}>
              <span className={styles.uploadIcon}>📊</span>
              <span className={styles.uploadText}>
                {rosterName || 'Subir Excel de guardias del mes'}
              </span>
              <input ref={rosterInputRef} type="file" accept=".xlsx,.xls" hidden onChange={handleRosterUpload} />
            </div>
            {roster && (
              <div className={styles.rosterPreview}>
                {(['A', 'B', 'C', 'D'] as const).map(g => (
                  <div key={g} className={styles.rosterGroup} style={{ background: GUARDIA_COLORS[g] }}>
                    <strong>Guardia {g}</strong>
                    <span className={styles.rosterCount}>{roster[g].length} residentes</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Configuración del día</h2>
            <label className={styles.label}>Fecha</label>
            <input
              className={styles.input}
              type="date"
              value={fecha}
              onChange={e => setFecha(e.target.value)}
            />
            <label className={styles.label}>Guardia</label>
            <div className={styles.guardiaSelector}>
              {(['A', 'B', 'C', 'D'] as const).map(g => (
                <button
                  key={g}
                  className={`${styles.guardiaBtn} ${guardia === g ? styles.guardiaBtnActive : ''}`}
                  style={guardia === g ? { background: GUARDIA_COLORS[g] } : {}}
                  onClick={() => setGuardia(g)}
                >
                  {g}
                </button>
              ))}
            </div>
            {roster && availableNow.length > 0 && (
              <div className={styles.availableList}>
                <p className={styles.availableLabel}>Disponibles ({availableNow.length}):</p>
                <div className={styles.residentChips}>
                  {availableNow.map(r => (
                    <span key={r.nombre} className={styles.chip}>
                      {r.nombre} <em>{r.año}</em>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Programa del día</h2>
            <div
              className={`${styles.uploadBox} ${scheduleImage ? styles.uploadBoxDone : ''}`}
              onClick={() => imageInputRef.current?.click()}
            >
              <span className={styles.uploadIcon}>📷</span>
              <span className={styles.uploadText}>
                {imageName || 'Subir foto del programa quirúrgico'}
              </span>
              <input ref={imageInputRef} type="file" accept="image/*" hidden onChange={handleImageUpload} />
            </div>
            {scheduleImage && (
              <img
                src={`data:${scheduleImage.mime};base64,${scheduleImage.base64}`}
                className={styles.imagePreview}
                alt="Programa"
              />
            )}
          </section>

          <button
            className={styles.runBtn}
            onClick={runAgents}
            disabled={running || !roster || !scheduleImage}
          >
            {running ? '⏳ Generando rol...' : '🚀 Generar Rol'}
          </button>
        </div>

        {/* ── Right panel: Agents + Result ── */}
        <div className={styles.panel}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Agentes IA</h2>
            <AgentStep num={1} title="Extractor de salas (Visión)" status={agentStatuses[0]} result={agentResults[0]} />
            <AgentStep num={2} title="Distribuidor de residentes" status={agentStatuses[1]} result={agentResults[1]} />
            <AgentStep num={3} title="Verificador de equidad" status={agentStatuses[2]} result={agentResults[2]} />
            <AgentStep num={4} title="Revisor final" status={agentStatuses[3]} result={agentResults[3]} />
          </section>

          {finalAssignment && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Rol Final — Guardia {guardia}
                <button className={styles.exportBtn} onClick={handleSaveAndExport}>
                  ⬇ Guardar y Descargar Excel
                </button>
              </h2>

              {/* Salas quirúrgicas */}
              <div className={styles.resultTable}>
                <div className={styles.resultHeader}>
                  <span>Sala</span><span>Residente</span><span>Pacientes</span>
                </div>
                {extractedSalas.map(sala => (
                  <div key={sala.qx} className={styles.resultRow}>
                    <span className={styles.resultQx}>{sala.qx}</span>
                    <span className={styles.resultResident}>
                      {finalAssignment.salas[sala.qx] || <em className={styles.unassigned}>Sin asignar</em>}
                    </span>
                    <span className={styles.resultPatients}>{sala.pacientes.length} px</span>
                  </div>
                ))}
              </div>

              {/* Especiales */}
              {Object.keys(finalAssignment.especiales || {}).length > 0 && (
                <div className={styles.especialesGrid}>
                  {Object.entries(finalAssignment.especiales).map(([sp, res]) => (
                    <div key={sp} className={styles.especialCard}>
                      <span className={styles.especialLabel}>{sp}</span>
                      <span className={styles.especialRes}>{res}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      {/* ── History drawer ── */}
      {showHistory && (
        <div className={styles.historyDrawer}>
          <div className={styles.historyHeader}>
            <h2>Historial de asignaciones</h2>
            <button onClick={() => setShowHistory(false)}>✕</button>
          </div>
          {history.length === 0 ? (
            <p className={styles.historyEmpty}>No hay historial guardado aún.</p>
          ) : (
            history.map(entry => (
              <div key={entry.fecha} className={styles.historyEntry}>
                <div className={styles.historyDate}>
                  {new Date(entry.fecha + 'T12:00:00').toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}
                  <span className={styles.historyGuardia} style={{ background: GUARDIA_COLORS[entry.guardia] }}>
                    Guardia {entry.guardia}
                  </span>
                </div>
                <div className={styles.historyChips}>
                  {Object.entries(entry.asignaciones).map(([sala, res]) => (
                    <span key={sala} className={styles.historyChip}>
                      <strong>{sala}</strong>: {res}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
