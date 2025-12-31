export enum Stage {
  INTRO = 0,
  REFLECTION = 1,
  JOURNEY = 2,
  CELEBRATION = 3,
  FEEDBACK = 4
}

export interface AppState {
  currentStage: Stage;
  userName: string;
}

export interface StageProps {
  onNext: () => void;
  setUserName?: (name: string) => void;
  userName?: string;
  onPauseBackgroundMusic?: () => void;
}