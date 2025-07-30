import React, { useEffect } from 'react';
import { analyzeLearningStyle } from '../services/geminiService';
import type { ResultData } from '../types';

interface AnalyzingScreenProps {
  answers: string[];
  onComplete: (data: ResultData) => void;
  onError: (error: string) => void;
}

const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({ answers, onComplete, onError }) => {
  useEffect(() => {
    const performAnalysis = async () => {
      try {
        const result = await analyzeLearningStyle(answers);
        onComplete(result);
      } catch (e: unknown) {
        if (e instanceof Error) {
          onError(e.message);
        } else {
          onError("An unknown error occurred.");
        }
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    performAnalysis();
    // We only want this to run once when the component mounts.
  }, [answers, onComplete, onError]);

  return (
    <div className="pixel-box text-center p-8">
      <h2 className="text-3xl font-bold mb-6 text-pink-300 animate-pulse">ANALYZING...</h2>
      <div className="flex justify-center items-center space-x-2">
        <div className="w-8 h-8 bg-purple-400 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-8 h-8 bg-fuchsia-400 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-8 h-8 bg-pink-400 animate-bounce"></div>
      </div>
      <p className="mt-6 text-lg">당신의 학습 유형을 소환하는 중!</p>
    </div>
  );
};

export default AnalyzingScreen;