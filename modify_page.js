const fs = require('fs');
const path = require('path');

const targetFilePath = '/Users/drflow/.config/superpowers/worktrees/AnesthTR/feature-cefalea-post-puncion/src/app/cefalea-post-puncion/page.tsx';

let content = fs.readFileSync(targetFilePath, 'utf8');

// 1. Add state variables inside component right below existing state variables
const targetState = `  const [activeTab, setActiveTab] = useState<'intro' | 'fisio' | 'diagnostico' | 'simulador' | 'referencias'>('intro');
  const [isStanding, setIsStanding] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(1);`;

const replacementState = `  const [activeTab, setActiveTab] = useState<'intro' | 'fisio' | 'diagnostico' | 'simulador' | 'referencias'>('intro');
  const [isStanding, setIsStanding] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(1);

  // ICHD-3 Diagnostic Calculator State
  const [hasPuncture, setHasPuncture] = useState<boolean | null>(null);
  const [onsetWithin5Days, setOnsetWithin5Days] = useState<boolean | null>(null);
  const [isOrthostatic, setIsOrthostatic] = useState<boolean | null>(null);
  const [hasAssociatedSymptoms, setHasAssociatedSymptoms] = useState({
    neckStiffness: false,
    tinnitus: false,
    hypoacusia: false,
    photophobia: false,
    nausea: false,
  });
  const [notBetterAccountedFor, setNotBetterAccountedFor] = useState<boolean | null>(null);

  const isAnySymptomSelected = Object.values(hasAssociatedSymptoms).some(Boolean);
  const criteriaMet =
    hasPuncture === true &&
    onsetWithin5Days === true &&
    isOrthostatic === true &&
    isAnySymptomSelected &&
    notBetterAccountedFor === true;

  const getMissingCriteria = () => {
    const missing: string[] = [];
    if (hasPuncture === null) {
      missing.push("Confirmar antecedente de punción dural o procedimiento neuroaxial.");
    } else if (hasPuncture === false) {
      missing.push("Se requiere antecedente de punción dural (Criterio A).");
    }

    if (onsetWithin5Days === null) {
      missing.push("Confirmar si el inicio fue en los primeros 5 días post-punción.");
    } else if (onsetWithin5Days === false) {
      missing.push("La cefalea debe haber iniciado dentro de los 5 días de la punción (Criterio C).");
    }

    if (isOrthostatic === null) {
      missing.push("Confirmar el carácter ortostático de la cefalea.");
    } else if (isOrthostatic === false) {
      missing.push("La cefalea debe empeorar en bipedestación y mejorar al acostarse (Criterio B).");
    }

    if (!isAnySymptomSelected) {
      missing.push("Seleccionar al menos un síntoma asociado (Criterio D).");
    }

    if (notBetterAccountedFor === null) {
      missing.push("Confirmar si el cuadro no se explica mejor por otro diagnóstico.");
    } else if (notBetterAccountedFor === false) {
      missing.push("El dolor se explica mejor por otro diagnóstico ICHD-3 (Criterio E).");
    }

    return missing;
  };`;

if (!content.includes(targetState)) {
  console.error("Could not find the target state string in the file!");
  process.exit(1);
}
content = content.replace(targetState, replacementState);

// 2. Add styles at the very top of return statement
const targetReturn = `  return (
    <main className="container">
      {/* Header con gradientes */}
      <div className="hero" style={{ paddingBottom: '20px' }}>`;

const replacementReturn = `  return (
    <main className="container">
      {/* Global Page Styles */}
      <style>{\`
        @keyframes drip {
          0% {
            transform: translateY(0px) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(40px) scale(0.5);
            opacity: 0;
          }
        }
        .droplet-container {
          animation: drip 1.8s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }
        .d1 { animation-delay: 0s; }
        .d2 { animation-delay: 0.6s; }
        .d3 { animation-delay: 1.2s; }
        
        @keyframes pulseRed {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .traction-line {
          stroke-dasharray: 4 2;
          animation: pulseRed 1.5s infinite ease-in-out;
        }
        
        @media (max-width: 768px) {
          .fisio-grid, .diagnostico-grid {
            grid-template-columns: 1fr !important;
          }
          .svg-panel {
            height: 320px !important;
          }
        }
      \`}</style>

      {/* Header con gradientes */}
      <div className="hero" style={{ paddingBottom: '20px' }}>`;

if (!content.includes(targetReturn)) {
  console.error("Could not find target return string in the file!");
  process.exit(1);
}
content = content.replace(targetReturn, replacementReturn);

// 3. Remove local style block in activeTab === 'fisio'
const targetLocalStyle = `        {activeTab === 'fisio' && (
          <div>
            {/* Local Styles for animation */}
            <style>{\`
              @keyframes drip {
                0% {
                  transform: translateY(0px) scale(0.8);
                  opacity: 0;
                }
                15% {
                  opacity: 1;
                }
                85% {
                  opacity: 1;
                }
                100% {
                  transform: translateY(40px) scale(0.5);
                  opacity: 0;
                }
              }
              .droplet-container {
                animation: drip 1.8s infinite cubic-bezier(0.4, 0, 0.6, 1);
              }
              .d1 { animation-delay: 0s; }
              .d2 { animation-delay: 0.6s; }
              .d3 { animation-delay: 1.2s; }
              
              @keyframes pulseRed {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
              }
              .traction-line {
                stroke-dasharray: 4 2;
                animation: pulseRed 1.5s infinite ease-in-out;
              }
              
              @media (max-width: 768px) {
                .fisio-grid {
                  grid-template-columns: 1fr !important;
                }
                .svg-panel {
                  height: 320px !important;
                }
              }
            \`}</style>

            <div className="fisio-grid" style={{`;

const replacementLocalStyle = `        {activeTab === 'fisio' && (
          <div>
            <div className="fisio-grid" style={{`;

if (!content.includes(targetLocalStyle)) {
  console.error("Could not find target local style block in the file!");
  process.exit(1);
}
content = content.replace(targetLocalStyle, replacementLocalStyle);

// 4. Replace the diagnostico tab placeholder
const targetPlaceholder = `{activeTab === 'diagnostico' && <div style={{ color: 'var(--text-muted)' }}>Módulo Diagnóstico en desarrollo...</div>}`;

const replacementPlaceholder = `        {activeTab === 'diagnostico' && (
          <div>
            <div className="diagnostico-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '24px',
              alignItems: 'start',
            }}>
              {/* Left Column: ICHD-3 Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', margin: '0' }}>
                  Calculadora Diagnóstica ICHD-3
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 10px 0' }}>
                  Evalúe los criterios diagnósticos oficiales de la International Classification of Headache Disorders (3ra edición) para Cefalea por Presión de LCR Baja (Código 8.1.3).
                </p>

                {/* Criterio A: Punción */}
                <div style={{
                  background: 'rgba(15, 23, 42, 0.2)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 700, padding: '2px 6px',
                      borderRadius: '4px', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316',
                      border: '1px solid rgba(249, 115, 22, 0.2)', marginTop: '2px'
                    }}>
                      Crit. A
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>
                        ¿Antecedente de punción dural o procedimiento neuroaxial?
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        Punción lumbar, anestesia raquídea, epidural con punción inadvertida, etc.
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => setHasPuncture(true)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: hasPuncture === true ? '1px solid rgba(249, 115, 22, 0.5)' : '1px solid var(--border)',
                        background: hasPuncture === true ? 'rgba(249, 115, 22, 0.12)' : 'rgba(15, 23, 42, 0.3)',
                        color: hasPuncture === true ? '#f97316' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '13px',
                        transition: 'all 0.2s',
                      }}
                    >
                      Sí
                    </button>
                    <button 
                      onClick={() => setHasPuncture(false)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: hasPuncture === false ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border)',
                        background: hasPuncture === false ? 'rgba(239, 68, 68, 0.08)' : 'rgba(15, 23, 42, 0.3)',
                        color: hasPuncture === false ? '#ef4444' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '13px',
                        transition: 'all 0.2s',
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Criterio B: Ortostática */}
                <div style={{
                  background: 'rgba(15, 23, 42, 0.2)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 700, padding: '2px 6px',
                      borderRadius: '4px', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316',
                      border: '1px solid rgba(249, 115, 22, 0.2)', marginTop: '2px'
                    }}>
                      Crit. B
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>
                        ¿La cefalea es de carácter ortostático?
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        Empeora significativamente a los 15 minutos de sentarse/pararse y mejora a los 15 minutos de acostarse.
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => setIsOrthostatic(true)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: isOrthostatic === true ? '1px solid rgba(249, 115, 22, 0.5)' : '1px solid var(--border)',
                        background: isOrthostatic === true ? 'rgba(249, 115, 22, 0.12)' : 'rgba(15, 23, 42, 0.3)',
                        color: isOrthostatic === true ? '#f97316' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '13px',
                        transition: 'all 0.2s',
                      }}
                    >
                      Sí
                    </button>
                    <button 
                      onClick={() => setIsOrthostatic(false)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: isOrthostatic === false ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border)',
                        background: isOrthostatic === false ? 'rgba(239, 68, 68, 0.08)' : 'rgba(15, 23, 42, 0.3)',
                        color: isOrthostatic === false ? '#ef4444' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '13px',
                        transition: 'all 0.2s',
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Criterio C: Inicio en 5 días */}
                <div style={{
                  background: 'rgba(15, 23, 42, 0.2)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 700, padding: '2px 6px',
                      borderRadius: '4px', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316',
                      border: '1px solid rgba(249, 115, 22, 0.2)', marginTop: '2px'
                    }}>
                      Crit. C
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>
                        ¿La cefalea inició dentro de los 5 días posteriores a la punción?
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        Habitualmente se manifiesta en las primeras 24-48 horas.
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => setOnsetWithin5Days(true)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: onsetWithin5Days === true ? '1px solid rgba(249, 115, 22, 0.5)' : '1px solid var(--border)',
                        background: onsetWithin5Days === true ? 'rgba(249, 115, 22, 0.12)' : 'rgba(15, 23, 42, 0.3)',
                        color: onsetWithin5Days === true ? '#f97316' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '13px',
                        transition: 'all 0.2s',
                      }}
                    >
                      Sí
                    </button>
                    <button 
                      onClick={() => setOnsetWithin5Days(false)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: onsetWithin5Days === false ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border)',
                        background: onsetWithin5Days === false ? 'rgba(239, 68, 68, 0.08)' : 'rgba(15, 23, 42, 0.3)',
                        color: onsetWithin5Days === false ? '#ef4444' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '13px',
                        transition: 'all 0.2s',
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Criterio D: Síntomas asociados */}
                <div style={{
                  background: 'rgba(15, 23, 42, 0.2)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 700, padding: '2px 6px',
                      borderRadius: '4px', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316',
                      border: '1px solid rgba(249, 115, 22, 0.2)', marginTop: '2px'
                    }}>
                      Crit. D
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>
                        Síntomas asociados (debe presentar al menos UNO):
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        Marque todos los síntomas que experimente el paciente.
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                    {[
                      { key: 'neckStiffness', label: 'Rigidez de nuca' },
                      { key: 'tinnitus', label: 'Acúfenos / Tinnitus' },
                      { key: 'hypoacusia', label: 'Hipoacusia / Alteración auditiva' },
                      { key: 'photophobia', label: 'Fotofobia' },
                      { key: 'nausea', label: 'Náuseas y/o Vómitos' },
                    ].map(sym => {
                      const isChecked = hasAssociatedSymptoms[sym.key as keyof typeof hasAssociatedSymptoms];
                      return (
                        <label 
                          key={sym.key}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            background: isChecked ? 'rgba(249, 115, 22, 0.08)' : 'rgba(15, 23, 42, 0.2)',
                            border: isChecked ? '1px solid rgba(249, 115, 22, 0.3)' : '1px solid var(--border)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontSize: '13px',
                            color: isChecked ? '#f97316' : 'var(--text-secondary)',
                          }}
                        >
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setHasAssociatedSymptoms(prev => ({ ...prev, [sym.key]: e.target.checked }))}
                            style={{
                              accentColor: '#f97316',
                              cursor: 'pointer',
                              width: '15px',
                              height: '15px',
                            }}
                          />
                          {sym.label}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Criterio E: No explicada mejor por otro diagnóstico */}
                <div style={{
                  background: 'rgba(15, 23, 42, 0.2)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 700, padding: '2px 6px',
                      borderRadius: '4px', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316',
                      border: '1px solid rgba(249, 115, 22, 0.2)', marginTop: '2px'
                    }}>
                      Crit. E
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>
                        ¿La cefalea NO se explica mejor por otro diagnóstico?
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        Descartar cefalea tensional primaria, migraña exacerbada u otras causas secundarias no relacionadas.
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => setNotBetterAccountedFor(true)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: notBetterAccountedFor === true ? '1px solid rgba(249, 115, 22, 0.5)' : '1px solid var(--border)',
                        background: notBetterAccountedFor === true ? 'rgba(249, 115, 22, 0.12)' : 'rgba(15, 23, 42, 0.3)',
                        color: notBetterAccountedFor === true ? '#f97316' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '13px',
                        transition: 'all 0.2s',
                      }}
                    >
                      Sí
                    </button>
                    <button 
                      onClick={() => setNotBetterAccountedFor(false)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: notBetterAccountedFor === false ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border)',
                        background: notBetterAccountedFor === false ? 'rgba(239, 68, 68, 0.08)' : 'rgba(15, 23, 42, 0.3)',
                        color: notBetterAccountedFor === false ? '#ef4444' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '13px',
                        transition: 'all 0.2s',
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Results & Red Flags */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Result Card */}
                {criteriaMet ? (
                  <div style={{
                    background: 'rgba(34, 197, 94, 0.08)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>✅</span>
                      <h4 style={{ margin: 0, fontSize: '15px', color: '#4ade80', fontWeight: 700 }}>
                        Criterios ICHD-3 Cumplidos
                      </h4>
                    </div>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                      Diagnóstico compatible con <strong>Cefalea Pos-Punción Dural (Código 8.1.3)</strong>.
                    </p>
                    <div style={{
                      background: 'rgba(34, 197, 94, 0.04)',
                      border: '1px solid rgba(34, 197, 94, 0.15)',
                      borderRadius: '8px',
                      padding: '12px',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}>
                      <div><strong>• Criterio A (Punción):</strong> Cumplido (Antecedente neuroaxial).</div>
                      <div><strong>• Criterio B (Ortostatismo):</strong> Cumplido (Empeora al levantarse, mejora al acostarse).</div>
                      <div><strong>• Criterio C (Inicio):</strong> Cumplido (Inició en los primeros 5 días).</div>
                      <div><strong>• Criterio D (Síntomas):</strong> Cumplido (Síntomas asociados presentes: {
                        Object.entries(hasAssociatedSymptoms)
                          .filter(([_, v]) => v)
                          .map(([k, _]) => {
                            if (k === 'neckStiffness') return 'Rigidez de nuca';
                            if (k === 'tinnitus') return 'Acúfenos';
                            if (k === 'hypoacusia') return 'Hipoacusia';
                            if (k === 'photophobia') return 'Fotofobia';
                            if (k === 'nausea') return 'Náuseas/vómitos';
                            return '';
                          })
                          .join(', ')
                      }).</div>
                      <div><strong>• Criterio E (Exclusión):</strong> Cumplido (No se explica mejor por otro diagnóstico).</div>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    background: 'rgba(251, 191, 36, 0.06)',
                    border: '1px solid rgba(251, 191, 36, 0.25)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>⚠️</span>
                      <h4 style={{ margin: 0, fontSize: '15px', color: '#fbbf24', fontWeight: 700 }}>
                        Criterios ICHD-3 Incompletos
                      </h4>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                      Por favor responda todas las preguntas del checklist clínico para evaluar los criterios diagnósticos.
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                      {getMissingCriteria().map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', fontSize: '12px', color: 'var(--text-muted)' }}>
                          <span style={{ color: '#fbbf24' }}>•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Red Flags Panel */}
                <div style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: '0 4px 20px rgba(239, 68, 68, 0.1)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '22px' }}>🚨</span>
                    <h4 style={{ margin: 0, fontSize: '15px', color: '#f87171', fontWeight: 800, letterSpacing: '0.5px' }}>
                      SIGNOS DE ALARMA (BANDERAS ROJAS)
                    </h4>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#fca5a5', margin: 0, lineHeight: '1.4' }}>
                    Si presenta cualquiera de los siguientes síntomas, suspenda la sospecha de CPPD y busque descartar diagnósticos alternativos graves inmediatamente:
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      {
                        icon: '⚠️',
                        title: 'Cefalea no ortostática o que empeora al acostarse',
                        desc: 'Sospecha de hipertensión intracraneal o trombosis de senos venosos cerebrales (TSVC).'
                      },
                      {
                        icon: '🌡️',
                        title: 'Fiebre alta, escalofríos o alteración del estado de alerta',
                        desc: 'Sospecha de meningitis bacteriana o química.'
                      },
                      {
                        icon: '🧠',
                        title: 'Déficits neurológicos focales o parálisis de pares craneales progresiva',
                        desc: 'Sospecha de hematoma subdural, hemorragia cerebral o lesión ocupante de espacio.'
                      },
                      {
                        icon: '⚡',
                        title: 'Crisis convulsivas o papiledema',
                        desc: 'Requiere evaluación neurológica urgente y neuroimagen.'
                      }
                    ].map((flag, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'flex-start',
                        background: 'rgba(15, 23, 42, 0.3)',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(239, 68, 68, 0.15)',
                      }}>
                        <span style={{ fontSize: '16px', marginTop: '2px' }}>{flag.icon}</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <strong style={{ fontSize: '13px', color: '#fecaca' }}>{flag.title}</strong>
                          <span style={{ fontSize: '12px', color: '#fca5a5', opacity: 0.85 }}>{flag.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}`;

if (!content.includes(targetPlaceholder)) {
  console.error("Could not find the target placeholder string in the file!");
  process.exit(1);
}
content = content.replace(targetPlaceholder, replacementPlaceholder);

fs.writeFileSync(targetFilePath, content, 'utf8');
console.log("Successfully modified page.tsx!");
