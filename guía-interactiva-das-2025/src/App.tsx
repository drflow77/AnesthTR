import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Stethoscope, 
  BookOpen, 
  Activity, 
  HelpCircle, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle2,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DAS_ALGORITHM, DAS_QUIZ } from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState('algorithm');
  const [currentStepId, setCurrentStepId] = useState('plan-a');
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentStep = DAS_ALGORITHM.find(s => s.id === currentStepId) || DAS_ALGORITHM[0];

  const handleNextStep = (targetId: string) => {
    setCurrentStepId(targetId);
  };

  const handleQuizAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === DAS_QUIZ[quizIndex].correctAnswer) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (quizIndex < DAS_QUIZ.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowQuizResult(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setShowQuizResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'A': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'B': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'C': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'D': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-bold text-xl tracking-tight hidden sm:block">DAS 2025 <span className="text-blue-600">Interactivo</span></h1>
          </div>
          <nav className="flex items-center gap-1">
            <Button variant={activeTab === 'algorithm' ? 'default' : 'ghost'} onClick={() => setActiveTab('algorithm')} size="sm">
              <Activity className="w-4 h-4 mr-2" />
              Algoritmo
            </Button>
            <Button variant={activeTab === 'quiz' ? 'default' : 'ghost'} onClick={() => setActiveTab('quiz')} size="sm">
              <HelpCircle className="w-4 h-4 mr-2" />
              Quiz
            </Button>
            <Button variant={activeTab === 'info' ? 'default' : 'ghost'} onClick={() => setActiveTab('info')} size="sm">
              <Info className="w-4 h-4 mr-2" />
              Info
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          {activeTab === 'algorithm' && (
            <motion.div
              key="algorithm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Explorador de Algoritmo</h2>
                  <p className="text-slate-500">Sigue los pasos de las guías DAS 2025 para el manejo de la vía aérea difícil.</p>
                </div>
                <Button variant="outline" onClick={() => setCurrentStepId('plan-a')}>Reiniciar</Button>
              </div>

              <Card className="border-2 shadow-lg overflow-hidden">
                <div className={`h-2 w-full ${getPlanColor(currentStep.plan).split(' ')[0]}`} />
                <CardHeader className="bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={`${getPlanColor(currentStep.plan)} px-3 py-1 text-xs font-bold uppercase tracking-wider`}>
                      Plan {currentStep.plan}
                    </Badge>
                    {currentStep.id === 'plan-d' && (
                      <Badge variant="destructive" className="animate-pulse">EMERGENCIA</Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl font-bold">{currentStep.title}</CardTitle>
                  <CardDescription className="text-lg">{currentStep.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 bg-white">
                  <div className="grid gap-4">
                    <h4 className="font-semibold text-sm uppercase tracking-widest text-slate-400">Acciones Recomendadas</h4>
                    <ul className="space-y-3">
                      {currentStep.actions.map((action, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{action}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {currentStep.warnings && currentStep.warnings.length > 0 && (
                    <Alert variant="destructive" className="bg-red-50 border-red-100 text-red-900">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle className="font-bold">Advertencias</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc list-inside">
                          {currentStep.warnings.map((warning, idx) => (
                            <li key={idx}>{warning}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="pt-6 border-t flex flex-wrap gap-3">
                    {currentStep.nextSteps?.map((step, idx) => (
                      <Button 
                        key={idx} 
                        onClick={() => handleNextStep(step.targetId)}
                        className="flex-1 min-w-[200px] h-14 text-lg font-semibold"
                        variant={step.targetId === 'success' ? 'default' : 'outline'}
                      >
                        {step.label}
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                    ))}
                    {!currentStep.nextSteps && (
                      <Button onClick={() => setCurrentStepId('plan-a')} className="w-full h-14 text-lg font-semibold">
                        Volver al Inicio
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Progress Indicator */}
              <div className="flex justify-between items-center px-2">
                {['A', 'B', 'C', 'D'].map((p) => (
                  <div key={p} className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold transition-all ${
                      currentStep.plan === p ? 'bg-blue-600 text-white border-blue-600 scale-110 shadow-lg' : 
                      'bg-white text-slate-300 border-slate-200'
                    }`}>
                      {p}
                    </div>
                    <span className={`text-xs font-medium ${currentStep.plan === p ? 'text-blue-600' : 'text-slate-400'}`}>Plan {p}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Prueba de Conocimientos</h2>
                <p className="text-slate-500">Pon a prueba tu comprensión de las guías DAS 2025.</p>
              </div>

              {!showQuizResult ? (
                <Card className="border-2 shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium text-slate-500">Pregunta {quizIndex + 1} de {DAS_QUIZ.length}</span>
                      <Progress value={((quizIndex + 1) / DAS_QUIZ.length) * 100} className="w-32 h-2" />
                    </div>
                    <CardTitle className="text-xl leading-relaxed">{DAS_QUIZ[quizIndex].question}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      {DAS_QUIZ[quizIndex].options.map((option, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          className={`h-auto py-4 px-6 justify-start text-left text-base whitespace-normal transition-all ${
                            isAnswered 
                              ? idx === DAS_QUIZ[quizIndex].correctAnswer
                                ? 'bg-green-50 border-green-500 text-green-700 hover:bg-green-50'
                                : selectedOption === idx
                                  ? 'bg-red-50 border-red-500 text-red-700 hover:bg-red-50'
                                  : 'opacity-50'
                              : 'hover:border-blue-500 hover:bg-blue-50'
                          }`}
                          onClick={() => handleQuizAnswer(idx)}
                          disabled={isAnswered}
                        >
                          <span className="mr-4 w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 text-xs font-bold">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {option}
                        </Button>
                      ))}
                    </div>

                    {isAnswered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                          <h4 className="font-bold text-blue-900">Explicación</h4>
                        </div>
                        <p className="text-blue-800">{DAS_QUIZ[quizIndex].explanation}</p>
                        <Button onClick={nextQuestion} className="mt-4 w-full">
                          {quizIndex < DAS_QUIZ.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 shadow-lg text-center py-12">
                  <CardContent className="space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 mb-4">
                      <Activity className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-bold">¡Quiz Completado!</h3>
                    <div className="space-y-2">
                      <p className="text-5xl font-black text-blue-600">{quizScore} / {DAS_QUIZ.length}</p>
                      <p className="text-slate-500 font-medium">Tu puntuación final</p>
                    </div>
                    <div className="pt-6 flex gap-3 justify-center">
                      <Button onClick={resetQuiz} size="lg">Intentar de nuevo</Button>
                      <Button variant="outline" onClick={() => setActiveTab('algorithm')} size="lg">Revisar Algoritmo</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}

          {activeTab === 'info' && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Sobre las Guías DAS 2025</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  La Difficult Airway Society (DAS) actualiza periódicamente sus guías para reflejar la evidencia más reciente y mejorar la seguridad del paciente. Las guías de 2025 enfatizan:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Factores Humanos', desc: 'Importancia de la comunicación y el modelo mental compartido.' },
                    { title: 'Videolaringoscopía', desc: 'Uso de VL como primera línea en la mayoría de los casos.' },
                    { title: 'Límites de Intentos', desc: 'Respeto estricto a los límites de intentos para evitar trauma.' },
                    { title: 'FONA Precoz', desc: 'Declaración temprana de CICO y ejecución de Plan D.' }
                  ].map((item, idx) => (
                    <Card key={idx} className="bg-white border-slate-200">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-blue-600 text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 text-sm">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Alert className="bg-amber-50 border-amber-200">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <AlertTitle className="text-amber-900 font-bold">Aviso Médico</AlertTitle>
                <AlertDescription className="text-amber-800">
                  Esta aplicación es una herramienta educativa y de estudio. No debe utilizarse como sustituto del juicio clínico profesional ni de la formación práctica certificada. Siempre consulte las guías oficiales completas de la DAS.
                </AlertDescription>
              </Alert>

              <div className="text-center pt-8 border-t">
                <p className="text-slate-400 text-sm">Desarrollado para fines educativos interactivos • 2025</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
