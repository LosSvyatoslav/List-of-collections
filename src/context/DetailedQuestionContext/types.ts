import type { Question } from "../QuestionContext/types";

export interface DetailedQuestionContextValue {
  questionData: Question | null;
  navigationIds: number[];
  getQuestionData: (id: string) => void;
  getNavigationPage: (page: number) => Promise<number[]>;
  error: string;
  total: number;
}
