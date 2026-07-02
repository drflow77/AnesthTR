"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface Option {
  id: number;
  text: string;
  feedback: string;
  points: number;
  type: 'correct' | 'incorrect' | 'suboptimal';
  evaImpact: number;
  breastfeedingImpact: 'imposible' | 'con_dificultad' | 'normal';
}

interface Step {
  stepNumber: number;
  title: string;
  narrative: string;
  options: Option[];
}

const simulatorSteps: Step[] = [
  {
    stepNumber: 1,
    title: "Paso 1: Diagnóstico Inicial ante la Queja",
    narrative: "Sofía (28 años, puérpera de primer día) solicita valoración. Presenta cefalea opresiva frontal-occipital severa (EVA 8/10) que comenzó al sentarse para alimentar a su bebé. Refiere náuseas leves. Al recostarse, el dolor se reduce a EVA 2/10. Tuvo punción dural accidental (PDA) con aguja Tuohy 18G hace 24 horas.",
    options: [
      {
        id: 1,
        text: "Solicitar de inmediato Tomografía Computarizada (TAC) simple de cráneo de urgencia.",
        type: 'incorrect',
        points: 0,
        evaImpact: 8,
        breastfeedingImpact: 'imposible',
        feedback: "Incorrecto. De acuerdo con el Consenso Internacional ASRA/SOAP 2023 y las directrices IHS ICHD-3 2018, la neuroimagen rutinaria no está indicada para el diagnóstico de la Cefalea Pos-Punción Dural (CPPD) típica. La TAC simple tiene baja sensibilidad para detectar hipotensión intracraneal y expone a la paciente a radiación innecesaria. Las indicaciones de neuroimagen se reservan estrictamente para cuando se sospechan diagnósticos alternativos graves ante la presencia de signos de alarma (Red Flags), tales como déficits neurológicos focales progresivos, fiebre de origen no aclarado o pérdida del carácter ortostático de la cefalea."
      },
      {
        id: 2,
        text: "Evaluar clínicamente aplicando criterios ICHD-3 y descartar banderas rojas.",
        type: 'correct',
        points: 10,
        evaImpact: 8,
        breastfeedingImpact: 'con_dificultad',
        feedback: "¡Correcto! Las directrices de la IHS ICHD-3 2018 y el Consenso Internacional ASRA/SOAP 2023 establecen que el diagnóstico de CPPD es fundamentalmente clínico. Se basa en una historia clínica compatible (exposición dural previa) y la presencia de cefalea postural clásica (empeora al erguirse, mejora en supino), acompañada de síntomas asociados (náuseas, rigidez nucal, acúfenos, fotofobia). El primer paso ineludible es descartar signos de alarma (banderas rojas) que sugieran otras patologías neurológicas graves (p. ej., trombosis de senos venosos cerebrales o hematoma subdural)."
      },
      {
        id: 3,
        text: "Iniciar una infusión continua epidural de solución salina.",
        type: 'suboptimal',
        points: 3,
        evaImpact: 8,
        breastfeedingImpact: 'imposible',
        feedback: "Subóptimo. La infusión epidural de solución salina (salina normal) puede elevar temporalmente la presión epidural y ofrecer un alivio mecánico transitorio por compresión del saco dural, disminuyendo la tracción meníngea. Sin embargo, no sella la brecha dural y la tasa de recurrencia de la cefalea al suspenderla es extremadamente alta. Las directrices actuales de la ASRA/SOAP 2023 no recomiendan esta técnica como medida diagnóstica o terapéutica de primera línea debido a su eficacia efímera, incomodidad para la paciente y el riesgo latente de infección o catéteres epidurales prolongados."
      }
    ]
  },
  {
    stepNumber: 2,
    title: "Paso 2: Manejo Inicial de Primera Línea",
    narrative: "Se confirma el diagnóstico de CPPD y se descartan banderas rojas. Sofía tiene un EVA de 8/10 al incorporarse y no logra lactar debido a la intensidad del dolor. ¿Cuál es la conducta terapéutica inicial idónea en este momento?",
    options: [
      {
        id: 1,
        text: "Realizar un Parche Hemático Epidural (PHE) profiláctico inmediato en las próximas 12 horas.",
        type: 'incorrect',
        points: 0,
        evaImpact: 8,
        breastfeedingImpact: 'imposible',
        feedback: "Incorrecto/Controvertido. La realización de un Parche Hemático Epidural (PHE) profiláctico o extremadamente temprano (primeras 24 horas) presenta una tasa de falla muy elevada y expone a la paciente a los riesgos inherentes del procedimiento (como una segunda punción dural accidental) sin un beneficio claro demostrado. Las recomendaciones del Consenso Internacional ASRA/SOAP 2023 sugieren que, salvo en circunstancias muy específicas con síntomas neurológicos severos de inicio inmediato, se debe priorizar el manejo conservador inicial o posponer el PHE terapéutico al menos 24-48 horas tras la punción dural."
      },
      {
        id: 2,
        text: "Iniciar manejo conservador multimodal: hidratación adecuada, analgésicos no esteroideos (AINEs) programados + paracetamol, cafeína oral (200-300 mg) y reposo en cama relativo según tolerancia.",
        type: 'correct',
        points: 10,
        evaImpact: 6,
        breastfeedingImpact: 'con_dificultad',
        feedback: "¡Correcto! El Consenso Internacional ASRA/SOAP 2023 y la práctica clínica habitual respaldan el manejo conservador multimodal como el enfoque inicial preferente para la CPPD de intensidad leve a moderada, o como puente terapéutico en casos severos. Consiste en optimizar la analgesia sistémica mediante AINEs y paracetamol en dosis pautadas (no a demanda) y cafeína enteral (que actúa como vasoconstrictor cerebral). Es crucial alentar al reposo en cama relativo según tolerancia de la paciente: las guías desaconsejan explícitamente prescribir reposo absoluto en cama prolongado de forma preventiva o terapéutica, ya que no altera la resolución de la cefalea y incrementa significativamente el riesgo de eventos tromboembólicos venosos en el posparto."
      },
      {
        id: 3,
        text: "Prescribir reposo absoluto en cama boca arriba sin almohada por 72 horas continuas.",
        type: 'incorrect',
        points: 0,
        evaImpact: 8,
        breastfeedingImpact: 'imposible',
        feedback: "Incorrecto. Prescribir reposo absoluto estricto y prolongado en cama (con o sin almohada) es una práctica obsoleta que carece de respaldo científico. Los estudios demuestran que el reposo en cama absoluto no reduce la incidencia ni la duración de la CPPD. Además, el decúbito supino forzado durante 72 horas dificulta enormemente el autocuidado del recién nacido, interfiere negativamente con la lactancia materna e incrementa de forma alarmante el riesgo de trombosis venosa profunda (TVP) en el estado procoagulante fisiológico del puerperio inmediato."
      }
    ]
  },
  {
    stepNumber: 3,
    title: "Paso 3: Falla del Manejo Conservador",
    narrative: "Han pasado 36 horas. A pesar del tratamiento conservador multimodal continuo, Sofía continúa presentando cefalea incapacitante con EVA 9/10 al levantarse. Sigue sin poder cuidar o amamantar a su recién nacido y se siente sumamente frustrada. ¿Cuál es el siguiente paso clínico idóneo?",
    options: [
      {
        id: 1,
        text: "Incrementar la dosis de analgésicos programados y añadir un opioide fuerte (tramadol IV).",
        type: 'incorrect',
        points: 0,
        evaImpact: 9,
        breastfeedingImpact: 'imposible',
        feedback: "Incorrecto. Los analgésicos opioides sistémicos no son eficaces para tratar la CPPD, ya que el dolor no está mediado predominantemente por vías nociceptivas inflamatorias típicas, sino por la tracción física de las meninges inducida por la gravedad. Adicionalmente, los opioides añaden efectos adversos indeseables en el posparto, como constipación, sedación y náuseas. La sedación materna puede interferir significativamente con la lactancia y el cuidado seguro del neonato, además de excretarse en parte a través de la leche materna."
      },
      {
        id: 2,
        text: "Ofrecer un Parche Hemático Epidural (PHE) terapéutico formal.",
        type: 'correct',
        points: 10,
        evaImpact: 3,
        breastfeedingImpact: 'normal',
        feedback: "¡Correcto! El Parche Hemático Epidural (PHE) es el estándar de oro terapéutico y está plenamente indicado según el Consenso Internacional ASRA/SOAP 2023 cuando la CPPD es grave, persistente tras 24-48 horas de manejo conservador, e incapacita a la paciente para realizar sus actividades de la vida diaria, cuidar de su hijo o iniciar la lactancia de manera efectiva. El PHE tiene una tasa de éxito inicial del 60-80% para resolver o atenuar drásticamente los síntomas, al sillar mecánicamente la brecha dural y restaurar el volumen y presión del LCR cerebral."
      },
      {
        id: 3,
        text: "Realizar una punción lumbar diagnóstica para medir la presión de apertura del LCR.",
        type: 'incorrect',
        points: -10,
        evaImpact: 10,
        breastfeedingImpact: 'imposible',
        feedback: "¡Error Grave! La realización de una nueva punción lumbar diagnóstica creará un segundo orificio dural, empeorando directamente la fuga de LCR y agravando severamente la cefalea y el riesgo de hipotensión intracraneal de la paciente. La CPPD es un diagnóstico meramente clínico en este contexto; medir la presión de apertura del LCR no aporta ningún valor al manejo clínico y representa un riesgo iatrogénico grave que viola los principios básicos de seguridad del paciente según las directrices de la IHS ICHD-3."
      }
    ]
  }
];

export default function CefaleaPostPuncionPage() {
  const [activeTab, setActiveTab] = useState<'intro' | 'fisio' | 'diagnostico' | 'simulador' | 'referencias'>('intro');
  const [isStanding, setIsStanding] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(1);

  // Clinical Case Simulator State
  const [simStep, setSimStep] = useState<number>(1);
  const [evaPain, setEvaPain] = useState<number>(8);
  const [breastfeedingStatus, setBreastfeedingStatus] = useState<'imposible' | 'con_dificultad' | 'normal'>('imposible');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);

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
  };

  const handleSelectOption = (option: Option) => {
    if (showFeedback) return;
    setSelectedOption(option.id);
    setShowFeedback(true);
    setPoints(prev => prev + option.points);
    setEvaPain(option.evaImpact);
    setBreastfeedingStatus(option.breastfeedingImpact);
  };

  const handleContinue = () => {
    const nextStep = simStep + 1;
    setSimStep(nextStep);
    setSelectedOption(null);
    setShowFeedback(false);

    if (nextStep === 2) {
      setEvaPain(8);
      setBreastfeedingStatus('imposible');
    } else if (nextStep === 3) {
      setEvaPain(9);
      setBreastfeedingStatus('imposible');
    }
  };

  const handleRestart = () => {
    setSimStep(1);
    setEvaPain(8);
    setBreastfeedingStatus('imposible');
    setSelectedOption(null);
    setShowFeedback(false);
    setPoints(0);
  };

  const currentStep = simulatorSteps.find(s => s.stepNumber === simStep);
  const selectedOptionObj = currentStep?.options.find(o => o.id === selectedOption);

  return (
    <main className="container">
      {/* Global Page Styles */}
      <style>{`
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
        
        .option-button {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .option-button:hover {
          border-color: rgba(249, 115, 22, 0.4) !important;
          background: rgba(249, 115, 22, 0.04) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.08) !important;
        }
        .option-button:hover div {
          background: #f97316 !important;
          color: #0f172a !important;
        }
        .option-button:active {
          transform: translateY(0);
        }
        .restart-button {
          transition: all 0.2s ease !important;
        }
        .restart-button:hover {
          background: rgba(255, 255, 255, 0.12) !important;
          border-color: rgba(255, 255, 255, 0.25) !important;
        }
      `}</style>

      {/* Header con gradientes */}
      <div className="hero" style={{ paddingBottom: '20px' }}>
        <div className="hero-glow" />
        <div style={{ marginBottom: '10px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(249, 115, 22, 0.12)', color: '#f97316',
            padding: '4px 12px', borderRadius: '4px', fontSize: '11px',
            fontWeight: 700, letterSpacing: '0.4px',
            border: '1px solid rgba(249, 115, 22, 0.3)',
          }}>
            SIMULACIÓN Y CLÍNICA
          </span>
        </div>
        <h1 style={{
          fontSize: '32px', fontWeight: 900, letterSpacing: '-0.04em',
          background: 'linear-gradient(135deg, #f8fafc 30%, #f97316 65%, #fbbf24 100%)',
          WebkitBackgroundClip: 'text', color: 'transparent',
          marginBottom: '10px',
        }}>
          Cefalea Pos-Punción Dural
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto' }}>
          Fisiopatología interactiva, criterios ICHD-3 y simulador de toma de decisiones terapéuticas.
        </p>
      </div>

      {/* Back link */}
      <Link href="/" style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px',
        transition: 'color 0.15s',
      }}>
        ← Volver al inicio
      </Link>

      {/* Navigation tabs */}
      <div style={{
        display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)',
        paddingBottom: '12px', marginBottom: '20px', overflowX: 'auto',
      }}>
        {(['intro', 'fisio', 'diagnostico', 'simulador', 'referencias'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? 'rgba(249, 115, 22, 0.15)' : 'transparent',
              color: activeTab === tab ? '#f97316' : 'var(--text-secondary)',
              border: activeTab === tab ? '1px solid rgba(249, 115, 22, 0.4)' : '1px solid transparent',
              padding: '8px 16px', borderRadius: '8px', fontSize: '13px',
              fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {tab === 'intro' && 'Introducción'}
            {tab === 'fisio' && '🔬 Fisiopatología'}
            {tab === 'diagnostico' && '📋 Criterios ICHD-3'}
            {tab === 'simulador' && '🎮 Caso Clínico'}
            {tab === 'referencias' && '📖 Referencias'}
          </button>
        ))}
      </div>

      {/* Contenedor dinámico */}
      <div className="glass-card" style={{ padding: '24px', minHeight: '300px' }}>
        {activeTab === 'intro' && (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '12px', color: '#f1f5f9' }}>Cefalea Pos-Punción Dural (CPPD)</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
              La CPPD es una complicación iatrogénica frecuente tras bloqueos neuroaxiales (raquídeo o epidural). Ocurre por la punción involuntaria de la duramadre, provocando una fuga persistente de líquido cefalorraquídeo.
            </p>
            <div style={{
              background: 'rgba(15, 23, 42, 0.4)', borderRadius: '12px',
              border: '1px solid var(--border)', padding: '16px', marginBottom: '16px'
            }}>
              <h3 style={{ fontSize: '14px', color: '#f97316', marginBottom: '8px' }}>🎯 Objetivos de Aprendizaje:</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Comprender la dinámica de presiones y la teoría de Monro-Kellie.</li>
                <li>Aplicar de forma rigurosa los criterios de la ICHD-3.</li>
                <li>Aprender el manejo conservador, técnico del Parche Hemático Epidural (PHE) y pautas de alta.</li>
                <li>Aprender a reaccionar ante una falla o recidiva del primer PHE.</li>
              </ul>
            </div>
            <button 
              onClick={() => setActiveTab('fisio')}
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)',
                color: '#060a14', border: 'none', padding: '12px 24px',
                borderRadius: '8px', fontSize: '14px', fontWeight: 700,
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px'
              }}
            >
              Comenzar Estudio →
            </button>
          </div>
        )}
        {activeTab === 'fisio' && (
          <div>
            <div className="fisio-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1.2fr',
              gap: '32px',
              alignItems: 'start',
            }}>
              {/* Left Column: Selector and SVG */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', margin: '0 0 4px 0' }}>
                  Simulador de Posición Corporal
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                  Cambia la postura del paciente para observar los cambios en la presión hidrostática y tracción meníngea.
                </p>

                {/* Glass Button Group */}
                <div style={{
                  display: 'flex',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '4px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}>
                  <button
                    onClick={() => setIsStanding(false)}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: !isStanding ? 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' : 'transparent',
                      color: !isStanding ? '#ffffff' : 'var(--text-secondary)',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: !isStanding ? '0 4px 12px rgba(14, 165, 233, 0.3)' : 'none',
                    }}
                  >
                    🛏️ Decúbito Supino
                  </button>
                  <button
                    onClick={() => setIsStanding(true)}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: isStanding ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 'transparent',
                      color: isStanding ? '#ffffff' : 'var(--text-secondary)',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: isStanding ? '0 4px 12px rgba(239, 68, 68, 0.3)' : 'none',
                    }}
                  >
                    🧍 Bipedestación
                  </button>
                </div>

                {/* SVG Panel */}
                <div className="svg-panel" style={{
                  background: 'rgba(15, 23, 42, 0.4)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  height: '420px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Absolute subtle background glow */}
                  <div style={{
                    position: 'absolute',
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    background: isStanding ? 'rgba(239, 68, 68, 0.05)' : 'rgba(14, 165, 233, 0.05)',
                    filter: 'blur(40px)',
                    top: '50px',
                    left: 'calc(50% - 90px)',
                    transition: 'all 0.5s ease',
                    pointerEvents: 'none',
                  }} />

                  <svg
                    viewBox="0 0 300 400"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    {/* Definitions */}
                    <defs>
                      <linearGradient id="csfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity={isStanding ? "0.08" : "0.22"} />
                        <stop offset="80%" stopColor="#0ea5e9" stopOpacity={isStanding ? "0.05" : "0.15"} />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.25" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    {/* 1. Subarachnoid Space (CSF Space) - Glow Fill */}
                    <path
                      d="M 150,48 C 96,48 88,94 88,140 C 88,174 114,184 135,204 L 135,365 L 165,365 L 165,204 C 186,184 212,174 212,140 C 212,94 204,48 150,48 Z"
                      fill="url(#csfGrad)"
                      stroke="#0ea5e9"
                      strokeWidth="1"
                      strokeOpacity={isStanding ? 0.3 : 0.6}
                      style={{ transition: 'stroke-opacity 0.5s ease' }}
                    />

                    {/* 2. Dilated meningeal vessels inside skull */}
                    <g style={{ transition: 'all 0.5s ease' }}>
                      {/* Left Meningeal Vessel */}
                      <path
                        d="M 98,135 Q 92,95 112,78 Q 124,68 138,72"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth={isStanding ? 3 : 1}
                        strokeOpacity={isStanding ? 0.8 : 0.25}
                        style={{ transition: 'stroke-width 0.5s ease, stroke-opacity 0.5s ease' }}
                      />
                      {/* Right Meningeal Vessel */}
                      <path
                        d="M 202,135 Q 208,95 188,78 Q 176,68 162,72"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth={isStanding ? 3 : 1}
                        strokeOpacity={isStanding ? 0.8 : 0.25}
                        style={{ transition: 'stroke-width 0.5s ease, stroke-opacity 0.5s ease' }}
                      />
                      {/* Top Vessel Branches */}
                      <path
                        d="M 112,78 Q 125,82 135,88"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth={isStanding ? 2 : 0.7}
                        strokeOpacity={isStanding ? 0.8 : 0.2}
                        style={{ transition: 'stroke-width 0.5s ease, stroke-opacity 0.5s ease' }}
                      />
                      <path
                        d="M 188,78 Q 175,82 165,88"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth={isStanding ? 2 : 0.7}
                        strokeOpacity={isStanding ? 0.8 : 0.2}
                        style={{ transition: 'stroke-width 0.5s ease, stroke-opacity 0.5s ease' }}
                      />
                    </g>

                    {/* 3. Outer Skull & Spinal Canal Contour */}
                    <path
                      d="M 150,40 C 90,40 80,90 80,140 C 80,180 110,190 130,210 L 130,370 L 170,370 L 170,210 C 190,190 220,180 220,140 C 220,90 210,40 150,40 Z"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="2.5"
                    />

                    {/* 4. Dural Tear / Punción Dural (L3-L4 region) */}
                    {/* Visual gap and tear marker on the right dural wall at y=320 */}
                    <path
                      d="M 170,314 L 170,326"
                      stroke="#0f172a"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M 170,315 L 164,320 L 170,325"
                      stroke="#f97316"
                      strokeWidth="2"
                      fill="none"
                      filter="url(#glow)"
                    />
                    <text
                      x="180"
                      y="323"
                      fill="#f97316"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      Punción L3-L4
                    </text>

                    {/* 5. Dripping droplets */}
                    <g>
                      <g className="droplet-container d1">
                        <circle cx="166" cy="320" r="2.5" fill="#38bdf8" />
                      </g>
                      <g className="droplet-container d2">
                        <circle cx="166" cy="320" r="2.5" fill="#38bdf8" />
                      </g>
                      <g className="droplet-container d3">
                        <circle cx="166" cy="320" r="2.5" fill="#38bdf8" />
                      </g>
                    </g>

                    {/* 6. Dynamic Brain and Spinal Cord Group */}
                    <g
                      style={{
                        transform: isStanding ? 'translateY(6px)' : 'translateY(0px)',
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {/* Brainstem & Spinal Cord */}
                      <path
                        d="M 144,180 L 144,340 C 144,343 156,343 156,340 L 156,180 Z"
                        fill="#cbd5e1"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M 150,185 L 150,330"
                        stroke="#94a3b8"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        fill="none"
                      />

                      {/* Brain Cerebrum & Cerebellum */}
                      <path
                        d="M 150,65 C 115,65 98,90 98,125 C 98,150 110,165 125,168 C 122,175 125,185 135,188 C 140,192 142,205 142,230 L 158,230 C 158,205 160,192 165,188 C 175,185 178,175 175,168 C 190,165 202,150 202,125 C 202,90 185,65 150,65 Z"
                        fill="#cbd5e1"
                        stroke="#94a3b8"
                        strokeWidth="2"
                      />

                      {/* Gyri / internal squiggles */}
                      <path d="M 120,90 Q 130,95 140,90" stroke="#94a3b8" strokeWidth="1.5" fill="none" opacity="0.6" />
                      <path d="M 110,120 Q 130,110 145,120" stroke="#94a3b8" strokeWidth="1.5" fill="none" opacity="0.6" />
                      <path d="M 125,145 Q 140,140 150,150" stroke="#94a3b8" strokeWidth="1.5" fill="none" opacity="0.6" />
                      <path d="M 180,90 Q 170,95 160,90" stroke="#94a3b8" strokeWidth="1.5" fill="none" opacity="0.6" />
                      <path d="M 190,120 Q 170,110 155,120" stroke="#94a3b8" strokeWidth="1.5" fill="none" opacity="0.6" />
                      <path d="M 175,145 Q 160,140 150,150" stroke="#94a3b8" strokeWidth="1.5" fill="none" opacity="0.6" />
                    </g>

                    {/* 7. Wavy Traction Lines - Anchor points on skull y=48 stretching to brain y=65/71 */}
                    <g
                      style={{
                        opacity: isStanding ? 1 : 0,
                        transform: isStanding ? 'scaleY(1.35)' : 'scaleY(1)',
                        transformOrigin: '150px 48px',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      fill="none"
                    >
                      {/* Left traction line */}
                      <path d="M 120,48 Q 117,53 123,58 T 120,66" className="traction-line" />
                      {/* Center traction line */}
                      <path d="M 150,48 Q 147,53 153,58 T 150,66" className="traction-line" />
                      {/* Right traction line */}
                      <path d="M 180,48 Q 177,53 183,58 T 180,66" className="traction-line" />
                    </g>

                    {/* 8. Downward Force Arrows */}
                    <g
                      style={{
                        opacity: isStanding ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                      }}
                      fill="#ef4444"
                    >
                      <path d="M 120,74 L 120,81 M 117,78 L 120,81 L 123,78" stroke="#ef4444" strokeWidth="1.5" fill="none" />
                      <path d="M 150,74 L 150,81 M 147,78 L 150,81 L 153,78" stroke="#ef4444" strokeWidth="1.5" fill="none" />
                      <path d="M 180,74 L 180,81 M 177,78 L 180,81 L 183,78" stroke="#ef4444" strokeWidth="1.5" fill="none" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Right Column: Dynamic details & Accordion */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Dynamic details card */}
                <div style={{
                  background: isStanding ? 'rgba(239, 68, 68, 0.05)' : 'rgba(14, 165, 233, 0.05)',
                  border: isStanding ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(14, 165, 233, 0.2)',
                  borderRadius: '12px',
                  padding: '16px',
                  transition: 'all 0.5s ease',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '18px' }}>{isStanding ? '⚠️' : '✅'}</span>
                    <strong style={{ fontSize: '14px', color: isStanding ? '#f87171' : '#38bdf8' }}>
                      {isStanding ? 'Tracción Gravitacional Activa (Bipedestación)' : 'Compensación de Presión (Supino)'}
                    </strong>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                    {isStanding ? (
                      'La posición vertical aumenta la presión hidrostática en la columna, lo que incrementa el ritmo de fuga del LCR. Al reducirse el volumen y flotabilidad del LCR cerebral, el cerebro "desciende", traccionando las meninges sensitivas y provocando cefalea intensa.'
                    ) : (
                      'Al acostarse, la gradiente hidrostática entre la cabeza y la columna se anula. La fuga disminuye y la presión intracraneal se estabiliza. La tracción sobre las meninges y pares craneales cesa, aliviando la cefalea de forma inmediata.'
                    )}
                  </p>
                </div>

                {/* Accordion / Card Deck */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Card 1 */}
                  <div
                    onClick={() => setExpandedCard(expandedCard === 1 ? null : 1)}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      padding: '16px',
                      cursor: 'pointer',
                      border: expandedCard === 1 ? '1px solid rgba(14, 165, 233, 0.4)' : '1px solid var(--border)',
                      background: expandedCard === 1 ? 'rgba(15, 23, 42, 0.6)' : 'rgba(15, 23, 42, 0.3)',
                      transition: 'all 0.3s ease',
                      transform: 'none',
                      opacity: 1,
                      animation: 'none',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '100px',
                          background: 'rgba(56, 189, 248, 0.12)',
                          color: '#38bdf8',
                        }}>
                          VOLUMEN
                        </span>
                        <h4 style={{ margin: 0, fontSize: '14px', color: '#f1f5f9', fontWeight: 600 }}>
                          1. Fuga de Líquido Cefalorraquídeo
                        </h4>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {expandedCard === 1 ? '▼' : '▲'}
                      </span>
                    </div>

                    {expandedCard === 1 && (
                      <div style={{
                        marginTop: '8px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.6',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        paddingTop: '8px',
                      }}>
                        <p style={{ margin: '0 0 8px 0' }}>
                          La punción de la duramadre deja un orificio persistente por el cual el LCR se extravasa hacia el espacio epidural, reduciendo el volumen intratecal total.
                        </p>
                        <div style={{
                          background: 'rgba(14, 165, 233, 0.08)',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid rgba(14, 165, 233, 0.15)',
                          fontSize: '12px',
                        }}>
                          <strong>Balance de Dinámica:</strong> La producción fisiológica es de unos <strong>~0.35 ml/min</strong> (aprox. 500 ml/día). Si el flujo de fuga de la brecha dural supera esta cifra, se produce un balance de volumen negativo.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card 2 */}
                  <div
                    onClick={() => setExpandedCard(expandedCard === 2 ? null : 2)}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      padding: '16px',
                      cursor: 'pointer',
                      border: expandedCard === 2 ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border)',
                      background: expandedCard === 2 ? 'rgba(15, 23, 42, 0.6)' : 'rgba(15, 23, 42, 0.3)',
                      transition: 'all 0.3s ease',
                      transform: 'none',
                      opacity: 1,
                      animation: 'none',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '100px',
                          background: 'rgba(239, 68, 68, 0.12)',
                          color: '#f87171',
                        }}>
                          MECÁNICA
                        </span>
                        <h4 style={{ margin: 0, fontSize: '14px', color: '#f1f5f9', fontWeight: 600 }}>
                          2. Pérdida de Soporte Hidráulico
                        </h4>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {expandedCard === 2 ? '▼' : '▲'}
                      </span>
                    </div>

                    {expandedCard === 2 && (
                      <div style={{
                        marginTop: '8px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.6',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        paddingTop: '8px',
                      }}>
                        <p style={{ margin: '0 0 8px 0' }}>
                          El cerebro está inmerso en LCR. Por el principio de flotabilidad, su peso efectivo se reduce dramáticamente.
                        </p>
                        <div style={{
                          background: 'rgba(239, 68, 68, 0.08)',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid rgba(239, 68, 68, 0.15)',
                          fontSize: '12px',
                        }}>
                          <strong>Efecto Flotabilidad:</strong> El cerebro pasa de un peso aparente de <strong>50 g</strong> a su peso real de <strong>1400 g</strong> al perder el amortiguador de LCR. Esto somete a tracción por gravedad a las meninges y a los nervios craneales <strong>V, IX y X</strong>.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card 3 */}
                  <div
                    onClick={() => setExpandedCard(expandedCard === 3 ? null : 3)}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      padding: '16px',
                      cursor: 'pointer',
                      border: expandedCard === 3 ? '1px solid rgba(251, 191, 36, 0.4)' : '1px solid var(--border)',
                      background: expandedCard === 3 ? 'rgba(15, 23, 42, 0.6)' : 'rgba(15, 23, 42, 0.3)',
                      transition: 'all 0.3s ease',
                      transform: 'none',
                      opacity: 1,
                      animation: 'none',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '100px',
                          background: 'rgba(251, 191, 36, 0.12)',
                          color: '#fbbf24',
                        }}>
                          MONRO-KELLIE
                        </span>
                        <h4 style={{ margin: 0, fontSize: '14px', color: '#f1f5f9', fontWeight: 600 }}>
                          3. Doctrina de Monro-Kellie
                        </h4>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {expandedCard === 3 ? '▼' : '▲'}
                      </span>
                    </div>

                    {expandedCard === 3 && (
                      <div style={{
                        marginTop: '8px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.6',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        paddingTop: '8px',
                      }}>
                        <p style={{ margin: '0 0 8px 0' }}>
                          El volumen dentro de la cavidad craneana rígida es siempre constante e incompresible.
                        </p>
                        <div style={{
                          background: 'rgba(251, 191, 36, 0.08)',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid rgba(251, 191, 36, 0.15)',
                          fontSize: '12px',
                          marginBottom: '8px',
                        }}>
                          <strong>Fórmula:</strong> V<sub>encéfalo</sub> + V<sub>sangre</sub> + V<sub>LCR</sub> = Constante
                        </div>
                        <p style={{ margin: 0 }}>
                          Como el volumen de LCR cae, el volumen vascular venoso aumenta de manera compensatoria. Esta venodilatación (especialmente venas meningeas y senos) genera congestión y el característico dolor pulsátil.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
                {activeTab === 'diagnostico' && (
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
        )}
        {activeTab === 'simulador' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 1. Patient Status Top Bar */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            }}>
              {/* Patient Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>🤰</span>
                  <strong style={{ fontSize: '15px', color: '#f1f5f9' }}>Sofía</strong>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>• 28 años</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Post-op Cesárea (Día 1) • PDA con Tuohy 18G hace 24h
                </div>
              </div>

              {/* EVA Pain Indicator */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '180px', flex: '1 1 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Cefalea (EVA):</span>
                  <span style={{
                    color: evaPain >= 7 ? '#f87171' : evaPain >= 4 ? '#fbbf24' : '#4ade80',
                    fontWeight: 'bold',
                  }}>
                    {evaPain}/10
                  </span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{
                    height: '100%',
                    width: `${evaPain * 10}%`,
                    background: evaPain >= 7 ? 'linear-gradient(90deg, #eab308, #ef4444)' : evaPain >= 4 ? 'linear-gradient(90deg, #22c55e, #eab308)' : '#22c55e',
                    borderRadius: '4px',
                    transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.5s ease',
                    boxShadow: evaPain >= 7 ? '0 0 10px rgba(239, 68, 68, 0.4)' : 'none'
                  }} />
                </div>
              </div>

              {/* Breastfeeding Status */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>Lactancia Materna:</span>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: breastfeedingStatus === 'normal' ? 'rgba(34, 197, 94, 0.12)' : breastfeedingStatus === 'con_dificultad' ? 'rgba(234, 179, 8, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  border: breastfeedingStatus === 'normal' ? '1px solid rgba(34, 197, 94, 0.3)' : breastfeedingStatus === 'con_dificultad' ? '1px solid rgba(234, 179, 8, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                  color: breastfeedingStatus === 'normal' ? '#4ade80' : breastfeedingStatus === 'con_dificultad' ? '#fbbf24' : '#f87171',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  transition: 'all 0.5s ease'
                }}>
                  <span>🤱</span>
                  <span>
                    {breastfeedingStatus === 'normal' ? 'Lactancia Normal' : breastfeedingStatus === 'con_dificultad' ? 'Lactancia con Dificultad' : 'Imposible Lactar'}
                  </span>
                </div>
              </div>

              {/* Score Tracker */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>Puntaje Acumulado:</span>
                <div style={{
                  background: 'rgba(249, 115, 22, 0.15)',
                  border: '1px solid rgba(249, 115, 22, 0.4)',
                  color: '#f97316',
                  padding: '4px 12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 800,
                  boxShadow: '0 0 12px rgba(249, 115, 22, 0.2)'
                }}>
                  {points} pts
                </div>
              </div>
            </div>

            {/* Active Simulation Step (Steps 1-3) */}
            {simStep <= 3 && currentStep && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: '24px',
                alignItems: 'start',
              }}>
                {/* Left Column: Narrative and Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{
                    background: 'rgba(15, 23, 42, 0.3)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        background: 'rgba(249, 115, 22, 0.12)',
                        color: '#f97316',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}>
                        CASO CLÍNICO
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        Paso {simStep} de 3
                      </span>
                    </div>
                    
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#f1f5f9', margin: 0 }}>
                      {currentStep.title}
                    </h3>
                    
                    {/* Narrative Card */}
                    <div style={{
                      borderLeft: '4px solid #f97316',
                      background: 'rgba(249, 115, 22, 0.03)',
                      padding: '14px 16px',
                      borderRadius: '0 12px 12px 0',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: 'var(--text-secondary)',
                      fontStyle: 'italic',
                    }}>
                      {currentStep.narrative}
                    </div>
                  </div>

                  {/* Options List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {currentStep.options.map((opt, idx) => {
                      const isSelected = selectedOption === opt.id;
                      const hasSelectedSomething = selectedOption !== null;
                      
                      let borderStyle = '1px solid var(--border)';
                      let backgroundStyle = 'rgba(15, 23, 42, 0.3)';
                      let shadowStyle = 'none';
                      let opacityStyle = 1;
                      
                      if (hasSelectedSomething) {
                        if (isSelected) {
                          if (opt.type === 'correct') {
                            borderStyle = '2px solid #22c55e';
                            backgroundStyle = 'rgba(34, 197, 94, 0.08)';
                            shadowStyle = '0 0 16px rgba(34, 197, 94, 0.15)';
                          } else if (opt.type === 'suboptimal') {
                            borderStyle = '2px solid #eab308';
                            backgroundStyle = 'rgba(234, 179, 8, 0.08)';
                            shadowStyle = '0 0 16px rgba(234, 179, 8, 0.15)';
                          } else {
                            borderStyle = '2px solid #ef4444';
                            backgroundStyle = 'rgba(239, 68, 68, 0.08)';
                            shadowStyle = '0 0 16px rgba(239, 68, 68, 0.15)';
                          }
                        } else {
                          opacityStyle = 0.45;
                        }
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(opt)}
                          disabled={hasSelectedSomething}
                          style={{
                            display: 'flex',
                            gap: '14px',
                            alignItems: 'center',
                            textAlign: 'left',
                            width: '100%',
                            padding: '16px 20px',
                            borderRadius: '12px',
                            border: borderStyle,
                            background: backgroundStyle,
                            boxShadow: shadowStyle,
                            opacity: opacityStyle,
                            cursor: hasSelectedSomething ? 'default' : 'pointer',
                            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                          className={hasSelectedSomething ? '' : 'option-button'}
                        >
                          {/* Option Prefix Circle */}
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: isSelected
                              ? opt.type === 'correct' ? '#22c55e' : opt.type === 'suboptimal' ? '#eab308' : '#ef4444'
                              : 'rgba(255, 255, 255, 0.06)',
                            color: isSelected ? '#0f172a' : 'var(--text-secondary)',
                            fontWeight: 700,
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.2s',
                          }}>
                            {idx === 0 ? 'A' : idx === 1 ? 'B' : 'C'}
                          </div>
                          
                          <span style={{
                            fontSize: '13.5px',
                            lineHeight: '1.5',
                            color: isSelected ? '#f1f5f9' : 'var(--text-secondary)',
                            fontWeight: isSelected ? 600 : 500,
                          }}>
                            {opt.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Feedback Card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {showFeedback && selectedOptionObj ? (
                    <div style={{
                      background: selectedOptionObj.type === 'correct' ? 'rgba(34, 197, 94, 0.06)' : selectedOptionObj.type === 'suboptimal' ? 'rgba(234, 179, 8, 0.06)' : 'rgba(239, 68, 68, 0.06)',
                      border: selectedOptionObj.type === 'correct' ? '1px solid rgba(34, 197, 94, 0.3)' : selectedOptionObj.type === 'suboptimal' ? '1px solid rgba(234, 179, 8, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '22px' }}>
                          {selectedOptionObj.type === 'correct' ? '✅' : selectedOptionObj.type === 'suboptimal' ? '⚠️' : '❌'}
                        </span>
                        <h4 style={{
                          margin: 0,
                          fontSize: '15px',
                          fontWeight: 700,
                          color: selectedOptionObj.type === 'correct' ? '#4ade80' : selectedOptionObj.type === 'suboptimal' ? '#fbbf24' : '#f87171'
                        }}>
                          {selectedOptionObj.type === 'correct' ? 'DECISIÓN CORRECTA' : selectedOptionObj.type === 'suboptimal' ? 'DECISIÓN SUBÓPTIMA' : 'DECISIÓN INCORRECTA'}
                          <span style={{ marginLeft: '6px', fontSize: '12px', opacity: 0.8 }}>
                            ({selectedOptionObj.points >= 0 ? `+${selectedOptionObj.points}` : selectedOptionObj.points} pts)
                          </span>
                        </h4>
                      </div>

                      {/* Scientific Evidence Badge */}
                      <div style={{
                        display: 'flex',
                        background: 'rgba(255, 255, 255, 0.04)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        fontSize: '10.5px',
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                        alignSelf: 'flex-start',
                      }}>
                        📚 Evidencia: ASRA/SOAP 2023 • IHS ICHD-3 2018
                      </div>

                      <p style={{
                        fontSize: '13.5px',
                        lineHeight: '1.6',
                        color: 'var(--text-secondary)',
                        margin: 0,
                      }}>
                        {selectedOptionObj.feedback}
                      </p>

                      <button
                        onClick={handleContinue}
                        style={{
                          background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)',
                          color: '#060a14',
                          border: 'none',
                          padding: '12px 20px',
                          borderRadius: '8px',
                          fontSize: '13.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          marginTop: '8px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          transition: 'all 0.2s',
                        }}
                      >
                        {simStep === 3 ? 'Ver Resultados Finales 📊' : 'Continuar al Siguiente Paso ➜'}
                      </button>
                    </div>
                  ) : (
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.15)',
                      border: '1px dashed var(--border)',
                      borderRadius: '16px',
                      padding: '30px 20px',
                      textAlign: 'center',
                      color: 'var(--text-muted)',
                      fontSize: '13px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      alignItems: 'center',
                    }}>
                      <span style={{ fontSize: '28px' }}>💡</span>
                      <span>Seleccione una opción de respuesta a la izquierda para evaluar la conducta y analizar su sustento científico basado en guías internacionales.</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Completion Screen (Step 4) */}
            {simStep === 4 && (
              <div style={{
                background: 'rgba(15, 23, 42, 0.3)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '650px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: points === 30 ? 'rgba(34, 197, 94, 0.15)' : points >= 15 ? 'rgba(234, 179, 8, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  border: points === 30 ? '2px solid #22c55e' : points >= 15 ? '2px solid #eab308' : '2px solid #ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                }}>
                  {points === 30 ? '🏆' : points >= 15 ? '🎓' : '⚠️'}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#f1f5f9', margin: 0 }}>
                    ¡Simulación de Caso Clínico Finalizada!
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
                    Puntaje final obtenido: <strong style={{ color: '#f97316', fontSize: '18px' }}>{points} / 30</strong> puntos.
                  </p>
                </div>

                {/* Score Review Box */}
                <div style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  fontSize: '13.5px',
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)',
                }}>
                  {points === 30 ? (
                    <span><strong>¡Excelente desempeño!</strong> Has tomado las mejores decisiones clínicas guiadas rigurosamente por la evidencia científica del <strong>Consenso Internacional ASRA/SOAP 2023</strong> y de la <strong>IHS ICHD-3 2018</strong>. Has aliviado el dolor de la paciente eficazmente y restaurado su capacidad de lactar de forma segura.</span>
                  ) : points >= 15 ? (
                    <span><strong>Buen desempeño.</strong> Lograste resolver satisfactoriamente el cuadro de CPPD de Sofía, aunque tomaste alguna conducta inicial subóptima o no del todo recomendada por las guías modernas. Recuerda evitar los parches hemáticos profilácticos tempranos e infusiones epidurales de salina como primera línea.</span>
                  ) : (
                    <span><strong>Desempeño Insuficiente.</strong> Has tomado decisiones que prolongaron el dolor de la paciente o que incluso supusieron un riesgo directo grave (como realizar otra punción lumbar, lo cual duplica la fuga de LCR). Te recomendamos revisar con detalle la pestaña de Fisiopatología y Criterios Diagnósticos e intentar de nuevo.</span>
                  )}
                </div>

                {/* Patient Outcome Summary */}
                <div style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}>
                  <h4 style={{ margin: 0, fontSize: '13px', color: '#f1f5f9', fontWeight: 700, letterSpacing: '0.5px' }}>
                    ESTADO FINAL DE LA PACIENTE:
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.3)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '12.5px',
                    }}>
                      <span style={{ color: 'var(--text-muted)' }}>Cefalea (EVA):</span>
                      <strong style={{ color: evaPain <= 3 ? '#4ade80' : evaPain <= 6 ? '#fbbf24' : '#f87171' }}>
                        {evaPain}/10
                      </strong>
                    </div>
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.3)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '12.5px',
                    }}>
                      <span style={{ color: 'var(--text-muted)' }}>Lactancia:</span>
                      <strong style={{ color: breastfeedingStatus === 'normal' ? '#4ade80' : breastfeedingStatus === 'con_dificultad' ? '#fbbf24' : '#f87171' }}>
                        {breastfeedingStatus === 'normal' ? 'Normalizada' : breastfeedingStatus === 'con_dificultad' ? '#fbbf24' : '#f87171' }
                      </strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleRestart}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#f1f5f9',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                  className="restart-button"
                >
                  🔄 Reiniciar Caso Clínico
                </button>
              </div>
            )}
          </div>
        )}
        {activeTab === 'referencias' && <div style={{ color: 'var(--text-muted)' }}>Módulo Referencias en desarrollo...</div>}
      </div>
    </main>
  );
}