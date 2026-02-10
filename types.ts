export type GamePhase = 'intro' | 'quiz' | 'minigame' | 'proposal' | 'success';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  secretAnswer?: string; // For the "All of the above" logic
  contextNote?: string; // For "I invited you" note
}

export interface UserContext {
  proposer: string;
  partner: string;
  location: string;
  duration: string;
  proposerJob: string;
  proposerHobby: string;
  proposerFood: string;
  partnerJob: string;
  partnerHobby: string;
  partnerFood: string;
}

export interface Images {
  pixelAvatars: string;
  kissingPhoto: string;
}