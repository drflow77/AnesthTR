export interface AlgorithmStep {
  id: string;
  title: string;
  description: string;
  plan: 'A' | 'B' | 'C' | 'D';
  actions: string[];
  warnings?: string[];
  nextSteps?: {
    label: string;
    targetId: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
