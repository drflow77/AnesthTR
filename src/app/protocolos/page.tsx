"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import s from './page.module.css';

const SYSTEM_PROMPT = `Eres el Agente de Protocolos de Investigación de AnesthTR. Ayudas a revisar, crear y mejorar protocolos de investigación clínica en anestesiología.

════════════════════════════════════════
BASE DE CONOCIMIENTO CARGADA:
1. GUÍA OFICIAL — Criterios Elaboración Protocolo (Documento 2810-003-002, actualizado 18 octubre 2018, publicado 22 nov 2019)
2. OFICIO 2810/2026/345 (26 marzo 2026) — Ruta de dictamen CEI Local vs CNIC
════════════════════════════════════════

══ DOCUMENTO 1: GUÍA 2019 ══

ASPECTOS GENERALES (formato):
• Letra Arial 11, interlineado 1.5
• Márgenes: arriba 2.5 cm, abajo 2.5 cm, izquierdo 3.0 cm, derecho 3.0 cm
• Documento en PDF, peso < 2 MB
• Sin logos universitarios; se permite solo logo institucional

HOJA FRONTAL (obligatoria):
• Título, Identificación de autores, Tema prioritario
• Temas prioritarios aceptados: Condiciones Neurológicas, Desórdenes Mentales y de Comportamiento, Diabetes Mellitus, Enfermedades Cardiovasculares y Circulatorias, Enfermedades de los Órganos de los Sentidos, Enfermedades Digestivas, Enfermedades Respiratorias Crónicas, Neoplasias Malignas, Salud Reproductiva/Neonatales/Anomalías Congénitas, Traumatología y Ortopedia.
• IMPORTANTE: El tema prioritario NO puede ser causa de dictamen "Modificar y volver a presentar" si el protocolo ya cumple con uno.

IDENTIFICACIÓN DE AUTORES (datos obligatorios):
• Nombre completo, adscripción, área de trabajo, teléfono con extensión, correo electrónico, grado académico

TÍTULO:
• Conciso pero suficientemente informativo
• Debe incorporar las variables de interés
• Debe indicar dirección del estudio (descriptivo, analítico)
• NO colocar periodos de tiempo en el título

RESUMEN ESTRUCTURADO (250-300 palabras EXACTAS):
Debe incluir TODOS: Título del protocolo, Antecedentes, Objetivo, Material y métodos, Recursos e infraestructura, Experiencia del grupo, Tiempo a desarrollarse.
• NO incluir referencias en el resumen

MARCO TEÓRICO:
• Mínimo 10 hojas
• Mínimo 30 bibliografías
• Bibliografía no mayor de 5 años (con ≥30% en inglés)
• Referencias en orden de aparición con número arábigo en superíndice
• Una bibliografía NO debe repetirse en más de 2 párrafos (se considera plagio)
• Evitar revisión monográfica; enfocarse al problema específico

JUSTIFICACIÓN:
• Pertinencia del estudio
• Contribución para: el conocimiento, los participantes, la comunidad y/o la institución

PLANTEAMIENTO DEL PROBLEMA Y PREGUNTA DE INVESTIGACIÓN:
• Debe responder: Trascendencia, Magnitud/frecuencia/distribución, Vulnerabilidad, Factibilidad, ¿Qué se ha hecho antes?
• Pregunta cumple criterios de Kerlinger: relación entre ≥2 variables, formulada claramente sin ambigüedad, implica posibilidad de prueba empírica

OBJETIVO:
• Un objetivo general + los específicos necesarios
• El objetivo general debe ser congruente con: título, hipótesis, objetivos específicos y métodos
• El verbo debe ser CUANTIFICABLE y factible con el diseño
• Debe incluir variable independiente, dependiente e indicar dirección (descripción, asociación, correlación, predicción)
• Verbos NO aceptables: "comprender", "conocer", "aprender"

HIPÓTESIS:
• Predice lógicamente la respuesta a la pregunta de investigación
• Plantearse como afirmación en términos cuantificables
• OBLIGATORIO: contar con magnitud y dirección
  Ejemplo: "La frecuencia de X será de 15% en el grupo A, mientras que en el grupo B será de 35%"
• Congruente con objetivo, pregunta de investigación y título
• En estudios DESCRIPTIVOS puede omitirse; en ANALÍTICOS es OBLIGATORIA

MATERIAL Y MÉTODOS — RIGOR METODOLÓGICO OBLIGATORIO:
1. Características del estudio (tipo de unidad, localización, nivel de atención)
2. Diseño — clasificar en TODOS estos ejes:
   - Control de maniobra: Experimental / Cuasi-experimental / Observacional
   - Captación: Prolectivo / Retrolectivo / Retroprolectivo
   - Medición en el tiempo: Longitudinal / Transversal
   - Grupo control: Descriptivo / Comparativo
   - Control de sesgos: descripción explícita de cómo se controlarán sesgos de selección, información (cegamiento) y confusión
3. Universo de trabajo (población de estudio definida estrictamente)
4. Grupos de estudio (características clínicas y demográficas base)
5. Criterios de selección:
   - Inclusión: diagnósticos precisos mediante guías actuales
   - Exclusión: comorbilidades que actúen como variables confusoras (evitar criterios en espejo)
   - Eliminación: fallas en medición, pérdida de seguimiento, retiro de CI
6. Tamaño de muestra — RIGOR ABSOLUTO:
   - Nivel III y IV: INACEPTABLE no presentar el desarrollo exacto
   - Debe incluir: Software utilizado, nivel de confianza (95%, α=0.05), potencia estadística (mínimo 80%, β=0.20), diferencia clínica esperada (Delta) con base en bibliografía maestra
   - Todo tamaño de muestra debe estar REFERENCIADO
7. Técnica de muestreo y asignación:
   - Ensayos clínicos: secuencia aleatoria, ocultación de asignación, método de cegamiento (simple/doble/triple)
   - Observacionales analíticos: método estricto para evitar sesgo de selección consecutivo
8. Definición de variables — para CADA variable especificar:
   - Definición conceptual (con referencia bibliográfica)
   - Definición operacional (cómo se medirá, instrumentos validados)
   - Tipo y Escala de medición (Razón, Intervalo, Ordinal, Nominal)
   - Función: Dependiente / Independiente / Confusión / Covariable
9. Descripción del estudio (secuencia temporal exacta y estandarización del personal)
10. Instrumentos: Toda escala (EVA, Ramsay, Aldrete, ENN, etc.) DEBE reportar validación en población mexicana y alfa de Cronbach
11. Análisis de datos:
    - Software estadístico detallado con versión
    - Manejo de datos faltantes (missing data): imputación o casos completos con justificación
    - Análisis de normalidad FORMAL: Kolmogorov-Smirnov o Shapiro-Wilk ANTES de elegir paramétrico/no paramétrico
    - Univariado: variables cualitativas (frecuencias/porcentajes), cuantitativas (media±DE si normal, mediana/RIC si no normal)
    - Bivariado: T-Student, U-Mann-Whitney, Chi-cuadrada, Fisher, ANOVA — justificando homocedasticidad
    - Multivariado (si aplica): regresión logística/lineal para control de confusoras — OBLIGATORIO en observacionales analíticos
    - TODOS los análisis deben corresponder exactamente a objetivos primarios y secundarios

ASPECTOS ÉTICOS — RIGOR NORMATIVO:
1. Citar aplicación CONCRETA de cada normativo al estudio:
   - Declaración de Helsinki, Informe de Belmont, Código de Núremberg
   - Reglamento de la Ley General de Salud — Título Segundo: Arts. 13,14,15,16,17,20,21,22,24,27
   - NOM-012-SSA3-2012 (apartados 6,7,8,10,11,12)
   - NOM-004-SSA3-2012 (Expediente Clínico)
   - Ley Federal de Protección de Datos Personales (Arts. 7,8,9,11,12,13,14)
   - Mecanismo de pseudonimización o encriptación de datos en la matriz base
   - Clasificación de riesgo (Art. 17) — justificación estricta si riesgo mayor al mínimo
   - Si el investigador tiene jerarquía sobre el sujeto: CI lo solicita alguien independiente (Art. 24)
2. Carta de Consentimiento Informado: formato oficial validado, beneficios sin exagerar, gratuidad, indemnización por EA, confidencialidad, retiro voluntario sin amenaza a atención

CRONOGRAMA: Contemplar 3-6 meses solo para autorización del CLIES/CLIE
REFERENCIAS: Mínimo 30, formato Vancouver estricto, >30% inglés, ≤5 años

ANEXOS OBLIGATORIOS:
• Tablas maniquí con campos ficticios
• Matriz de recolección de datos
• Hoja de diccionario de códigos
• Instrumentos y escalas textuales

══ DOCUMENTO 2: OFICIO 2810/2026/345 ══
(26 marzo 2026 — Coordinación de Investigación en Salud)

CONTEXTO NORMATIVO: El Art. 41 bis, fracc. II de la LGS fue modificado el 15 enero 2026. La actualización documental de los CEI está suspendida hasta disposiciones de la Comisión Nacional de Bioética y actualización de NOM-012-SSA3-2012. Se emiten criterios provisionales de competencia.

PROTOCOLOS QUE DEBEN IR AL CNIC (NO evalúan en CEI local):

1. INTERVENCIONES TERAPÉUTICAS/DIAGNÓSTICAS NO CONVENCIONALES:
   • Uso de medicamentos, biológicos, equipos o material médico NO incluidos en el Cuadro Básico o SAI
   • Que puedan modificar conductas diagnóstico-terapéuticas vigentes

2. MULTICÉNTRICOS CON INTERVENCIÓN:
   • En ≥2 unidades médicas o normativas
   • Con intervención diagnóstica o terapéutica en pacientes, o muestras derivadas de sujetos (experimental/cuasi-experimental)
   EXCEPCIÓN ✅ → CEI local: Si son observacionales, descriptivos o retrospectivos (datos) en misma entidad federativa

3. CON OTRAS INSTITUCIONES + INTERVENCIÓN:
   • Instituciones públicas/privadas/educativas nacionales o extranjeras + intervención en pacientes o muestras
   EXCEPCIÓN ✅ → CEI local: Si son observacionales/descriptivos/retrospectivos en misma entidad federativa

4. COLABORACIÓN INTRA/INTERINSTITUCIONAL CON BANCOS:
   • Uso de bases de datos institucionales de ≥1 unidad, bancos de muestras institucionales o sus derivados

5. ENSAYOS CLÍNICOS:
   • Aleatorizado, abierto o cuasi-experimental de fármaco nuevo, nueva indicación, innovación tecnológica o dispositivo médico no en cuadro básico
   • Con o sin autorización COFEPRIS

6. FINANCIAMIENTO FARMACÉUTICO O FINES DE LUCRO:
   • Apoyo económico y/o en especie de industria farmacéutica, empresas de innovación tecnológica, o entidades con/sin fines de lucro

7. INVESTIGACIÓN EN GRUPOS POBLACIONALES:
   • Protocolos en escuelas, comunidades o empresas con derechohabientes Y no derechohabientes

8. EXPORTACIÓN/IMPORTACIÓN MATERIAL BIOLÓGICO:
   • Inclusión de material biológico o médico que deba entrar o salir de México

9. TECNOLOGÍA DE VANGUARDIA / IA QUE MODIFICA PROCESOS:
   • IA, sistemas informáticos, algoritmos cuyo propósito sea diagnóstico, pronóstico, tratamientos o nuevas funciones que MODIFIQUEN procesos diagnóstico-terapéuticos
   EXCEPCIÓN ✅ → CEI local: IA/tecnología que NO implica modificación de procesos diagnóstico/pronóstico/tratamiento

10. INCONFORMIDAD:
    • Si el investigador principal se inconforma con un dictamen CEI local → CNIC
    • NOTA: Debe cancelar el protocolo a nivel local primero

DISPOSICIÓN GENERAL: Los protocolos con estas características evaluados por un CEI local deberán cancelarse y enviarse al CNIC.

════════════════════════════════════════
ERRORES FRECUENTES EN RESIDENTES (Detección proactiva):
1. Cálculo de muestra incompleto: sin Delta, sin prevalencia base, sin software
2. Variables confusoras sin estrategia analítica de ajuste
3. Normalidad asumida automáticamente sin prueba formal
4. Diseños analíticos sin cegamiento u ocultación de asignación
5. EVA/Ramsay/Aldrete tratadas como continuas sin verificar distribución
6. Criterios de exclusión en espejo (copian los de inclusión negados)
7. Escalas sin validación en población mexicana o sin alfa de Cronbach
8. Ley de Protección de Datos: sin explicar almacenamiento cifrado
9. Aspectos éticos "tipo machote": nombran Helsinki pero no aplican al estudio concreto
10. Cronograma sin periodo de 3-6 meses para autorización del Comité
11. Referencias sin número de volumen/página o con links muertos
12. Título no empata con el objetivo primario
13. Objetivos con verbos no cuantificables ("comprender", "conocer")
14. CI que exime de responsabilidad en eventos adversos

════════════════════════════════════════
FORMATO DE RESPUESTA:
• Clasifica hallazgos: 🔴 **ERROR CRÍTICO** (causaría rechazo), 🟡 **OBSERVACIÓN** (condicionaría), ✅ **CORRECTO**
• Usa markdown: **negritas**, listas con guiones, ## para secciones
• Sé directo — el usuario trabaja bajo presión de tiempo
• Si creas contenido, usa formato listo para copiar/pegar
• Responde en español mexicano formal
• Al finalizar una revisión completa: indica el porcentaje estimado de cumplimiento (Score: XX/100) y determina la ruta de dictamen
• SIEMPRE al analizar un protocolo: indica explícitamente al final si va a 🏥 CEI Local o a ⚠️ CNIC, con base en el Oficio 2810/2026/345`;

type Message = { role: string; content: string };
type AttachedFile = { name: string; mimeType: string; data: string } | null;
type RouteStatus = 'pending' | 'local' | 'cnic';
type RightTab = 'estado' | 'criterios';

const MODES = [
  { id: 'revisar', icon: '🔍', label: 'Revisar protocolo' },
  { id: 'crear', icon: '✍️', label: 'Crear protocolo' },
  { id: 'mejorar', icon: '⚡', label: 'Mejorar sección' },
  { id: 'estadistica', icon: '📊', label: 'Diseño estadístico' },
  { id: 'ruta', icon: '🏥', label: 'Ruta de dictamen' },
];

const SECTIONS = [
  'Título y hoja frontal', 'Resumen estructurado', 'Planteamiento / PICO',
  'Objetivos', 'Hipótesis', 'Marco teórico', 'Material y métodos',
  'Variables', 'Análisis estadístico', 'Aspectos éticos / CI', 'Referencias'
];

const CHECKLIST = [
  { id: 'titulo', label: 'Título', desc: 'conciso, variables, dirección' },
  { id: 'resumen', label: 'Resumen', desc: '250-300 palabras, IMRAD' },
  { id: 'pico', label: 'Pregunta PICO', desc: 'explícita, Kerlinger' },
  { id: 'objetivos', label: 'Objetivos', desc: 'verbo cuantificable' },
  { id: 'hipotesis', label: 'Hipótesis', desc: 'magnitud y dirección' },
  { id: 'diseno', label: 'Diseño', desc: 'coherente, sesgos controlados' },
  { id: 'muestra', label: 'Muestra', desc: 'cálculo con Delta y potencia' },
  { id: 'variables', label: 'Variables', desc: 'tabla completa + escala' },
  { id: 'analisis', label: 'Análisis estadístico', desc: 'normalidad + software' },
  { id: 'etica', label: 'Ética + CI', desc: 'normativos + anonimización' },
  { id: 'refs', label: 'Referencias', desc: 'Vancouver, ≥30, ≤5 años' },
];

const MODE_LABELS: Record<string, string> = {
  revisar: 'Revisión de protocolo', crear: 'Crear protocolo',
  mejorar: 'Mejorar sección', estadistica: 'Diseño estadístico', ruta: 'Ruta de dictamen'
};

function formatMarkdown(text: string): string {
  return text
    .replace(/🔴 \*\*([^*]+)\*\*/g, '<div class="fb"><div class="fh fe">🔴 ERROR CRÍTICO</div><div class="fby">$1</div></div>')
    .replace(/🟡 \*\*([^*]+)\*\*/g, '<div class="fb"><div class="fh fw">🟡 OBSERVACIÓN</div><div class="fby">$1</div></div>')
    .replace(/✅ \*\*([^*]+)\*\*/g, '<div class="fb"><div class="fh fo">✅ CORRECTO</div><div class="fby">$1</div></div>')
    .replace(/^####\s(.+)$/gm, '<h4>$1</h4>')
    .replace(/^###?\s(.+)$/gm, '<h3>$1</h3>')
    .replace(/^[-─═]{3,}$/gm, '<hr>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^[-•]\s(.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>(\n)?)+/g, m => `<ul>${m}</ul>`)
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

export default function ProtocolosPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [accessKey, setAccessKey] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('protocolo_auth');
    if (saved) { setAccessKey(saved); setIsAuthenticated(true); }
  }, []);

  const handleLogin = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-key': password },
      body: JSON.stringify({ provider: 'gemini', messages: [{ role: 'user', content: 'ping' }] })
    });
    if (res.status === 401) {
      setPasswordError('Contraseña incorrecta.');
      return;
    }
    sessionStorage.setItem('protocolo_auth', password);
    setAccessKey(password);
    setIsAuthenticated(true);
    setPasswordError('');
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState('gemini');
  const [score, setScore] = useState<number | null>(null);
  const [activeMode, setActiveMode] = useState('revisar');
  const [attachedFile, setAttachedFile] = useState<AttachedFile>(null);
  const [findingsCount, setFindingsCount] = useState(0);
  const [route, setRoute] = useState<RouteStatus>('pending');
  const [rightTab, setRightTab] = useState<RightTab>('estado');

  const endRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const detectRoute = useCallback((text: string) => {
    const t = text.toLowerCase();
    const cnic = ['ensayo clínico', 'aleatorizado', 'cuadro básico', 'industria farmacéutica',
      'multicéntrico', 'material biológico', 'cnic', '⚠️ cnic', 'comité nacional'];
    const local = ['✅ cei local', 'cei local', 'puede evaluarse localmente', 'comité local'];
    if (cnic.some(k => t.includes(k))) setRoute('cnic');
    else if (local.some(k => t.includes(k))) setRoute('local');
  }, []);

  const handleSend = async () => {
    if ((!input.trim() && !attachedFile) || isLoading) return;
    const text = input.trim() || (attachedFile ? `Revisa este protocolo: ${attachedFile.name}` : '');
    const userMsg: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const payload: Record<string, unknown> = {
        provider,
        system: SYSTEM_PROMPT,
        messages: newMessages,
        model: provider === 'anthropic' ? 'claude-sonnet-4-6' : undefined,
        max_tokens: provider === 'anthropic' ? 4096 : undefined,
      };
      if (attachedFile) payload.file = attachedFile;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-access-key': accessKey },
        body: JSON.stringify(payload)
      });
      setAttachedFile(null);
      const data = await res.json();

      if (res.ok) {
        const reply = data.content?.[0]?.text || 'Error al procesar respuesta.';
        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

        const sm = reply.match(/Score:\s*(\d{1,3})\/100/i) ||
                   reply.match(/(\d{1,3})\s*%\s*(?:de\s*cumplimiento|score)/i) ||
                   reply.match(/(\d{1,3})\/100/);
        if (sm) { const v = parseInt(sm[1]); if (v >= 0 && v <= 100) setScore(v); }

        const errs = (reply.match(/🔴/g) || []).length + (reply.match(/🟡/g) || []).length;
        if (errs > 0) setFindingsCount(prev => prev + errs);

        detectRoute(reply);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ Error: ${data.error}` }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Error de conexión con el servidor.' }]);
    } finally {
      setIsLoading(false);
      textRef.current?.focus();
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      const [header, data] = result.split(',');
      const mimeType = header.match(/:(.*?);/)?.[1] || file.type;
      setAttachedFile({ name: file.name, mimeType, data });
    };
    reader.readAsDataURL(file);
    if (fileRef.current) fileRef.current.value = '';
  };

  const copyText = (text: string, btn: HTMLButtonElement) => {
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = '✓';
      setTimeout(() => { btn.textContent = '📋'; }, 1500);
    });
  };

  const clearChat = () => {
    if (messages.length === 0) return;
    if (!confirm('¿Limpiar la conversación?')) return;
    setMessages([]); setScore(null); setFindingsCount(0); setRoute('pending');
  };

  const exportChat = () => {
    if (messages.length === 0) return;
    const date = new Date().toLocaleDateString('es-MX');
    const lines = messages.map(m =>
      `[${m.role === 'user' ? 'USUARIO' : 'AGENTE'}]\n${m.content}`
    ).join('\n\n─────────────────────\n\n');
    const blob = new Blob([`AnesthTR · Revisión\nFecha: ${date}\n\n${lines}`], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `revision-${date.replace(/\//g, '-')}.txt`;
    a.click();
  };

  const dashOffset = score !== null ? 226 - (226 * score) / 100 : 226;
  const scoreColor = score !== null ? (score >= 80 ? 'var(--accent3)' : score >= 60 ? 'var(--warn)' : 'var(--danger)') : 'var(--accent3)';

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(51,65,85,0.4)', borderRadius: 20, padding: '48px 40px', width: '100%', maxWidth: 380, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>Revisor de Protocolos</div>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 32 }}>AnesthTR · Acceso restringido</div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => { setPassword(e.target.value); setPasswordError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(51,65,85,0.5)', background: 'rgba(0,0,0,0.3)', color: '#f1f5f9', fontSize: 15, marginBottom: 8, outline: 'none', boxSizing: 'border-box' }}
            autoFocus
          />
          {passwordError && <div style={{ color: '#f87171', fontSize: 12, marginBottom: 8 }}>{passwordError}</div>}
          <button
            onClick={handleLogin}
            style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #38bdf8, #818cf8)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 4 }}>
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={s.container}>
      {/* HEADER */}
      <header className={s.header}>
        <div className={s.logoMark}>A</div>
        <div>
          <div className={s.logoText}>AnesthTR <span className={s.logoSub}>· Agente de Protocolos</span></div>
        </div>
        <div className={s.headerRight}>
          <select className={s.selectProvider} value={provider} onChange={(e) => setProvider(e.target.value)}>
            <option value="gemini">🧪 Gemini Flash</option>
            <option value="anthropic">🤖 Claude Sonnet</option>
          </select>
          <span className={`${s.badge} ${s.badgeBlue}`}>Protocolos MX</span>
          <span className={`${s.badge} ${s.badgeGreen}`}>● IA Activa</span>
        </div>
      </header>

      <div className={s.mainLayout}>
        {/* SIDEBAR */}
        <div className={s.sidebar}>
          <div className={s.sidebarSection}>
            <div className={s.sidebarLabel}>Modo de trabajo</div>
            {MODES.map(m => (
              <button key={m.id}
                className={`${s.modeBtn} ${activeMode === m.id ? s.modeBtnActive : ''}`}
                onClick={() => setActiveMode(m.id)}>
                <span className={s.modeIcon}>{m.icon}</span> {m.label}
              </button>
            ))}
          </div>

          <div className={s.divider} />

          <div className={s.sectionsList}>
            <div className={s.sidebarLabel}>Secciones del protocolo</div>
            {SECTIONS.map(sec => (
              <div key={sec} className={s.sectionChip}>
                <span className={`${s.dot} ${s.dotEmpty}`} />
                {sec}
              </div>
            ))}
          </div>
        </div>

        {/* MAIN PANEL */}
        <div className={s.mainPanel}>
          <div className={s.modeIndicator}>
            <span className={s.modeDot} />
            <span>Modo: {MODE_LABELS[activeMode]}</span>
            <div className={s.modeActions}>
              <button className={s.actionBtn} onClick={clearChat}>🗑 Limpiar</button>
              <button className={s.actionBtn} onClick={exportChat}>⬇ Exportar</button>
            </div>
          </div>

          <div className={s.chatArea}>
            {messages.length === 0 ? (
              <div className={s.welcomeCard}>
                <div className={s.welcomeTitle}>Agente de Protocolos de Investigación</div>
                <div className={s.welcomeSub}>
                  Revisa, crea y mejora protocolos de investigación clínica.<br/>
                  Basado en la guía oficial de criterios 2019 y el Oficio 2810/2026/345.
                </div>
                <div className={s.welcomeTags}>
                  <span className={s.wTag}>Guía Oficial 2019</span>
                  <span className={s.wTag}>Oficio 2810/2026/345</span>
                  <span className={s.wTag}>CEI Local vs CNIC</span>
                  <span className={s.wTag}>NOM-012-SSA3</span>
                </div>
                <div className={s.quickActions}>
                  <button className={s.qaBtn} onClick={() => setInput('Quiero revisar mi protocolo completo. ¿Qué secciones necesitas?')}>
                    <span className={s.qaIcon}>🔍</span>
                    <div className={s.qaTitle}>Revisar protocolo</div>
                    <div className={s.qaDesc}>Análisis completo con checklist oficial</div>
                  </button>
                  <button className={s.qaBtn} onClick={() => setInput('Quiero crear un protocolo de investigación en anestesiología desde cero.')}>
                    <span className={s.qaIcon}>✍️</span>
                    <div className={s.qaTitle}>Crear desde cero</div>
                    <div className={s.qaDesc}>Guía paso a paso con estructura oficial</div>
                  </button>
                  <button className={s.qaBtn} onClick={() => setInput('¿Mi protocolo debe ir al CEI Local o al CNIC? Descríbeme los criterios.')}>
                    <span className={s.qaIcon}>🏥</span>
                    <div className={s.qaTitle}>¿CEI Local o CNIC?</div>
                    <div className={s.qaDesc}>Criterios del Oficio 2810/2026/345</div>
                  </button>
                  <button className={s.qaBtn} onClick={() => setInput('Necesito ayuda con el diseño estadístico: tamaño de muestra, pruebas y análisis.')}>
                    <span className={s.qaIcon}>📊</span>
                    <div className={s.qaTitle}>Diseño estadístico</div>
                    <div className={s.qaDesc}>Muestra, normalidad, pruebas</div>
                  </button>
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={msg.role === 'user' ? s.msgUser : s.msgAgent}>
                  {msg.role === 'assistant' && <div className={s.agentAvatar}>🧠</div>}
                  <div className={msg.role === 'user' ? s.msgUserBubble : s.agentContent}>
                    {msg.role === 'assistant' && (
                      <div className={s.agentName}>
                        AGENTE · AnesthTR &nbsp;|&nbsp; {provider === 'gemini' ? 'Gemini Flash' : 'Claude Sonnet'}
                      </div>
                    )}
                    {msg.role === 'assistant' ? (
                      <div className={s.agentBubble}>
                        <button className={s.copyBtn}
                          onClick={(e) => copyText(msg.content, e.currentTarget)}>📋</button>
                        <div dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }} />
                      </div>
                    ) : msg.content}
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className={s.msgAgent}>
                <div className={s.agentAvatar}>🧠</div>
                <div className={s.agentContent}>
                  <div className={s.agentName}>AGENTE · AnesthTR</div>
                  <div className={s.thinking}>
                    <div className={s.dots}><span/><span/><span/></div>
                    Analizando con criterios oficiales…
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className={s.inputArea}>
            {attachedFile && (
              <div className={s.fileChip}>
                <span>📄</span>
                <span className={s.fileName}>{attachedFile.name}</span>
                <button onClick={() => setAttachedFile(null)} className={s.fileRemoveBtn}>✕</button>
              </div>
            )}
            <div className={s.inputRow}>
              <button className={s.uploadBtn} onClick={() => fileRef.current?.click()}>📎</button>
              <input type="file" ref={fileRef} accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleFile} />
              <textarea ref={textRef} className={s.inputBox}
                placeholder="Escribe tu consulta, pega texto del protocolo, o adjunta PDF/Word…"
                value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                rows={1} />
              <button className={s.sendBtn} onClick={handleSend} disabled={isLoading || (!input.trim() && !attachedFile)}>➤</button>
            </div>
            <div className={s.inputHint}>PDF · Word · Enter para enviar · Shift+Enter nueva línea</div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={s.rightPanel}>
          <div className={s.rpTabs}>
            <button className={`${s.rpTab} ${rightTab === 'estado' ? s.rpTabActive : ''}`}
              onClick={() => setRightTab('estado')}>Estado</button>
            <button className={`${s.rpTab} ${rightTab === 'criterios' ? s.rpTabActive : ''}`}
              onClick={() => setRightTab('criterios')}>Criterios</button>
          </div>

          {rightTab === 'estado' && (
            <div className={s.rpBody}>
              <div className={s.rpLabel}>Cumplimiento del protocolo</div>
              <div className={s.scoreRingWrap}>
                <div className={s.scoreRing}>
                  <svg width="90" height="90" viewBox="0 0 90 90">
                    <circle className={s.scoreBg} cx="45" cy="45" r="36"/>
                    <circle className={s.scoreFill} cx="45" cy="45" r="36"
                      style={{ strokeDashoffset: dashOffset, stroke: scoreColor }}/>
                  </svg>
                  <div className={s.scoreVal}>
                    <span>{score !== null ? `${score}%` : '—'}</span>
                    <span className={s.scoreLabel}>SCORE</span>
                  </div>
                </div>
                <div className={s.scoreSub}>
                  {score !== null
                    ? (score >= 80 ? '✓ Listo para comité' : score >= 60 ? '⚠ Necesita ajustes' : '✗ Requiere revisión')
                    : 'Sin protocolo cargado'}
                </div>
              </div>

              <div className={s.divider} />

              <div className={s.rpLabel}>Ruta de dictamen</div>
              <div className={`${s.routeCard} ${s[`route_${route}`]}`}>
                <div className={s.routeHead}>
                  {route === 'pending' && '🔄 Pendiente de análisis'}
                  {route === 'local' && '✅ CEI Local — Comité de Ética'}
                  {route === 'cnic' && '⚠️ CNIC requerido'}
                </div>
                <div className={s.routeBody}>
                  {route === 'pending' && 'Carga o describe tu protocolo para determinar la ruta.'}
                  {route === 'local' && <span>Puede evaluarse localmente.<br/><small>Oficio 2810/2026/345</small></span>}
                  {route === 'cnic' && <span>Debe enviarse al Comité Nacional.<br/><small>Oficio 2810/2026/345</small></span>}
                </div>
              </div>

              <div className={s.divider} />

              <div className={s.rpLabel}>Checklist del protocolo</div>
              <div className={s.checklist}>
                {CHECKLIST.map(c => (
                  <div key={c.id} className={s.clItem}>
                    <span className={s.clIcon}>⬜</span>
                    <span className={s.clText}><strong>{c.label}</strong> — {c.desc}</span>
                  </div>
                ))}
              </div>

              <div className={s.divider} />

              <div className={s.rpLabel}>Sesión</div>
              <div className={s.statRow}><span className={s.stLabel}>Mensajes</span><span className={s.stVal}>{messages.filter(m => m.role === 'user').length}</span></div>
              <div className={s.statRow}><span className={s.stLabel}>Hallazgos</span><span className={s.stVal}>{findingsCount}</span></div>
              <div className={s.statRow}><span className={s.stLabel}>Modo</span><span className={s.stVal}>{MODE_LABELS[activeMode]?.split(' ')[0]}</span></div>
            </div>
          )}

          {rightTab === 'criterios' && (
            <div className={s.rpBody}>
              <div className={s.refSection}>
                <div className={s.refTitle}>Formato y estructura</div>
                <div className={`${s.refItem} ${s.refInfo}`}><div className={s.refK}>Resumen</div><div className={s.refV}>250–300 palabras · Sin referencias · IMRAD</div></div>
                <div className={`${s.refItem} ${s.refWarn}`}><div className={s.refK}>Marco teórico</div><div className={s.refV}>Mín. 10 hojas · ≥30 refs · ≤5 años · ≥30% inglés</div></div>
              </div>
              <div className={s.refSection}>
                <div className={s.refTitle}>Metodología</div>
                <div className={`${s.refItem} ${s.refWarn}`}><div className={s.refK}>Hipótesis</div><div className={s.refV}>Obligatoria en analíticos · Magnitud y dirección</div></div>
                <div className={`${s.refItem} ${s.refWarn}`}><div className={s.refK}>Tamaño de muestra</div><div className={s.refV}>Software + α(0.05) + potencia(80%) + Delta</div></div>
                <div className={`${s.refItem} ${s.refInfo}`}><div className={s.refK}>Normalidad</div><div className={s.refV}>K-S o Shapiro-Wilk antes de elegir prueba</div></div>
              </div>
              <div className={s.refSection}>
                <div className={s.refTitle}>Ética</div>
                <div className={`${s.refItem} ${s.refInfo}`}><div className={s.refK}>Normatividad</div><div className={s.refV}>Helsinki · Belmont · LGS · NOM-012 · LFPDP</div></div>
                <div className={`${s.refItem} ${s.refWarn}`}><div className={s.refK}>CI</div><div className={s.refV}>Formato oficial · Retiro sin amenaza a atención</div></div>
              </div>
              <div className={s.refSection}>
                <div className={s.refTitle}>Ruta — Oficio 2810/2026/345</div>
                <div className={`${s.refItem} ${s.refOk}`}><div className={s.refK}>✅ CEI Local</div><div className={s.refV}>Observacional / descriptivo / retrospectivo en misma entidad</div></div>
                <div className={`${s.refItem} ${s.refWarn}`}><div className={s.refK}>⚠️ CNIC</div><div className={s.refV}>Ensayos clínicos · Multicéntrico · Fármaco fuera de cuadro · Financiamiento farmacéutico</div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
