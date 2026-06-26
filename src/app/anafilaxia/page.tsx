"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Tipos para el estado del simulador
type Phase = 'intro' | 'recognition' | 'immediate' | 'adrenaline' | 'refractory' | 'tryptase' | 'summary';
type CaseType = 'general' | 'oftalmo';

interface AnswerOption {
  text: string;
  isCorrect: boolean;
  scorePenalty: number;
  feedback: string;
}

interface CasePhaseData {
  title: string;
  question: string;
  options: AnswerOption[];
  guidelineFact: string;
  vitalsOnStart: { hr: number; bp: string; spo2: number; etco2: number; pmax: number; state: 'normal' | 'crisis' | 'warning' | 'fatal' };
  vitalsOnSuccess: { hr: number; bp: string; spo2: number; etco2: number; pmax: number; state: 'normal' | 'crisis' | 'warning' | 'fatal' };
  vitalsOnFailure: { hr: number; bp: string; spo2: number; etco2: number; pmax: number; state: 'normal' | 'crisis' | 'warning' | 'fatal' };
}

export default function AnafilaxiaPage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedCase, setSelectedCase] = useState<CaseType>('general');
  const [score, setScore] = useState<number>(100);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'mecanismo' | 'grados' | 'mrgprx2' | 'nap6'>('mecanismo');
  const [showAlgorithm, setShowAlgorithm] = useState<boolean>(false);
  const [currentVitals, setCurrentVitals] = useState({
    hr: 75,
    bp: '115/70',
    spo2: 99,
    etco2: 38,
    pmax: 15,
    state: 'normal' as 'normal' | 'crisis' | 'warning' | 'fatal'
  });

  useEffect(() => {
    document.title = "Simulador de Anafilaxia Perioperatoria | AnesthTR";
  }, []);

  // CASO 1: ANESTESIA GENERAL (COLECISTECTOMÍA)
  const caseDataGeneral: Record<Exclude<Phase, 'intro' | 'summary'>, CasePhaseData> = {
    recognition: {
      title: "Fase 1: Reconocimiento Clínico",
      question: "Paciente femenina de 34 años en colecistectomía laparoscópica. Recibió inducción con propofol, fentanilo y rocuronio. A los 5 minutos de iniciar la cirugía y pasar el antibiótico profiláctico (Co-amoxiclav IV), el monitor activa alarmas: la presión arterial cae de 115/70 a 55/30 mmHg, la frecuencia cardíaca sube a 125 lpm, las presiones de la vía aérea aumentan a 38 cm H2O (broncoespasmo severo) y la SpO2 desciende rápidamente a 92% con aplanamiento del EtCO2 (28 mmHg). ¿Cuál es tu sospecha diagnóstica inicial?",
      options: [
        {
          text: "Anafilaxia Perioperatoria Grado 3 (colapso cardiovascular y/o broncoespasmo severo).",
          isCorrect: true,
          scorePenalty: 0,
          feedback: "¡Excelente! El inicio abrupto de hipotensión profunda (shock), broncoespasmo grave con aumento de presiones ventilatorias y desaturación, tras la administración de un antibiótico beta-lactámico y un bloqueador neuromuscular, es la presentación clásica de anafilaxia perioperatoria Grado 3 (riesgo vital)."
        },
        {
          text: "Plano anestésico superficial secundario al estímulo quirúrgico de la incisión.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. Aunque el estímulo quirúrgico puede causar hipertensión y taquicardia en un plano superficial, nunca explicaría una hipotensión tan severa (55/30 mmHg) combinada con broncoespasmo y desaturación súbita."
        },
        {
          text: "Sobredosificación de agentes inductores o infusión de propofol excesiva.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. La sobredosis de propofol causa vasodilatación e hipotensión, pero típicamente disminuye la FC (o no causa taquicardia refleja tan severa) y no explica el aumento súbito de la presión en la vía aérea a 38 cm H2O (broncoespasmo)."
        },
        {
          text: "Shock cardiogénico primario debido a infarto agudo de miocardio transoperatorio.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. Aunque es un diagnóstico diferencial del shock distributivo profundo, es muy raro en una paciente joven sin antecedentes y no explicaría el severo broncoespasmo sincrónico con la administración de co-amoxiclav."
        }
      ],
      guidelineFact: "Según las guías de la Association of Anaesthetists (2021) y el NAP6, la anafilaxia perioperatoria suele presentarse durante la inducción y el signo de presentación más frecuente es la hipotensión severa (colapso cardiovascular), seguido de broncoespasmo/dificultad ventilatoria. Las manifestaciones cutáneas (eritema, urticaria) suelen estar ocultas bajo los campos quirúrgicos o ausentes inicialmente debido al shock.",
      vitalsOnStart: { hr: 125, bp: '55/30', spo2: 92, etco2: 28, pmax: 38, state: 'crisis' },
      vitalsOnSuccess: { hr: 128, bp: '52/28', spo2: 91, etco2: 26, pmax: 39, state: 'crisis' },
      vitalsOnFailure: { hr: 130, bp: '48/25', spo2: 89, etco2: 23, pmax: 41, state: 'crisis' }
    },
    immediate: {
      title: "Fase 2: Medidas Inmediatas",
      question: "Confirmas la sospecha de Anafilaxia. ¿Cuál es el primer conjunto de acciones inmediatas que debes realizar de forma prioritaria según las guías vigentes?",
      options: [
        {
          text: "Suspender todo agente sospechoso (antibiótico/infusiones), disminuir o suspender sevoflurano (para evitar sobredosis miocárdica en bajo gasto), pedir ayuda y el carro de emergencias, administrar O2 al 100% y colocar a la paciente en posición Trendelenburg.",
          isCorrect: true,
          scorePenalty: 0,
          feedback: "¡Correcto! Detener el antígeno (gatillo sospechoso) es crucial. Reducir o suspender el sevoflurano evita el colapso miocárdico adicional bajo vasodilatación masiva. Pedir ayuda y el carro de reanimación es vital, al igual que optimizar la precarga (Trendelenburg/piernas arriba) y ventilar con O2 al 100%."
        },
        {
          text: "Tomar una muestra de sangre para gases arteriales y triptasa sérica de forma inmediata.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. Aunque el diagnóstico de laboratorio es crucial, esto nunca debe retrasar las medidas de reanimación inmediatas, la interrupción del gatillo y la administración de adrenalina."
        },
        {
          text: "Administrar Sugammadex 16 mg/kg IV inmediatamente bajo la sospecha de alergia al rocuronio.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. Aunque sugammadex es el reversor del rocuronio, la prioridad absoluta antes de considerar sugammadex es estabilizar hemodinámicamente a la paciente, suspender el antibiótico sospechoso y preparar la adrenalina. El sugammadex no reemplaza la reanimación básica."
        },
        {
          text: "Profundizar la anestesia con un bolo de propofol para mitigar el broncoespasmo por estímulo.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. Administrar propofol en un paciente con colapso hemodinámico severo (52/28 mmHg) causará un paro cardíaco inmediato por abolición del tono simpático residual."
        }
      ],
      guidelineFact: "Las guías de la Association of Anaesthetists insisten en el acrónimo clásico de interrupción inmediata: detener sospechosos (especialmente antibióticos e infusiones), suspender inductores volátiles/TIVA si hay shock profundo para evitar sobredosificación relativa por baja perfusión, dar 100% de oxígeno, elevar las extremidades inferiores y declarar la emergencia.",
      vitalsOnStart: { hr: 128, bp: '52/28', spo2: 91, etco2: 26, pmax: 39, state: 'crisis' },
      vitalsOnSuccess: { hr: 125, bp: '50/26', spo2: 91, etco2: 26, pmax: 39, state: 'crisis' },
      vitalsOnFailure: { hr: 135, bp: '40/20', spo2: 85, etco2: 18, pmax: 42, state: 'fatal' }
    },
    adrenaline: {
      title: "Fase 3: Tratamiento Farmacológico Inicial",
      question: "La paciente continúa en shock profundo (50/26 mmHg) con vía IV permeable y monitorizada. ¿Cuál es el fármaco de elección, dosis y vía de administración correctos según el algoritmo de la Association of Anaesthetists 2021?",
      options: [
        {
          text: "Adrenalina 50 microgramos IV (0.5 mL de la solución diluida de 1:10,000) y pasar un bolo rápido de cristaloides a 20 mL/kg.",
          isCorrect: true,
          scorePenalty: 0,
          feedback: "¡Excelente! En un paciente anestesiado bajo monitorización continua y con vía IV permeable, el fármaco de elección es la Adrenalina en bolos titulados de 50 mcg IV (0.05 mg), repitiendo según sea necesario. Acompañar inmediatamente con una carga agresiva de cristaloides (20 ml/kg) debido al secuestro masivo de volumen por fuga capilar."
        },
        {
          text: "Adrenalina 1 miligramo IV directa en bolo (10 mL de la solución de 1:10,000) para recuperar la presión rápidamente.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "¡Peligro! Administrar 1 mg de Adrenalina IV a un paciente con pulso es la dosis de RCP (paro cardíaco). Provocará hipotensión de rebote, arritmias letales como Fibrilación Ventricular o Taquicardia Ventricular e isquemia miocárdica por vasoconstricción excesiva."
        },
        {
          text: "Adrenalina 0.5 miligramos intramuscular (IM) en la cara anterolateral del muslo.",
          isCorrect: false,
          scorePenalty: 10,
          feedback: "Parcialmente correcto para la comunidad, pero incorrecto en quirófano. La vía IM es excelente para personal no entrenado sin acceso IV. En anestesia, con acceso IV permeable y monitorización, la vía IV titulada es más rápida y segura, ya que la absorción IM está muy comprometida en estados de shock profundo."
        },
        {
          text: "Hidrocortisona 200 mg IV y Clorfenamina 10 mg IV de forma inmediata.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. Los corticoides y antihistamínicos NO salvan vidas en la fase aguda del shock anafiláctico y no son fármacos de primera línea. Su inicio de acción es lento. La adrenalina y los fluidos son la única prioridad absoluta."
        }
      ],
      guidelineFact: "Para adultos bajo anestesia general con shock Grado 3, la dosis inicial de Adrenalina es de 50 mcg IV (para niños <12 años es 1 mcg/kg IV). Se debe acompañar con fluidos IV cristaloides templados (20 ml/kg rápidamente; hasta 50 ml/kg en shock refractario). La adrenalina revierte la vasodilatación sistémica mediante receptores alfa-1, causa broncodilatación mediante beta-2 y estabiliza las membranas de mastocitos y basófilos.\n\n🧪 **DILUCIÓN PRÁCTICA DE ADRENALINA (Paso a paso):**\n1. Toma una ampolleta estándar de Adrenalina de **1 mg / 1 mL** (concentración 1:1,000).\n2. Cárgala en una jeringa de 10 mL y agrega **9 mL de Solución Fisiológica al 0.9%** (para aforar a 10 mL).\n3. Mezcla bien. Ahora tienes una solución de **100 microgramos / mL** (concentración 1:10,000).\n4. Para administrar la dosis indicada de **50 microgramos**, inyecta exactamente **0.5 mL** de esa jeringa. Repite cada 1-2 minutos titulando según respuesta.",
      vitalsOnStart: { hr: 125, bp: '50/26', spo2: 91, etco2: 26, pmax: 39, state: 'crisis' },
      vitalsOnSuccess: { hr: 118, bp: '65/35', spo2: 93, etco2: 28, pmax: 39, state: 'warning' },
      vitalsOnFailure: { hr: 165, bp: '185/115', spo2: 88, etco2: 20, pmax: 40, state: 'fatal' }
    },
    refractory: {
      title: "Fase 4: Shock y Broncoespasmo Refractarios",
      question: "Administraste el bolo de 50 mcg de Adrenalina e infundiste 1 litro de lactato de Ringer. La presión arterial sube levemente a 65/35 mmHg, pero las presiones de la vía aérea siguen elevadas (39 cm H2O) con sibilancias audibles severas. El residente de apoyo te comenta que la paciente toma Propranolol (betabloqueador no selectivo) de forma crónica. ¿Cuál es el manejo adecuado para este escenario refractario?",
      options: [
        {
          text: "Administrar un segundo bolo de Adrenalina 50 mcg IV, considerar iniciar infusión continua de Adrenalina (0.05-0.4 mcg/kg/min), administrar Glucagón 1-2 mg IV lento (si está disponible) o la alternativa en México por desabasto: Vasopresina 1-2 UI IV en bolo seguido de infusión de Noradrenalina, junto con Sulfato de Magnesio 2g IV y Salbutamol para el broncoespasmo.",
          isCorrect: true,
          scorePenalty: 0,
          feedback: "¡Excelente! En pacientes betabloqueados, la adrenalina puede no funcionar o causar hipertensión/bradicardia paradójica (efecto alfa puro sin oposición). El Glucagón (1-2 mg IV en adultos) es el fármaco de elección para rescatar estos casos, ya que aumenta el AMPc intracelular por una vía independiente de los receptores beta. La alternativa de elección en México (donde no hay Glucagón en los carros de paro) es la Vasopresina (1-2 UI IV en bolo, repetido o en infusión) y soporte inotrópico con Noradrenalina."
        },
        {
          text: "Aumentar inmediatamente la concentración de Sevoflurano al 4% para forzar una broncodilatación química potente.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. Aunque el sevoflurano es un excelente broncodilatador, los agentes inhalatorios halogenados deprimen la contractilidad cardíaca y provocan vasodilatación periférica severa. Aumentar la dosis al 4% en un shock refractario (65/35 mmHg) causará asistolia inmediata."
        },
        {
          text: "Duplicar la dosis de Adrenalina IV a bolos de 200 mcg cada minuto hasta normalizar la presión.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. Incrementar los bolos a 200 mcg en un paciente con betabloqueo crónico puede desencadenar vasoconstricción periférica extrema nociva y arritmias ventriculares graves sin resolver el broncoespasmo."
        },
        {
          text: "Suspender la reanimación con Adrenalina e iniciar una infusión de Dopamina a 20 mcg/kg/min.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. La dopamina es ineficaz y arritmogénica en la anafilaxia refractaria. Se prefiere la infusión de adrenalina y el rescate con vasopresores alternativos."
        }
      ],
      guidelineFact: "El shock anafiláctico refractario se define como la persistencia de hipotensión o broncoespasmo a pesar de dos bolos adecuados de Adrenalina y fluidoterapia. En betabloqueados, la adrenalina falla. El Glucagón (1-2 mg IV) es el tratamiento clásico. \n\n🇲🇽 **ALTERNATIVA EN MÉXICO (POR FALTA DE GLUCAGÓN):**\nEn el contexto de salud de México, el glucagón es de difícil acceso y no se encuentra en la mayoría de los carros de paro. La alternativa de elección es la **Vasopresina IV** (dosis inicial de **1 a 2 Unidades en bolo IV**, que puede repetirse, o infusión continua a 0.01-0.04 U/min) para estabilizar la vasculatura mediante receptores V1, que son completamente independientes del sistema adrenérgico. Se combina con infusión de **Noradrenalina** y manejo del broncoespasmo con **Sulfato de Magnesio 2g IV** y beta-2 agonistas.",
      vitalsOnStart: { hr: 118, bp: '65/35', spo2: 93, etco2: 28, pmax: 39, state: 'warning' },
      vitalsOnSuccess: { hr: 95, bp: '95/55', spo2: 97, etco2: 34, pmax: 22, state: 'normal' },
      vitalsOnFailure: { hr: 125, bp: '58/28', spo2: 84, etco2: 22, pmax: 42, state: 'fatal' }
    },
    tryptase: {
      title: "Fase 5: Estabilización y Diagnóstico Retrospectivo",
      question: "La paciente responde a la vasopresina/glucagón, la adrenalina y el sulfato de magnesio. La presión se estabiliza en 105/62 mmHg, la presión de la vía aérea desciende a 21 cm H2O y la SpO2 sube a 98%. Deciden suspender la cirugía y trasladar a la paciente a la UCI. Para confirmar el diagnóstico y derivar a alergología, ¿cuál es el protocolo correcto para la toma de muestras de Triptasa Sérica?",
      options: [
        {
          text: "Muestra 1: Inmediatamente o dentro de las primeras 2 horas post-estabilización. Muestra 2: A las 1-2 horas (máximo 4 horas) post-reacción. Muestra 3: A las 24 horas (basal). Registrar la hora exacta de cada toma.",
          isCorrect: true,
          scorePenalty: 0,
          feedback: "¡Excelente! La triptasa sérica apoya el diagnóstico retrospectivo. La elevación máxima ocurre entre 1 y 2 horas tras el inicio del cuadro. La toma de 3 muestras seriadas (incluyendo la basal a las 24 horas para comparativa) es el estándar de oro recomendado para confirmar degranulación de mastocitos."
        },
        {
          text: "Tomar una muestra única al egreso de la UCI (a las 48 horas) para documentar el estado metabólico basal.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. La vida media de la triptasa en plasma es de aproximadamente 2 horas. Tomar una muestra únicamente a las 48 horas no reflejará el pico transoperatorio, perdiendo la oportunidad de documentar la degranulación aguda."
        },
        {
          text: "No es necesario tomar triptasa ya que el diagnóstico clínico es evidente. Se da de alta con indicación de evitar de por vida todos los antibióticos y anestésicos.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "¡Muy incorrecto! Etiquetar a un paciente como alérgico a todos los fármacos de forma indiscriminada le priva de alternativas terapéuticas en el futuro. Es obligatorio confirmar mediante triptasa y remitir a un centro de alergología especializado para pruebas cutáneas específicas que identifiquen el causante exacto (antibiótico, rocuronio, látex o clorhexidina)."
        },
        {
          text: "Tomar una muestra únicamente de orina para determinar metabolitos de histamina metilada.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. La triptasa sérica es el biomarcador más estable, específico y recomendado universalmente por las sociedades de anestesiología y alergias."
        }
      ],
      guidelineFact: "La confirmación de la degranulación de mastocitos requiere demostrar una elevación transitoria de la triptasa sérica durante la fase aguda que luego cae a niveles basales. La fórmula diagnóstica estándar para confirmar que una elevación de triptasa es significativa es: Triptasa Pico > (1.2 x Triptasa Basal) + 2 mcg/L.",
      vitalsOnStart: { hr: 95, bp: '95/55', spo2: 97, etco2: 34, pmax: 22, state: 'normal' },
      vitalsOnSuccess: { hr: 82, bp: '110/68', spo2: 99, etco2: 38, pmax: 18, state: 'normal' },
      vitalsOnFailure: { hr: 90, bp: '100/60', spo2: 96, etco2: 35, pmax: 20, state: 'normal' }
    }
  };

  // CASO 2: OFTALMOLOGÍA (BLOQUEO RETROBULBAR)
  const caseDataOftalmo: Record<Exclude<Phase, 'intro' | 'summary'>, CasePhaseData> = {
    recognition: {
      title: "Fase 1: Reconocimiento Clínico",
      question: "Paciente masculino de 68 años (Don Arturo) programado para cirugía de catarata. Recibe sedación leve con midazolam 1 mg + fentanilo 50 mcg y se realiza bloqueo retrobulbar con lidocaína 2% + bupivacaína 0.75% (total 4 mL). A los 5 minutos del bloqueo, el paciente (aún consciente) refiere prurito palmar y facial intenso, tos seca persistente, opresión faríngea (disnea) y presenta angioedema palpebral y labial marcado. Rápidamente pierde el conocimiento, la PA cae a 60/40 mmHg y la SpO2 desciende a 85%. ¿Cuál es tu sospecha diagnóstica inicial?",
      options: [
        {
          text: "Anafilaxia Perioperatoria Grado 3 (compromiso circulatorio y de vía aérea secundario a angioedema).",
          isCorrect: true,
          scorePenalty: 0,
          feedback: "¡Excelente! La tríada de prurito inicial y angioedema (hinchazón) facial/labial, seguido rápidamente por pérdida del conocimiento, colapso cardiovascular (PA 60/40 mmHg) y desaturación es la presentación clásica de anafilaxia Grado 3 bajo anestesia local/sedación. El gatillo puede ser el anestésico local (raro pero posible), látex o clorhexidina."
        },
        {
          text: "Anestesia del Tallo Cerebral por inyección subaracnoidea accidental del anestésico local a través de la vaina del nervio óptico.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. Aunque la inyección subaracnoidea en un bloqueo retrobulbar causa pérdida del conocimiento y apnea rápida (por parálisis de pares craneales y bulbares), jamás se presentará con prurito palmar, tos seca ni angioedema cutáneo (hinchazón de labios/párpados). Es un diagnóstico diferencial crucial sin componente inmunológico."
        },
        {
          text: "Reflejo Óculo-Cardíaco severo secundario a la presión sobre el globo ocular durante el bloqueo.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. El reflejo óculo-cardíaco causa bradicardia extrema o asistolia e hipotensión debido a la estimulación del nervio trigémino (rama oftálmica) y la respuesta eferente vagal. No produce angioedema, prurito ni tos."
        },
        {
          text: "Toxicidad Sistémica por Anestésicos Locales (LAST) por inyección intravascular directa.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. La toxicidad sistémica por lidocaína/bupivacaína causa pródromos neurológicos (sabor metálico, acúfenos), agitación, convulsiones tónico-clónicas y colapso cardiovascular, pero no se presenta con angioedema ni prurito."
        }
      ],
      guidelineFact: "En pacientes despiertos bajo sedación o anestesia regional, el reconocimiento de la anafilaxia incluye la comunicación de síntomas subjetivos: prurito (palmar/plantar), tos seca, sensación de opresión faríngea (cierre de glotis) y disnea. La presencia de angioedema (hinchazón de mucosas y piel) confirma el proceso degranulatorio masivo y orienta rápidamente al diagnóstico antes del colapso circulatorio total.",
      vitalsOnStart: { hr: 110, bp: '60/40', spo2: 85, etco2: 30, pmax: 20, state: 'crisis' },
      vitalsOnSuccess: { hr: 115, bp: '58/35', spo2: 84, etco2: 28, pmax: 22, state: 'crisis' },
      vitalsOnFailure: { hr: 120, bp: '50/30', spo2: 80, etco2: 25, pmax: 25, state: 'crisis' }
    },
    immediate: {
      title: "Fase 2: Medidas Inmediatas",
      question: "El paciente está inconsciente y con disnea grave. ¿Cuáles son tus primeras acciones terapéuticas de rescate?",
      options: [
        {
          text: "Suspender la cirugía, pedir ayuda médica de inmediato, traer el carro de paros, administrar O2 al 100% con bolsa-válvula-mascarilla (preparar videolaringoscopio por angioedema laríngeo inminente), colocar al paciente en Trendelenburg y detener cualquier fármaco sospechoso.",
          isCorrect: true,
          scorePenalty: 0,
          feedback: "¡Excelente decisión! Interrumpir la cirugía y pedir ayuda es lo primero. La oxigenación con presión positiva con mascarilla es vital debido al angioedema que reduce el diámetro de la vía aérea. Elevar las extremidades inferiores mejora el retorno venoso drásticamente."
        },
        {
          text: "Iniciar inmediatamente una infusión de emulsión lipídica al 20% (Intralipid) para revertir la bupivacaína.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. La emulsión lipídica es el tratamiento específico para LAST. Este paciente presenta angioedema y prurito claro de una reacción anafiláctica; administrar lípidos retrasará el manejo de la vía aérea y la adrenalina."
        },
        {
          text: "Administrar Flumazenil 0.2 mg IV y Naloxona 0.04 mg IV para revertir la sedación y hacer que el paciente despierte y respire.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. La pérdida de conocimiento y la desaturación aquí son causadas por el shock anafiláctico profundo y la obstrucción laríngea por angioedema, no por las dosis mínimas de sedación administradas. Revertirlas no resolverá la crisis y causará dolor y agitación."
        },
        {
          text: "Realizar cricotiroidotomía de urgencia inmediatamente en el quirófano de oftalmología.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. La cricotiroidotomía es la última opción en el algoritmo de vía aérea difícil (escenario No puedo intubar, No puedo oxigenar - CICO). Primero debes intentar ventilar con O2 al 100% y mascarilla, y administrar adrenalina para reducir el angioedema laríngeo."
        }
      ],
      guidelineFact: "Las medidas iniciales en un paciente despierto que colapsa por anafilaxia incluyen detener el procedimiento oftálmico, pedir auxilio y colocar al paciente en decúbito supino con piernas elevadas (Trendelenburg). Esto último puede ser suficiente para revertir hipotensiones moderadas al restaurar el gasto cardíaco, pero si el paciente está inconsciente y desaturando, el aporte de O2 y la preparación de una vía aérea avanzada son mandatorios.",
      vitalsOnStart: { hr: 115, bp: '58/35', spo2: 84, etco2: 28, pmax: 22, state: 'crisis' },
      vitalsOnSuccess: { hr: 118, bp: '55/32', spo2: 83, etco2: 28, pmax: 22, state: 'crisis' },
      vitalsOnFailure: { hr: 125, bp: '45/25', spo2: 78, etco2: 20, pmax: 26, state: 'fatal' }
    },
    adrenaline: {
      title: "Fase 3: Tratamiento Farmacológico Inicial",
      question: "Don Arturo continúa inconsciente, hipotenso (55/32 mmHg) y desaturando (83%). El residente oftálmico duda si la vía venosa periférica se encuentra permeable. ¿Cuál es la dosificación y vía de administración correctas de Adrenalina para este paciente?",
      options: [
        {
          text: "Comprobar permeabilidad de la vía IV y administrar un bolo titulado de Adrenalina 50 mcg IV (0.5 mL de la solución diluida 1:10,000); si no hay acceso IV seguro en 1 minuto, administrar Adrenalina 0.5 mg IM (0.5 mL de la ampolleta 1:1,000 sin diluir) en el muslo, junto con infusión rápida de cristaloides.",
          isCorrect: true,
          scorePenalty: 0,
          feedback: "¡Excelente decisión! Si cuentas con una vía IV permeable y monitor, la vía IV titulada con 50 mcg es la de elección en el entorno quirúrgico. Sin embargo, en salas periféricas o si el catéter está infiltrado, no debes perder tiempo: administra 0.5 mg IM en la cara anterolateral del muslo de inmediato. La adrenalina detendrá la progresión del angioedema de la vía aérea y revertirá la vasodilatación del shock."
        },
        {
          text: "Administrar Hidrocortisona 200 mg IV más Difenhidramina 50 mg IV como único tratamiento, esperando recuperación.",
          isCorrect: false,
          scorePenalty: 25,
          feedback: "¡Muy peligroso! Este es un error común. Los esteroides y antihistamínicos tardan horas en actuar. En un paciente con choque profundo, pérdida del conocimiento y desaturación, retrasar la adrenalina es fatal. Los antihistamínicos y corticoides solo sirven de soporte secundario en fases estables para evitar reacciones tardías."
        },
        {
          text: "Adrenalina 1 mg IV directo en bolo sin diluir por la vía disponible.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "¡Peligro! Administrar 1 mg de Adrenalina IV a un paciente con pulso (taquicardia de 118 lpm) causará crisis hipertensiva extrema, infarto agudo de miocardio o arritmias ventriculares letales. Esta dosis solo se usa en paro cardíaco documentado."
        },
        {
          text: "Diluir 1 ampolleta de Adrenalina en 250 mL de solución fisiológica y pasar a goteo lento.",
          isCorrect: false,
          scorePenalty: 15,
          feedback: "Incorrecto. En una situación de colapso severo agudo (Grado 3) se requiere una dosis en bolo rápida (sea IV titulada de 50 mcg o IM de 500 mcg) para frenar la degranulación y aumentar la presión de perfusión coronaria de inmediato. El goteo lento tardará demasiado en alcanzar concentraciones efectivas."
        }
      ],
      guidelineFact: "🧪 **DILUCIÓN CLAVE DE ADRENALINA (Paso a paso):**\n1. Toma una ampolleta estándar de Adrenalina de **1 mg / 1 mL** (1:1,000).\n2. Cárgala en una jeringa de 10 mL y afora con **9 mL de Solución Fisiológica al 0.9%**.\n3. Ahora tienes una jeringa con **100 mcg / mL** (1:10,000).\n4. Si el paciente tiene vía IV segura, administra **0.5 mL** de la jeringa (equivalente a **50 mcg**).\n5. Si no hay vía IV permeable, usa **otra jeringa** y aplica **0.5 mL de la ampolleta original sin diluir** (0.5 mg / 500 mcg) por vía intramuscular (IM) profunda en el muslo.\n\n⚠️ **NOTA SOBRE ANTIHISTAMÍNICOS Y ESTEROIDES:** Si tu paciente recuperó de inmediato con hidrocortisona y difenhidramina, se trataba de una reacción leve (Grado 1-2) o un síncope vasovagal con angioedema limitado. En anafilaxia Grado 3 (hipotensión severa + pérdida de conciencia + desaturación), los antihistamínicos y esteroides NO salvan vidas en la fase aguda. La Adrenalina es el único fármaco de primera línea obligatorio.",
      vitalsOnStart: { hr: 118, bp: '55/32', spo2: 83, etco2: 28, pmax: 22, state: 'crisis' },
      vitalsOnSuccess: { hr: 105, bp: '70/40', spo2: 88, etco2: 30, pmax: 24, state: 'warning' },
      vitalsOnFailure: { hr: 155, bp: '178/110', spo2: 78, etco2: 20, pmax: 28, state: 'fatal' }
    },
    refractory: {
      title: "Fase 4: Manejo de Vía Aérea y Betabloqueo",
      question: "La presión sube levemente a 70/40 mmHg y la SpO2 está en 88%. Sin embargo, el angioedema labial y lingual empeora rápidamente y se escucha un estridor laríngeo severo al intentar ventilar con mascarilla. El paciente toma Metoprolol de forma crónica por hipertensión. ¿Qué conducta es la adecuada en este momento?",
      options: [
        {
          text: "Administrar un segundo bolo de Adrenalina, dar Glucagón 1-2 mg IV lento (o Vasopresina 1-2 UI IV si no hay glucagón en tu clínica), y proceder a intubación traqueal asistida por videolaringoscopia con personal experimentado listo para vía aérea quirúrgica en caso de falla.",
          isCorrect: true,
          scorePenalty: 0,
          feedback: "¡Excelente! La presencia de estridor y angioedema progresivo lingual/faríngeo indica obstrucción inminente de la vía aérea. Se debe asegurar la vía aérea mediante videolaringoscopia para evitar traumas que inflamen más la zona. El metoprolol bloquea los efectos de la adrenalina; el Glucagón es el reanimador específico (o la Vasopresina en México) para restablecer la presión celular sin depender de los receptores beta bloqueados."
        },
        {
          text: "Administrar los bolos de adrenalina IV a 500 mcg cada minuto e intubar al paciente a ciegas con un tubo endotraqueal estándar.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "¡Peligro! La intubación a ciegas o forzada en un paciente con angioedema severo de la vía aérea puede desgarrar la mucosa, provocar hemorragias masivas y causar un cierre total y definitivo de la glotis, resultando en un escenario de asfixia letal."
        },
        {
          text: "Administrar Sugammadex 16 mg/kg IV para neutralizar cualquier efecto de relajación residual.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. En este caso de oftalmología bajo anestesia local y sedación, no se administró ningún bloqueador neuromuscular como rocuronio. El sugammadex no tiene ninguna indicación en este escenario y no servirá de nada."
        },
        {
          text: "Administrar un bolo de Propofol 100 mg IV para facilitar la visualización de la laringe.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "¡Peligro! Administrar un bolo de propofol en un paciente en shock refractario (70/40 mmHg) abolirá el tono simpático y causará colapso cardiovascular irreversible (paro en asistolia)."
        }
      ],
      guidelineFact: "En pacientes betabloqueados, la adrenalina puede causar vasoconstricción alfa extrema sin oposición beta, empeorando el broncoespasmo y la hipertensión paradójica, o bien no tener efecto. El Glucagón (1-2 mg IV) o la **Vasopresina (1-2 UI IV)** (alternativa mexicana) activan la adenilato ciclasa a través de receptores no adrenérgicos. En angioedema grave, se prefiere asegurar la vía aérea de forma temprana usando videolaringoscopio por personal capacitado antes de que la inflamación obstruya la glotis por completo.",
      vitalsOnStart: { hr: 105, bp: '70/40', spo2: 88, etco2: 30, pmax: 24, state: 'warning' },
      vitalsOnSuccess: { hr: 90, bp: '95/58', spo2: 97, etco2: 35, pmax: 18, state: 'normal' },
      vitalsOnFailure: { hr: 110, bp: '62/30', spo2: 81, etco2: 24, pmax: 28, state: 'fatal' }
    },
    tryptase: {
      title: "Fase 5: Estabilización y Diagnóstico de Alergias",
      question: "Se logra intubar a Don Arturo mediante videolaringoscopia. Tras pasar la vasopresina/glucagón y líquidos, el paciente se estabiliza con PA de 105/65 mmHg y SpO2 de 98%. Se decide trasladar a la UCI y suspender la cirugía de catarata. Para la investigación del alérgeno causal en el postoperatorio, ¿cuál es la conducta adecuada?",
      options: [
        {
          text: "Iniciar la toma de 3 muestras seriadas de Triptasa Sérica (Muestra 1 inmediata, Muestra 2 a las 1-2 horas, Muestra 3 a las 24 horas) y enviar interconsulta a Alergología para realizar pruebas cutáneas específicas en 4-6 semanas.",
          isCorrect: true,
          scorePenalty: 0,
          feedback: "¡Excelente! La triptasa sérica confirmará la degranulación de mastocitos y la naturaleza anafiláctica de la crisis. La interconsulta con el alergólogo es obligatoria para identificar el antígeno causante (que podría ser la lidocaína/bupivacaína, la clorhexidina del lavado oftálmico, el látex o los fármacos de sedación) mediante pruebas cutáneas (prick tests) e intradérmicas."
        },
        {
          text: "Asumir que el paciente es alérgico a todos los anestésicos locales y prohibir su uso de por vida.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. La alergia real a los anestésicos locales tipo amida es sumamente rara (<1% de los casos reportados). Prohibirlos de por vida sin realizar pruebas priva al paciente de recibir bloqueos regionales o anestesia dental en el futuro de forma innecesaria. Se debe identificar el agente real."
        },
        {
          text: "No realizar estudios ya que el paciente se recuperó por completo y el evento ya pasó.",
          isCorrect: false,
          scorePenalty: 20,
          feedback: "Incorrecto. Un paciente que ha sufrido una anafilaxia perioperatoria grave tiene un alto riesgo de presentar una reacción potencialmente mortal en una futura cirugía si se expone nuevamente al mismo alérgeno no identificado."
        },
        {
          text: "Tomar una muestra de orina de 24 horas únicamente para medir histamina libre.",
          isCorrect: false,
          scorePenalty: 15,
          feedback: "Incorrecto. La medición estándar de oro para el diagnóstico retrospectivo en anestesiología es la triptasa sérica en muestras seriadas de sangre."
        }
      ],
      guidelineFact: "La derivación a una clínica de alergias perioperatorias es un estándar de seguridad de las guías de la Association of Anaesthetists y NAP6. El estudio alergológico debe posponerse de 4 a 6 semanas tras el evento para evitar falsos negativos debido al agotamiento temporal de los gránulos de los mastocitos (periodo refractario). Se deben testar todos los agentes a los que se expuso al paciente, incluidos antisépticos como la clorhexidina y el látex.",
      vitalsOnStart: { hr: 90, bp: '95/58', spo2: 97, etco2: 35, pmax: 18, state: 'normal' },
      vitalsOnSuccess: { hr: 80, bp: '112/68', spo2: 99, etco2: 38, pmax: 15, state: 'normal' },
      vitalsOnFailure: { hr: 85, bp: '100/60', spo2: 96, etco2: 35, pmax: 16, state: 'normal' }
    }
  };

  const handleStart = () => {
    setPhase('recognition');
    setScore(100);
    setSelectedOption(null);
    setSubmitted(false);
    
    const caseData = selectedCase === 'general' ? caseDataGeneral : caseDataOftalmo;
    setCurrentVitals(caseData.recognition.vitalsOnStart);
  };

  const handleOptionSelect = (index: number) => {
    if (submitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null || submitted || phase === 'intro' || phase === 'summary') return;
    
    setSubmitted(true);
    const caseData = selectedCase === 'general' ? caseDataGeneral : caseDataOftalmo;
    const currentPhaseData = caseData[phase];
    const option = currentPhaseData.options[selectedOption];

    // Ajustar puntuación
    setScore(prev => Math.max(0, prev - option.scorePenalty));

    // Ajustar signos vitales basándose en el resultado
    if (option.isCorrect) {
      setCurrentVitals(currentPhaseData.vitalsOnSuccess);
    } else {
      setCurrentVitals(currentPhaseData.vitalsOnFailure);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setSubmitted(false);

    if (phase === 'recognition') {
      setPhase('immediate');
      const caseData = selectedCase === 'general' ? caseDataGeneral : caseDataOftalmo;
      setCurrentVitals(caseData.immediate.vitalsOnStart);
    } else if (phase === 'immediate') {
      setPhase('adrenaline');
      const caseData = selectedCase === 'general' ? caseDataGeneral : caseDataOftalmo;
      setCurrentVitals(caseData.adrenaline.vitalsOnStart);
    } else if (phase === 'adrenaline') {
      setPhase('refractory');
      const caseData = selectedCase === 'general' ? caseDataGeneral : caseDataOftalmo;
      setCurrentVitals(caseData.refractory.vitalsOnStart);
    } else if (phase === 'refractory') {
      setPhase('tryptase');
      const caseData = selectedCase === 'general' ? caseDataGeneral : caseDataOftalmo;
      setCurrentVitals(caseData.tryptase.vitalsOnStart);
    } else if (phase === 'tryptase') {
      setPhase('summary');
      setCurrentVitals({ hr: 80, bp: '118/72', spo2: 99, etco2: 39, pmax: 16, state: 'normal' });
    }
  };

  return (
    <main className="container" style={{ maxWidth: '900px', fontSize: '16.5px' }}>
      
      {/* Estilos para animación slide-in de la barra lateral */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @keyframes modalScale {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          gap: 16px;
        }
        .page-title {
          font-size: 40px;
          font-weight: 900;
          letter-spacing: -0.03em;
        }
        .monitor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 10px;
          margin-bottom: 16px;
          font-size: 14px;
          font-weight: bold;
        }
        .case-selector-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 28px;
        }
        .tabs-navigation {
          display: flex;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 6px;
          margin-bottom: 24px;
          gap: 6px;
        }
        .tabs-navigation button {
          flex: 1;
          padding: 14px;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .pathophysiology-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 10px;
        }
        .big-four-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 14px;
        }
        .qrh-modal {
          width: 100%;
          max-width: 820px;
          max-height: 85vh;
          background: #070b16;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          padding: 32px;
          overflow-y: auto;
          box-shadow: 0 20px 50px rgba(0,0,0,0.7);
          animation: modalScale 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (max-width: 768px) {
          .header-row {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            margin-bottom: 16px;
          }
          .header-row a, .header-row button {
            text-align: center;
            justify-content: center;
            width: 100%;
            font-size: 14.5px !important;
            padding: 10px 16px !important;
          }
          .page-title {
            font-size: 26px !important;
          }
          .monitor-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .case-selector-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 20px;
          }
          .tabs-navigation {
            overflow-x: auto;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            padding: 4px;
            margin-bottom: 16px;
          }
          .tabs-navigation button {
            flex: 0 0 auto !important;
            padding: 10px 14px !important;
            font-size: 13.5px !important;
          }
          .pathophysiology-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .big-four-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .glass-card {
            padding: 18px !important;
          }
          .qrh-modal {
            max-height: 92vh;
            padding: 18px !important;
            border-radius: 12px;
          }
        }
      `}</style>

      {/* HEADER DE SUBPÁGINA */}
      <div className="header-row">
        <Link href="/" className="back-link" style={{ fontSize: '15.5px', padding: '12px 24px', marginBottom: 0 }}>
          ← Volver al Portal de AnesthTR
        </Link>

        {/* Botón para abrir el algoritmo QRH */}
        <button
          onClick={() => setShowAlgorithm(true)}
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            padding: '12px 24px',
            borderRadius: '100px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.18)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
        >
          📖 Consultar Guía Rápida (QRH)
        </button>
      </div>

      <div style={{
        textAlign: 'center',
        padding: '24px 0 16px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '350px', height: '150px',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 70%)',
          filter: 'blur(50px)', pointerEvents: 'none'
        }} />
        <div style={{ marginBottom: '12px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(239, 68, 68, 0.12)', color: '#f87171',
            padding: '8px 18px', borderRadius: '4px', fontSize: '13px',
            fontWeight: 700, letterSpacing: '0.8px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}>
            EMERGENCIA CARDIOVASCULAR
          </span>
        </div>
        <h1 className="page-title" style={{
          background: 'linear-gradient(135deg, #f8fafc 30%, #f87171 70%, #ef4444 100%)',
          WebkitBackgroundClip: 'text', color: 'transparent',
          marginBottom: '10px'
        }}>
          Simulador de Anafilaxia Perioperatoria
        </h1>
        <p style={{ fontSize: '17.5px', color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6, textAlign: 'justify' }}>
          Entrenamiento interactivo del algoritmo de crisis hemodinámica y respiratoria transoperatoria según guías recientes (NAP6 / AAGBI).
        </p>
      </div>

      {/* MONITOR MULTIPARAMÉTRICO */}
      {phase !== 'intro' && (
        <div style={{
          background: '#040710',
          border: `2px solid ${
            currentVitals.state === 'crisis' ? '#ef4444' :
            currentVitals.state === 'fatal' ? '#dc2626' :
            currentVitals.state === 'warning' ? '#f59e0b' : '#10b981'
          }`,
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px',
          boxShadow: `0 0 25px -5px ${
            currentVitals.state === 'crisis' || currentVitals.state === 'fatal' ? 'rgba(239, 68, 68, 0.3)' :
            currentVitals.state === 'warning' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.15)'
          }`,
          fontFamily: 'monospace',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.5s ease'
        }}>
          
          {/* Luz intermitente de alarma */}
          {(currentVitals.state === 'crisis' || currentVitals.state === 'fatal') && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(239, 68, 68, 0.05)',
              animation: 'blink 1.5s infinite',
              pointerEvents: 'none'
            }} />
          )}

          {/* Barra de estado / alarma */}
          <div className="monitor-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: currentVitals.state === 'normal' ? '#10b981' : currentVitals.state === 'warning' ? '#f59e0b' : '#ef4444',
                boxShadow: `0 0 8px ${currentVitals.state === 'normal' ? '#10b981' : currentVitals.state === 'warning' ? '#f59e0b' : '#ef4444'}`,
                animation: 'blink 1s infinite'
              }} />
              <span style={{ color: '#94a3b8' }}>MONITOR DE QUIRÓFANO</span>
            </div>
            
            <div style={{
              color: currentVitals.state === 'normal' ? '#10b981' : currentVitals.state === 'warning' ? '#f59e0b' : '#f87171',
              fontWeight: 700
            }}>
              {currentVitals.state === 'normal' && "ESTADO: ESTABLE"}
              {currentVitals.state === 'warning' && "ALERTA: SHOCK COMPENSADO / COMPROMISO RESPIRATORIO"}
              {currentVitals.state === 'crisis' && "⚠️ CRISIS: SHOCK DISTRIBUTIVO G3 + ANGIODEMA / COMPROMISO VIA AÉREA"}
              {currentVitals.state === 'fatal' && "☠️ ALARMA CRÍTICA: SHOCK REFRACTARIO / ARRITMIA / HIPOXEMIA SEVERA"}
            </div>
          </div>

          {/* Grilla de Signos Vitales */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '14px'
          }}>
            
            {/* FC */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '8px', padding: '14px', position: 'relative'
            }}>
              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>FC (lpm)</span>
              <span style={{
                fontSize: '34px', fontWeight: 'bold',
                color: currentVitals.hr > 120 || currentVitals.hr < 50 ? '#f87171' : '#10b981',
                textShadow: currentVitals.hr > 120 || currentVitals.hr < 50 ? '0 0 10px rgba(239, 68, 68, 0.4)' : '0 0 10px rgba(16, 185, 129, 0.4)'
              }}>{currentVitals.hr}</span>
              {/* Animación latido */}
              <div style={{
                position: 'absolute', right: '12px', top: '12px',
                width: '10px', height: '10px', borderRadius: '50%',
                background: currentVitals.hr > 120 ? '#ef4444' : '#10b981',
                animation: `blink ${60 / currentVitals.hr}s infinite`
              }} />
            </div>

            {/* Presión Arterial */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '8px', padding: '14px'
            }}>
              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>PA (mmHg)</span>
              <span style={{
                fontSize: '34px', fontWeight: 'bold', color: '#f59e0b',
                textShadow: '0 0 10px rgba(245, 158, 11, 0.4)'
              }}>{currentVitals.bp}</span>
            </div>

            {/* Saturación Oxígeno */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '8px', padding: '14px'
            }}>
              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>SpO₂ (%)</span>
              <span style={{
                fontSize: '34px', fontWeight: 'bold',
                color: currentVitals.spo2 < 93 ? '#f87171' : '#38bdf8',
                textShadow: currentVitals.spo2 < 93 ? '0 0 10px rgba(239, 68, 68, 0.4)' : '0 0 10px rgba(56, 189, 248, 0.4)'
              }}>{currentVitals.spo2}</span>
            </div>

            {/* EtCO2 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '8px', padding: '14px'
            }}>
              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>EtCO₂ (mmHg)</span>
              <span style={{
                fontSize: '34px', fontWeight: 'bold',
                color: currentVitals.etco2 < 30 ? '#f59e0b' : '#34d399',
                textShadow: currentVitals.etco2 < 30 ? '0 0 10px rgba(245, 158, 11, 0.4)' : '0 0 10px rgba(52, 211, 153, 0.4)'
              }}>{currentVitals.etco2}</span>
            </div>

            {/* Presión de Vía Aérea */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '8px', padding: '14px'
            }}>
              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Pmax (cmH₂O)</span>
              <span style={{
                fontSize: '34px', fontWeight: 'bold',
                color: currentVitals.pmax > 30 ? '#f87171' : '#10b981',
                textShadow: currentVitals.pmax > 30 ? '0 0 10px rgba(239, 68, 68, 0.4)' : '0 0 10px rgba(16, 185, 129, 0.4)'
              }}>{currentVitals.pmax}</span>
            </div>

          </div>
        </div>
      )}

      {/* CASO INTERACTIVO Y FASES */}
      <div className="glass-card" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '24px',
        padding: '32px',
        animation: 'fadeIn 0.5s ease',
        background: 'var(--surface-solid)',
        opacity: 1,
        transform: 'none'
      }}>
        {phase === 'intro' && (
          <div style={{ padding: '10px 0' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#f1f5f9', marginBottom: '20px', textAlign: 'center' }}>Selecciona tu Escenario Clínico</h3>
            
            <div className="case-selector-grid">
              
              {/* CASO 1 CARRIER */}
              <div
                onClick={() => setSelectedCase('general')}
                style={{
                  border: selectedCase === 'general' ? '2px solid #ef4444' : '1px solid var(--border)',
                  background: selectedCase === 'general' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255,255,255,0.01)',
                  borderRadius: '16px', padding: '24px', cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', flexDirection: 'column', gap: '10px'
                }}
              >
                <div style={{ fontSize: '32px' }}>🏥</div>
                <strong style={{ fontSize: '17px', color: '#f1f5f9' }}>Caso 1: Anestesia General</strong>
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.5, textAlign: 'justify' }}>
                  Cirugía de colecistectomía laparoscópica. Caso clásico bajo intubación endotraqueal. Signos tempranos detectados a través del ventilador mecánico.
                </p>
              </div>

              {/* CASO 2 CARRIER */}
              <div
                onClick={() => setSelectedCase('oftalmo')}
                style={{
                  border: selectedCase === 'oftalmo' ? '2px solid #ef4444' : '1px solid var(--border)',
                  background: selectedCase === 'oftalmo' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255,255,255,0.01)',
                  borderRadius: '16px', padding: '24px', cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', flexDirection: 'column', gap: '10px'
                }}
              >
                <div style={{ fontSize: '32px' }}>👁️</div>
                <strong style={{ fontSize: '17px', color: '#f1f5f9' }}>Caso 2: Oftalmología / Reg.</strong>
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.5, textAlign: 'justify' }}>
                  Cirugía de catarata bajo bloqueo retrobulbar y sedación leve. El paciente está despierto y comunica síntomas subjetivos. Presenta angioedema palpebral y colapso.
                </p>
              </div>

            </div>

            <div style={{
              background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border)', borderRadius: '12px',
              padding: '20px', marginBottom: '28px', textAlign: 'justify', display: 'flex', flexDirection: 'column', gap: '10px',
              fontSize: '15px', lineHeight: 1.6
            }}>
              <strong style={{ color: '#f1f5f9', display: 'block', fontSize: '16px' }}>📝 Resumen del Paciente Seleccionado:</strong>
              {selectedCase === 'general' ? (
                <>
                  <div>• <strong>Paciente:</strong> Camila, femenina de 34 años, sin antecedentes alérgicos conocidos.</div>
                  <div>• <strong>Fármacos transoperatorios:</strong> Fentanilo, Propofol, Rocuronio y Co-amoxiclav IV profiláctico en incisión.</div>
                  <div>• <strong>Manifestaciones:</strong> Hipotensión severa súbita y broncoespasmo detectado por alta presión de la vía aérea en ventilador.</div>
                </>
              ) : (
                <>
                  <div>• <strong>Paciente:</strong> Don Arturo, masculino de 68 años, hipertenso en tratamiento con metoprolol.</div>
                  <div>• <strong>Fármacos transoperatorios:</strong> Midazolam, Fentanilo, bloqueo oftálmico con Lidocaína + Bupivacaína. Lavado con Clorhexidina.</div>
                  <div>• <strong>Manifestaciones:</strong> Prurito, tos seca, estridor, angioedema facial marcado, pérdida del conocimiento y desaturación.</div>
                </>
              )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={handleStart}
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
                  color: '#fff', border: 'none', borderRadius: '100px',
                  padding: '16px 40px', fontSize: '16px', fontWeight: 700,
                  cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Comenzar Simulación 🚨
              </button>
            </div>
          </div>
        )}

        {phase !== 'intro' && phase !== 'summary' && (
          <div>
            {/* Header de fase */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px'
            }}>
              <span style={{ fontSize: '17px', fontWeight: 800, color: '#f87171' }}>
                {(selectedCase === 'general' ? caseDataGeneral : caseDataOftalmo)[phase].title}
              </span>
              <span style={{
                background: 'rgba(255,255,255,0.06)', padding: '6px 14px', borderRadius: '6px',
                fontSize: '14.5px', fontWeight: 'bold', color: 'var(--text-secondary)'
              }}>
                Puntos: <span style={{ color: score > 70 ? '#10b981' : score > 40 ? '#f59e0b' : '#ef4444' }}>{score}/100</span>
              </span>
            </div>

            {/* Enunciado de pregunta */}
            <p style={{
              fontSize: '19px', color: '#f1f5f9', lineHeight: 1.75, marginBottom: '28px',
              fontWeight: 500, textAlign: 'justify'
            }}>
              {(selectedCase === 'general' ? caseDataGeneral : caseDataOftalmo)[phase].question}
            </p>

            {/* Opciones de respuesta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              {(selectedCase === 'general' ? caseDataGeneral : caseDataOftalmo)[phase].options.map((option, idx) => {
                let borderStyle = '1px solid var(--border)';
                let bgStyle = 'rgba(255,255,255,0.02)';
                
                if (selectedOption === idx) {
                  if (submitted) {
                    borderStyle = option.isCorrect ? '2px solid #10b981' : '2px solid #ef4444';
                    bgStyle = option.isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)';
                  } else {
                    borderStyle = '2px solid #38bdf8';
                    bgStyle = 'rgba(56, 189, 248, 0.06)';
                  }
                } else if (submitted && option.isCorrect) {
                  borderStyle = '2px dashed #10b981';
                  bgStyle = 'rgba(16, 185, 129, 0.03)';
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    style={{
                      border: borderStyle,
                      background: bgStyle,
                      borderRadius: '12px',
                      padding: '18px 24px',
                      cursor: submitted ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                    }}
                    onMouseEnter={(e) => {
                      if (!submitted) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!submitted) {
                        e.currentTarget.style.background = selectedOption === idx ? 'rgba(56, 189, 248, 0.06)' : 'rgba(255,255,255,0.02)';
                        e.currentTarget.style.transform = 'none';
                      }
                    }}
                  >
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      border: '2px solid',
                      borderColor: selectedOption === idx ? '#38bdf8' : 'var(--text-muted)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {selectedOption === idx && (
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#38bdf8' }} />
                      )}
                    </div>
                    <div style={{ fontSize: '16.5px', color: '#e2e8f0', lineHeight: 1.6, textAlign: 'justify' }}>
                      {option.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Acciones */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px' }}>
              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  style={{
                    background: selectedOption === null ? '#1e293b' : 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)',
                    color: selectedOption === null ? '#64748b' : '#fff',
                    border: 'none', borderRadius: '100px',
                    padding: '14px 36px', fontSize: '15.5px', fontWeight: 700,
                    cursor: selectedOption === null ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Confirmar Acción ➔
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#fff',
                    border: 'none', borderRadius: '100px',
                    padding: '14px 36px', fontSize: '15.5px', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                  }}
                >
                  {phase === 'tryptase' ? "Ver Resultados del Caso 📊" : "Siguiente Escenario ➔"}
                </button>
              )}
            </div>

            {/* Retroalimentación */}
            {submitted && selectedOption !== null && (
              <div style={{
                marginTop: '28px',
                padding: '24px',
                borderRadius: '12px',
                background: (selectedCase === 'general' ? caseDataGeneral : caseDataOftalmo)[phase].options[selectedOption].isCorrect ? 'rgba(16, 185, 129, 0.06)' : 'rgba(239, 68, 68, 0.06)',
                border: `1px solid ${(selectedCase === 'general' ? caseDataGeneral : caseDataOftalmo)[phase].options[selectedOption].isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                animation: 'heroIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px',
                  fontWeight: 'bold', fontSize: '16.5px',
                  color: (selectedCase === 'general' ? caseDataGeneral : caseDataOftalmo)[phase].options[selectedOption].isCorrect ? '#4ade80' : '#f87171'
                }}>
                  <span>{(selectedCase === 'general' ? caseDataGeneral : caseDataOftalmo)[phase].options[selectedOption].isCorrect ? "✅ Elección Correcta" : "❌ Elección Incorrecta"}</span>
                </div>
                <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.65', marginBottom: '18px', textAlign: 'justify' }}>
                  {(selectedCase === 'general' ? caseDataGeneral : caseDataOftalmo)[phase].options[selectedOption].feedback}
                </p>
                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '18px',
                  fontSize: '15px', color: '#94a3b8', lineHeight: '1.65',
                  whiteSpace: 'pre-line', textAlign: 'justify'
                }}>
                  <strong style={{ color: '#cbd5e1', display: 'block', marginBottom: '8px', fontSize: '15.5px' }}>💡 Sustento de Guías Recientes:</strong>
                  {(selectedCase === 'general' ? caseDataGeneral : caseDataOftalmo)[phase].guidelineFact}
                </div>
              </div>
            )}

          </div>
        )}

        {phase === 'summary' && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ fontSize: '64px', marginBottom: '18px' }}>🏆</div>
            <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#f1f5f9', marginBottom: '14px' }}>Caso Resuelto</h3>
            <p style={{ fontSize: '16.5px', color: 'var(--text-secondary)', marginBottom: '28px', lineHeight: 1.7, textAlign: 'justify' }}>
              Has manejado la crisis de anafilaxia con éxito. La paciente se encuentra estable y ha sido trasladada a la UCI con el protocolo de triptasa completado.
            </p>

            {/* Puntuación */}
            <div style={{
              background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border)', borderRadius: '16px',
              padding: '28px', maxWidth: '380px', margin: '0 auto 32px', display: 'flex', flexDirection: 'column', gap: '8px'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Puntuación Final</span>
              <span style={{
                fontSize: '52px', fontWeight: 900,
                color: score > 80 ? '#10b981' : score > 50 ? '#f59e0b' : '#ef4444'
              }}>{score} / 100</span>
              <span style={{ fontSize: '14.5px', color: '#cbd5e1', marginTop: '10px', lineHeight: 1.5, display: 'block', textAlign: 'center' }}>
                {score === 100 && "🥇 ¡Desempeño Excelente! Dominas perfectamente las guías."}
                {score >= 80 && score < 100 && "🥈 ¡Buen Desempeño! Conoces los puntos clave del algoritmo."}
                {score < 80 && "🥉 Aprobado, pero te sugerimos repasar el algoritmo y sustentos clínicos."}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button
                onClick={() => setPhase('intro')}
                style={{
                  background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--border)', borderRadius: '100px',
                  padding: '16px 36px', fontSize: '15px', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                Volver a Escenarios 🔄
              </button>

              <a
                href="#pathophysiology-section"
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
                  color: '#fff', display: 'inline-block', borderRadius: '100px',
                  padding: '16px 36px', fontSize: '15px', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s', textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Estudiar Fisiopatología 🔬
              </a>
            </div>
          </div>
        )}
      </div>

      {/* SECCIÓN FISIOPATOLÓGICA (Abajo) */}
      <div id="pathophysiology-section" style={{ marginTop: '56px', scrollMarginTop: '20px' }}>
        
        <div className="section-label" style={{ fontSize: '13px' }}>Fundamentos Científicos y Fisiopatológicos</div>
        {/* NAVEGACIÓN DE PESTAÑAS */}
        <div className="tabs-navigation">
          {[
            { id: 'mecanismo', label: 'Vías de Anafilaxia' },
            { id: 'grados', label: 'Grados de Severidad' },
            { id: 'mrgprx2', label: 'El Receptor MRGPRX2' },
            { id: 'nap6', label: 'Reporte Epidemiológico (NAP6)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.id ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                color: activeTab === tab.id ? '#f87171' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderBottom: activeTab === tab.id ? '2px solid #ef4444' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENIDO DE PESTAÑAS */}
        <div className="glass-card" style={{
          display: 'block',
          padding: '32px',
          background: 'var(--surface-solid)',
          opacity: 1,
          transform: 'none',
          animation: 'none'
        }}>
          
          {/* TAB 1: MECANISMOS GENERALES */}
          {activeTab === 'mecanismo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#f1f5f9', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                Clasificación de la Anafilaxia Perioperatoria
              </h3>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.75, textAlign: 'justify' }}>
                La anafilaxia es una reacción sistémica de hipersensibilidad grave, de instauración rápida y potencialmente mortal. Clínicamente es indistinguible según la vía inmunológica iniciadora, por lo que el tratamiento agudo es el mismo, pero su distinción es crucial para la prevención.
              </p>

              <div className="pathophysiology-grid">
                
                {/* IgE Mediada */}
                <div style={{
                  background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px'
                }}>
                  <div style={{ fontSize: '26px', marginBottom: '12px' }}>🧬</div>
                  <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9', marginBottom: '10px' }}>Inmunológica Mediada por IgE (Clásica)</h4>
                  <ul style={{ fontSize: '15px', color: 'var(--text-secondary)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: 1.6, textAlign: 'justify' }}>
                    <li><strong>Mecanismo:</strong> Hipersensibilidad Tipo I. Requiere una fase de **sensibilización** previa en la que se generan anticuerpos IgE específicos contra el alérgeno.</li>
                    <li><strong>Fisiopatología:</strong> En la re-exposición, el alérgeno hace un puente de unión cruzando dos IgE unidas a receptores de alta afinidad FCεRI en mastocitos y basófilos.</li>
                    <li><strong>Efectores:</strong> Dispara degranulación explosiva y liberación masiva de histamina, triptasa, leucotrienos, prostaglandinas y factor activador de plaquetas (PAF).</li>
                  </ul>
                </div>

                {/* No IgE Mediada */}
                <div style={{
                  background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px'
                }}>
                  <div style={{ fontSize: '26px', marginBottom: '12px' }}>🛡️</div>
                  <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9', marginBottom: '10px' }}>Inmunológica No Mediada por IgE</h4>
                  <ul style={{ fontSize: '15px', color: 'var(--text-secondary)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: 1.6, textAlign: 'justify' }}>
                    <li><strong>Mediados por IgG:</strong> Descrito en modelos de laboratorio, donde anticuerpos IgG contra fármacos interactúan con receptores Fcγ de macrófagos y neutrófilos, liberando principalmente PAF.</li>
                    <li><strong>Mediado por Complemento:</strong> Ciertas sustancias (como agentes de contraste radiológico o hemodiálisis) activan directamente el complemento por la vía clásica o alternativa.</li>
                    <li><strong>Fisiopatología:</strong> Genera anafilotoxinas C3a y C5a que estimulan receptores específicos de degranulación celular en mastocitos, sin requerir IgE.</li>
                  </ul>
                </div>

              </div>

              {/* No Inmunológica */}
              <div style={{
                background: 'rgba(239, 68, 68, 0.02)', border: '1px solid rgba(239, 68, 68, 0.12)', borderRadius: '12px', padding: '24px', marginTop: '6px'
              }}>
                <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#f87171', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>⚠️</span> Anafilaxia No Inmunológica (Degranulación Directa)
                </h4>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, textAlign: 'justify' }}>
                  Anteriormente denominada <em>reacción anafilactoide</em> (término en desuso). En esta vía, la sustancia interactúa directamente con los mastocitos o basófilos para indicar degranulación **sin la participación de anticuerpos** (IgE/IgG) ni del complemento. Ciertos opiáceos (morfina, codeína), bloqueadores neuromusculares benzilisocinolínicos (como el atracurio, mediante la liberación inespecífica de histamina) y el contraste yodado causan esta respuesta. Su característica cardinal es que **puede ocurrir en la primera exposición** del paciente al fármaco, siendo de intensidad variable y habitualmente dosis-dependiente.
                </p>
              </div>

            </div>
          )}

          {/* TAB 1.5: GRADOS DE SEVERIDAD */}
          {activeTab === 'grados' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#f1f5f9', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                Grados de Severidad de la Anafilaxia (Clasificación de Ring & Messmer)
              </h3>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.75, textAlign: 'justify' }}>
                La severidad de la anafilaxia perioperatoria se clasifica internacionalmente en 4 grados basados en la afectación de los sistemas corporales. Esta escala guía directamente la agresividad del tratamiento, especialmente el uso de adrenalina.
              </p>

              {/* Tabla de Grados */}
              <div style={{ overflowX: 'auto', marginTop: '10px' }}>
                <table style={{
                  width: '100%', borderCollapse: 'collapse', fontSize: '14.5px', color: '#cbd5e1',
                  background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border)', borderRadius: '12px'
                }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
                      <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: 'bold', color: '#f1f5f9', width: '150px' }}>Grado / Severidad</th>
                      <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: 'bold', color: '#f1f5f9' }}>Características Clínicas</th>
                      <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: 'bold', color: '#f87171', width: '220px' }}>Fármacos / Manejo de 1ª Línea</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '14px 18px', fontWeight: 'bold', color: '#38bdf8' }}>Grado I</td>
                      <td style={{ padding: '14px 18px', textAlign: 'justify', lineHeight: 1.5 }}>
                        <strong>Signos cutáneo-mucosos exclusivos:</strong> Eritema generalizado, urticaria difusa, prurito (palmar/plantar o generalizado) y angioedema localizado (sin estridor ni edema laríngeo). No hay compromiso respiratorio ni hemodinámico.
                      </td>
                      <td style={{ padding: '14px 18px', lineHeight: 1.5, color: '#34d399' }}>
                        <strong>Antihistamínicos IV</strong> (ej. Difenhidramina, Clorfenamina) + <strong>Corticosteroides IV</strong> (ej. Hidrocortisona, Metilprednisolona). No requiere adrenalina.
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '14px 18px', fontWeight: 'bold', color: '#818cf8' }}>Grado II</td>
                      <td style={{ padding: '14px 18px', textAlign: 'justify', lineHeight: 1.5 }}>
                        <strong>Compromiso multiorgánico moderado:</strong> Signos cutáneos acompañados de hipotensión arterial moderada, taquicardia sinusal, disnea leve (tos seca, sibilancias aisladas) o síntomas gastrointestinales (náusea, vómito).
                      </td>
                      <td style={{ padding: '14px 18px', lineHeight: 1.5 }}>
                        <strong>Adrenalina en dosis bajas</strong> (bolos de 10-20 mcg IV titulados) o IM (0.3 - 0.5 mg). Fluidoterapia de soporte.
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '14px 18px', fontWeight: 'bold', color: '#f59e0b' }}>Grado III</td>
                      <td style={{ padding: '14px 18px', textAlign: 'justify', lineHeight: 1.5 }}>
                        <strong>Compromiso multiorgánico grave (Riesgo vital):</strong> Shock distributivo profundo (hipotensión extrema), colapso circulatorio con pulso débil, taquicardia o bradicardia severa, arritmias cardíacas, broncoespasmo severo con hipoxia, estridor laríngeo por angioedema de glotis y pérdida del conocimiento.
                      </td>
                      <td style={{ padding: '14px 18px', lineHeight: 1.5, color: '#f87171', fontWeight: 'bold' }}>
                        Adrenalina bolos IV de 50 mcg titulados (o IM 0.5 mg si no hay vía), Carga rápida de fluidos (20-50 ml/kg), y control de vía aérea avanzada.
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '14px 18px', fontWeight: 'bold', color: '#ef4444' }}>Grado IV</td>
                      <td style={{ padding: '14px 18px', textAlign: 'justify', lineHeight: 1.5 }}>
                        <strong>Paro Cardiorrespiratorio:</strong> Paro cardíaco, apnea o actividad eléctrica sin pulso (AESP / asistolia).
                      </td>
                      <td style={{ padding: '14px 18px', lineHeight: 1.5, color: '#ef4444', fontWeight: 'bold' }}>
                        RCP Avanzada, Compresiones de alta calidad y Adrenalina 1 mg IV directo en bolo.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Nota educacional sobre caso real */}
              <div style={{
                background: 'rgba(52, 211, 153, 0.03)', border: '1px solid rgba(52, 211, 153, 0.15)', borderRadius: '12px',
                padding: '20px', fontSize: '15px', lineHeight: 1.6, color: '#cbd5e1', textAlign: 'justify'
              }}>
                <strong style={{ color: '#34d399', display: 'block', marginBottom: '6px', fontSize: '15.5px' }}>💡 Correlación con la práctica real:</strong>
                En el caso comentado del paciente que presentó angioedema, pérdida transitoria del conocimiento y desaturación tras un bloqueo retrobulbar y recuperó con <strong>hidrocortisona + difenhidramina</strong>, clínicamente corresponde a un cuadro de <strong>Grado I o II</strong> (donde la afectación ventilatoria y hemodinámica no era irreversible por sí misma, o donde el colapso fue de componente predominantemente vasovagal o spread bulbar menor autolimitado). Sin embargo, es un principio de seguridad anestésica recordar que ante un paciente con compromiso **Grado III**, la hidrocortisona y antihistamínicos son insuficientes y la <strong>Adrenalina</strong> es el único pilar que contrarresta activamente la vasodilatación y el edema de la vía aérea en la fase aguda.
              </div>

            </div>
          )}

          {/* TAB 2: EL RECEPTOR MRGPRX2 */}
          {activeTab === 'mrgprx2' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#f1f5f9', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                Receptor MRGPRX2: El Nuevo Paradigma
              </h3>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.75, textAlign: 'justify' }}>
                Históricamente, las reacciones anafilácticas severas en la **primera exposición** a bloqueadores neuromusculares (como rocuronio) eran difíciles de justificar mediante la inmunidad IgE. La investigación molecular reciente resolvió este misterio al descubrir el receptor **MRGPRX2** (<em>Mas-related G-protein coupled receptor member X2</em>).
              </p>

              <div style={{
                background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px',
                fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.7', textAlign: 'justify'
              }}>
                <strong style={{ color: '#f1f5f9', display: 'block', marginBottom: '12px', fontSize: '16px' }}>🔬 ¿Cómo funciona el canal MRGPRX2?</strong>
                <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li>Es un receptor de membrana acoplado a proteína G que se expresa de forma selectiva y abundante en los **mastocitos tisulares conectivos** (como los de la piel y los tejidos perivasculares).</li>
                  <li>A diferencia de los basófilos y los mastocitos mucosos que son predominantemente dependientes de IgE, los mastocitos cutáneos / conectivos responden directamente a péptidos catiónicos e hidrocarburos cíclicos.</li>
                  <li>Cuando moléculas químicas con cargas netas catiónicas fuertes o estructuras específicas de anclaje peptídico se unen al bolsillo de unión de MRGPRX2, se desencadena una cascada de señalización rápida e independiente de IgE que genera degranulación de mastocitos.</li>
                </ul>
              </div>

              {/* Fármacos implicados */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px'
              }}>
                <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
                  <strong style={{ fontSize: '15.5px', color: '#38bdf8', display: 'block', marginBottom: '10px' }}>Bloqueadores Neuromusculares (NMBAs)</strong>
                  <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, textAlign: 'justify' }}>
                    Tanto el <strong>rocuronio</strong> como el <strong>atracurio</strong> son potentes agonistas del receptor MRGPRX2 debido a sus aminas cuaternarias. Esto explica por qué el rocuronio induce anafilaxia en pacientes sin exposición anestésica previa.
                  </p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
                  <strong style={{ fontSize: '15.5px', color: '#a78bfa', display: 'block', marginBottom: '10px' }}>Antibióticos e Inductores</strong>
                  <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, textAlign: 'justify' }}>
                    La <strong>vancomicina</strong> y las <strong>fluoroquinolonas</strong> (como ciprofloxacina) activan directamente este receptor. La típica reacción cutánea de 'hombre rojo' por vancomicina es una degranulación directa mediada por este receptor.
                  </p>
                </div>
              </div>

              <div style={{
                padding: '20px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.04)', border: '1px solid rgba(56, 189, 248, 0.15)',
                fontSize: '15px', color: '#94a3b8', lineHeight: 1.7, textAlign: 'justify'
              }}>
                <strong style={{ color: '#38bdf8', display: 'block', marginBottom: '8px', fontSize: '15.5px' }}>Diferencia diagnóstica clave:</strong>
                Dado que los mastocitos expresan MRGPRX2 pero los <strong>basófilos no</strong> lo expresan, las pruebas de activación de basófilos (BAT) in vitro son negativas en reacciones puras mediadas por MRGPRX2. Sin embargo, la triptasa sérica se elevará en ambos casos porque proviene de los gránulos del mastocito tisular degranulado.
              </div>

            </div>
          )}

          {/* TAB 3: REPORTE NAP6 */}
          {activeTab === 'nap6' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#f1f5f9', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                Hallazgos del NAP6 (6th National Audit Project)
              </h3>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.75, textAlign: 'justify' }}>
                El NAP6 es el estudio epidemiológico prospectivo más grande jamás realizado sobre la anafilaxia perioperatoria severa (Grados 3 a 5). Aportó datos cruciales que cambiaron la práctica anestésica moderna:
              </p>

              {/* El Big 4 */}
              <div style={{
                background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px'
              }}>
                <strong style={{ color: '#ef4444', display: 'block', marginBottom: '14px', fontSize: '16px' }}>🚨 Los 4 Desencadenantes Principales ('The Big Four')</strong>
                <div className="big-four-grid">
                  <div style={{ padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>💊</div>
                    <span style={{ fontSize: '14.5px', fontWeight: 'bold', display: 'block', color: '#f1f5f9' }}>1. Antibióticos (47%)</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Co-amoxiclav y Teicoplanina</span>
                  </div>
                  <div style={{ padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>💉</div>
                    <span style={{ fontSize: '14.5px', fontWeight: 'bold', display: 'block', color: '#f1f5f9' }}>2. NMBAs (33%)</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Rocuronio y Atracurio</span>
                  </div>
                  <div style={{ padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>🧽</div>
                    <span style={{ fontSize: '14.5px', fontWeight: 'bold', display: 'block', color: '#f1f5f9' }}>3. Clorhexidina (9%)</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Antiséptico en geles/catéteres</span>
                  </div>
                  <div style={{ padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔵</div>
                    <span style={{ fontSize: '14.5px', fontWeight: 'bold', display: 'block', color: '#f1f5f9' }}>4. Azul Patente (4.5%)</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Colorante de ganglio centinela</span>
                  </div>
                </div>
              </div>

              {/* Recomendaciones Clave */}
              <div style={{ fontSize: '15px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '12px', lineHeight: 1.7, textAlign: 'justify' }}>
                <strong style={{ color: '#f1f5f9', fontSize: '16.5px' }}>📌 Recomendaciones de Seguridad Práctica del NAP6:</strong>
                <div>• <strong>Evitar el sobrediagnóstico clínico a ciegas:</strong> No asuma una alergia a la penicilina sin confirmación. El etiquetado incorrecto priva a los pacientes de antibióticos de primera línea. Remita siempre a Alergología.</div>
                <div>• <strong>El papel de la Clorhexidina:</strong> A menudo se subestima porque se considera inofensiva. Es una de las causas más frecuentes de shock severo tardío tras la inserción de catéteres centrales o lubricación uretral.</div>
                <div>• <strong>Manejo de la Adrenalina:</strong> El estudio identificó una alta incidencia de sobredosificación iatrogénica de adrenalina (bolos de 1 mg administrados por error a pacientes con pulso en lugar de 50 mcg). Esto causó morbilidad cardíaca significativa. El entrenamiento en simulación es fundamental para evitar este error.</div>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* SIDEBAR DERECHO DE ALGORITMO OFICIAL (COLLAPSIBLE DRAWER) */}
      {showAlgorithm && (
        <div
          onClick={() => setShowAlgorithm(false)}
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="qrh-modal"
            style={{
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto'
            }}
          >
            {/* Header Sidebar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#f87171' }}>📋 Algoritmo Oficial de Anafilaxia (QRH)</span>
              <button
                onClick={() => setShowAlgorithm(false)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: 'none',
                  color: '#94a3b8',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>

            {/* Contenido Algoritmo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '15px', color: '#cbd5e1' }}>
              
              {/* PLAN A: MEDIDAS INMEDIATAS */}
              <div style={{ borderLeft: '4px solid #38bdf8', paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>PLAN A: Medidas Inmediatas (Sospecha)</span>
                <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'justify' }}>
                  <li><strong>Suspender</strong> el agente de sospecha inmediata (ej. antibióticos, infusiones).</li>
                  <li><strong>Llamar por ayuda</strong> e indicar el carro de paros (reanimación).</li>
                  <li><strong>Oxígeno al 100%</strong> y optimizar la ventilación.</li>
                  <li><strong>Asegurar Trendelenburg:</strong> Elevar piernas para recuperar retorno venoso.</li>
                  <li><strong>Suspender/reducir anestésicos</strong> volátiles o TIVA si el shock es profundo (evita sobredosis por bajo flujo).</li>
                </ul>
              </div>

              {/* PLAN B: PRIMERA LÍNEA */}
              <div style={{ borderLeft: '4px solid #ef4444', paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#ef4444', letterSpacing: '0.08em', textTransform: 'uppercase' }}>PLAN B: Reanimación de 1ª Línea</span>
                <div style={{ textAlign: 'justify' }}>
                  <strong>1. Adrenalina IV (Titulada):</strong>
                  <div style={{ background: 'rgba(239, 68, 68, 0.04)', border: '1px solid rgba(239, 68, 68, 0.15)', borderRadius: '8px', padding: '10px', marginTop: '6px', fontSize: '14px' }}>
                    <strong>Dilución:</strong> 1 mg (1 mL) Adrenalina + 9 mL Sol. Fisiológica = **100 mcg / mL** (1:10,000).<br/>
                    <strong>Dosis Bolo:</strong> Administrar **0.5 mL** (**50 mcg**) IV. Repetir cada 1-2 min según respuesta.
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#94a3b8', marginTop: '4px' }}>
                    *Si no hay vía IV permeable inmediata: dar **0.5 mg IM** (0.5 mL sin diluir 1:1,000) en el muslo.*
                  </div>
                </div>
                <div style={{ textAlign: 'justify', marginTop: '4px' }}>
                  <strong>2. Restablecimiento de Volumen:</strong>
                  <div>Administrar bolo rápido de cristaloides a **20 mL/kg** (1-2 litros en adultos). Repetir según necesidades.</div>
                </div>
              </div>

              {/* PLAN C: REFRACTARIEDAD */}
              <div style={{ borderLeft: '4px solid #f59e0b', paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#f59e0b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>PLAN C: Shock / Broncoespasmo Refractario</span>
                <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'justify' }}>
                  <li><strong>Infusión continua de Adrenalina:</strong> Iniciar a 0.05 - 0.4 mcg/kg/min si requiere bolos repetidos.</li>
                  <li><strong>Paciente betabloqueado:</strong> La adrenalina puede fallar. Administrar **Glucagón 1-2 mg IV** lento en bolo.</li>
                  <li><strong>Alternativa en México (sin Glucagón):</strong> Administrar **Vasopresina 1-2 UI IV** en bolo + **Noradrenalina** en infusión.</li>
                  <li><strong>Broncoespasmo Refractario:</strong>
                    <div>• Salbutamol IV (100-250 mcg bolo) o inhalado por tubo.</div>
                    <div>• **Sulfato de Magnesio 2 g IV** a pasar en 20 minutos.</div>
                  </li>
                  <li><strong>Dispositivos Avanzados:</strong> Asegurar la vía aérea con videolaringoscopio de forma temprana en caso de angioedema progresivo.</li>
                </ul>
              </div>

              {/* PLAN D: POST-CRISIS */}
              <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase' }}>PLAN D: Confirmación y Seguimiento</span>
                <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'justify' }}>
                  <li><strong>Triptasa sérica seriada:</strong>
                    <div>1. Inmediata (tras estabilizar, en las primeras 2h).</div>
                    <div>2. Segunda muestra (1-2h del evento).</div>
                    <div>3. Basal (a las 24 horas).</div>
                  </li>
                  <li><strong>UCI:</strong> Traslado de monitoreo continuo mínimo por 12-24h por riesgo de reacción bifásica.</li>
                  <li><strong>Referencia Alergología:</strong> Obligatoria en 4-6 semanas para pruebas cutáneas específicas. Evitar etiquetar al paciente sin confirmación diagnóstica.</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">Medicode Solutions</div>
        <p className="footer-text">Plataforma educativa de anestesiología</p>
        <div className="disclaimer">
          Este sitio tiene fines exclusivamente educativos. No sustituye el juicio clínico ni las recomendaciones de sociedades médicas vigentes.
        </div>
      </footer>

    </main>
  );
}
