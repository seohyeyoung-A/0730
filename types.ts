
export type GameState = 'START' | 'QUIZ' | 'ANALYZING' | 'RESULT';

export interface Question {
  text: string;
  options: [
    { text: string; value: string },
    { text: string; value: string }
  ];
}

export interface ResultData {
  mbtiType: string;
  title: string;
  description: string;
  strengths: string[];
  strategies: string[];
  challenges: string[];
}
