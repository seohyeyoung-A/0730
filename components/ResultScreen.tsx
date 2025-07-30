import React from 'react';
import type { ResultData } from '../types';

interface ResultScreenProps {
  result: ResultData | null;
  error: string | null;
  onRestart: () => void;
}

const ResultCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-black/30 p-4 mb-4">
        <h3 className="text-lg font-bold text-pink-300 mb-2 border-b-2 border-pink-300/50 pb-1">{title}</h3>
        {children}
    </div>
);


const ResultScreen: React.FC<ResultScreenProps> = ({ result, error, onRestart }) => {
  if (error) {
    return (
      <div className="pixel-box w-full max-w-2xl mx-auto text-center p-8">
        <h2 className="text-3xl font-bold text-red-500 mb-4">ERROR</h2>
        <p className="text-white mb-6 bg-red-900/50 p-4">{error}</p>
        <button onClick={onRestart} className="btn-pixel">
          RETRY
        </button>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="pixel-box w-full max-w-2xl mx-auto text-center p-8">
        <h2 className="text-3xl font-bold text-pink-300 mb-4">NO DATA</h2>
        <p className="text-white mb-6">분석 결과를 불러오지 못했습니다.</p>
        <button onClick={onRestart} className="btn-pixel">
          RESTART
        </button>
      </div>
    );
  }

  return (
    <div className="pixel-box w-full max-w-3xl mx-auto p-6 md:p-8">
      <div className="text-center mb-6">
        <p className="text-fuchsia-300">RESULT</p>
        <h2 className="text-4xl font-bold text-shadow-retro my-2">{result.mbtiType}</h2>
        <p className="text-2xl text-white font-bold">"{result.title}"</p>
      </div>

      <div className="mb-6 text-center bg-black/30 p-4">
        <p className="leading-relaxed">{result.description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-x-6">
        <div>
            <ResultCard title="✨ 강점 (STRENGTHS)">
                <ul className="list-disc list-inside space-y-1 text-pink-300">
                    {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
            </ResultCard>

            <ResultCard title="⚔️ 추천 전략 (STRATEGIES)">
                <ul className="list-disc list-inside space-y-1 text-fuchsia-300">
                    {result.strategies.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
            </ResultCard>
        </div>
        <div>
            <ResultCard title="⚠️ 잠재적 어려움 (CHALLENGES)">
                <ul className="list-disc list-inside space-y-1 text-rose-400">
                    {result.challenges.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
            </ResultCard>
        </div>
      </div>


      <div className="text-center mt-8">
        <button onClick={onRestart} className="btn-pixel text-xl">
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;