import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center h-full animate-fadeIn">
      <div className="pixel-box w-full max-w-lg text-center p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-shadow-retro text-pink-300">
          LEARNING STYLE
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-shadow-retro text-white">
          QUEST
        </h2>
        <p className="mb-10 text-lg text-fuchsia-300">
          당신의 숨겨진 학습 능력을 알아보세요!
        </p>
        <button
          onClick={onStart}
          className="btn-pixel text-2xl animate-pulse"
        >
          PRESS START
        </button>
      </div>
    </div>
  );
};

export default StartScreen;