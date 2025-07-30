import React, { useState, useCallback } from 'react';
import type { GameState, ResultData } from './types';
import { QUESTIONS } from './constants';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import AnalyzingScreen from './components/AnalyzingScreen';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('START');
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = useCallback(() => {
    setAnswers([]);
    setResultData(null);
    setError(null);
    setGameState('QUIZ');
  }, []);

  const handleAnswer = useCallback((answer: string) => {
    setAnswers(prev => [...prev, answer]);
  }, []);
  
  const handleQuizComplete = useCallback((finalAnswers: string[]) => {
    setGameState('ANALYZING');
  }, []);

  const handleAnalysisComplete = useCallback((data: ResultData) => {
    setResultData(data);
    setGameState('RESULT');
  }, []);

  const handleAnalysisError = useCallback((errorMessage: string) => {
    setError(errorMessage);
    setGameState('RESULT'); // Show error on result screen
  }, []);

  const renderGameState = () => {
    switch (gameState) {
      case 'START':
        return <StartScreen onStart={handleStart} />;
      case 'QUIZ':
        return (
            <QuizScreen
                questions={QUESTIONS}
                onAnswer={handleAnswer}
                onComplete={handleQuizComplete}
            />
        );
      case 'ANALYZING':
        return (
          <AnalyzingScreen
            answers={answers}
            onComplete={handleAnalysisComplete}
            onError={handleAnalysisError}
          />
        );
      case 'RESULT':
        return <ResultScreen result={resultData} error={error} onRestart={handleStart} />;
      default:
        return <StartScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#4a044e] text-white flex flex-col p-4 sm:p-6">
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          {renderGameState()}
        </div>
      </main>
      <footer className="w-full text-center py-2 text-xs text-fuchsia-300/70">
        <p>© 2025 서혜영</p>
      </footer>
    </div>
  );
};

export default App;