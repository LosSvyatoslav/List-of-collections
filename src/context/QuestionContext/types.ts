import type { Data } from "../CollectionsContext/types";

export interface QuestionContextValue {
  questionsData: Data<Question> | null;
  page: number;
  pagesCount: number;
  handleNextPage: () => void;
  handleCurrentPage: (page: number) => void;
  handlePreviousPage: () => void;
  getQuestionsData: (id: string, page: number) => void;
  resetPage: () => void;
  loading: boolean;
  error: string | null;
}

export interface Question {
  id: number;
  title: string;
  description: string;
  longAnswer: string;
  shortAnswer: string;
  rate: number;
  complexity: number;
  questionSkills: Skills[];
  keywords: string[];
  createdBy: CreatedBy | null;
  imageSrc: string;
}

export interface CreatedBy {
  id: number;
  username: string;
}

export interface Skills {
  id: number;
  title: string;
}

