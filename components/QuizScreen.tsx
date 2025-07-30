import React, { useState } from 'react';
import type { Question } from '../types';

interface QuizScreenProps {
  questions: Question[];
  onAnswer: (answer: string) => void;
  onComplete: (finalAnswers: string[]) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onAnswer, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleOptionClick = (value: string) => {
    if (isAnimating) return;

    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    onAnswer(value);
    setIsAnimating(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setIsAnimating(false);
      } else {
        onComplete(newAnswers);
      }
    }, 400); // Animation duration
  };

  return (
    <div className={`pixel-box w-full max-w-2xl mx-auto transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      <div className="mb-6">
        <p className="text-sm mb-2 text-pink-300">QUEST {currentQuestionIndex + 1}/{questions.length}</p>
        <div className="w-full h-4 bg-fuchsia-800 border-2 border-fuchsia-600">
          <div
            className="h-full bg-pink-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-black/30 p-4 min-h-[100px] flex items-center justify-center mb-6">
        <p className="text-lg text-center leading-relaxed">
          {currentQuestion.text}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option.value)}
            className="btn-pixel w-full text-left"
          >
            <span className="text-pink-400 mr-2">{index === 0 ? 'A >' : 'B >'}</span>
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizScreen;