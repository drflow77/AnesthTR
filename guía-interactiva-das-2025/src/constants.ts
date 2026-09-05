import { AlgorithmStep, QuizQuestion } from './types';

export const DAS_ALGORITHM: AlgorithmStep[] = [
  {
    id: 'plan-a',
    title: 'Plan A: Intubación Traqueal',
    description: 'Intentos iniciales de intubación traqueal. Enfoque en la optimización y limitación de intentos.',
    plan: 'A',
    actions: [
      'Preoxigenar y optimizar la posición',
      'Máximo 3 intentos (más 1 por un experto)',
      'Usar Videolaringoscopía (VL) como primera línea',
      'Mantener anestesia y bloqueo neuromuscular'
    ],
    warnings: [
      'Detenerse tras 3+1 intentos',
      'Vigilar la desaturación de oxígeno'
    ],
    nextSteps: [
      { label: 'Intubación Exitosa', targetId: 'success' },
      { label: 'Intubación Fallida', targetId: 'plan-b' }
    ]
  },
  {
    id: 'plan-b',
    title: 'Plan B: Inserción de DSG',
    description: 'Inserción de Dispositivo Supraglótico (DSG) para mantener la oxigenación.',
    plan: 'B',
    actions: [
      'Insertar DSG (preferiblemente de 2ª generación)',
      'Máximo 2 intentos',
      'Confirmar ventilación y oxigenación'
    ],
    warnings: [
      'Si el DSG falla, pasar al Plan C inmediatamente'
    ],
    nextSteps: [
      { label: 'DSG Exitoso', targetId: 'success' },
      { label: 'DSG Fallido', targetId: 'plan-c' }
    ]
  },
  {
    id: 'plan-c',
    title: 'Plan C: Ventilación con Mascarilla Facial',
    description: 'Último intento de oxigenación mediante mascarilla facial.',
    plan: 'C',
    actions: [
      'Optimizar la ventilación con mascarilla facial',
      'Usar técnica de 2 personas y coadyuvantes',
      'Considerar despertar al paciente si es posible'
    ],
    warnings: [
      'Si la ventilación es imposible, declarar CICO'
    ],
    nextSteps: [
      { label: 'Ventilación Exitosa', targetId: 'success' },
      { label: 'Ventilación Fallida (CICO)', targetId: 'plan-d' }
    ]
  },
  {
    id: 'plan-d',
    title: 'Plan D: FONA de Emergencia',
    description: 'Acceso Frontal al Cuello (FONA) de emergencia. Declarar "No se puede intubar, no se puede oxigenar".',
    plan: 'D',
    actions: [
      'Declarar CICO',
      'Técnica Bisturí-Bujía-Tubo',
      'Extender el cuello, identificar la membrana cricotiroidea',
      'Incisión horizontal, insertar bujía y luego tubo de 6.0 mm'
    ],
    warnings: [
      'No demorar. Este es un procedimiento de salvamento.'
    ],
    nextSteps: [
      { label: 'FONA Exitoso', targetId: 'success' }
    ]
  },
  {
    id: 'success',
    title: 'Vía Aérea Asegurada',
    description: 'La vía aérea ha sido manejada con éxito. Proceder con precaución.',
    plan: 'A',
    actions: [
      'Confirmar con capnografía',
      'Estabilizar y planificar los siguientes pasos',
      'Debriefing con el equipo'
    ]
  }
];

export const DAS_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el número máximo de intentos de intubación recomendados en el Plan A?',
    options: ['2 intentos', '3 intentos (+1 por un experto)', '4 intentos', 'Ilimitados si la SpO2 es estable'],
    correctAnswer: 1,
    explanation: 'Las guías DAS recomiendan un máximo de 3 intentos, con un posible 4º intento por un clínico más experimentado.'
  },
  {
    id: 'q2',
    question: '¿Qué técnica es preferida para el Plan D (FONA de emergencia)?',
    options: ['Cricotiroidotomía con aguja', 'Bisturí-Bujía-Tubo', 'Traqueostomía', 'Guía retrógrada'],
    correctAnswer: 1,
    explanation: 'La técnica de Bisturí-Bujía-Tubo es el método principal recomendado para el FONA de emergencia en las guías DAS.'
  },
  {
    id: 'q3',
    question: '¿Qué debe declararse si el Plan C falla?',
    options: ['Plan B de nuevo', 'Despertar al paciente', 'CICO (No se puede intubar, no se puede oxigenar)', 'Pedir más ayuda'],
    correctAnswer: 2,
    explanation: 'Si la ventilación con mascarilla facial (Plan C) falla, se debe declarar CICO e iniciar el Plan D inmediatamente.'
  }
];
