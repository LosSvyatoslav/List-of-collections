import type { ReactNode } from "react";
import type { CreatedBy } from "../QuestionContext/types";

export interface Specialization {
  id: number;
  title: string;
}
export interface Data<T> {
  data: T[];
  total: number;
}

export interface Collection {
  id: number;
  title?: string;
  description: string;
  keywords: string[];
  tasksCount: number;
  isFree: boolean;
  specializations: Specialization[];
  createdBy?: CreatedBy | null;
}

export interface Props {
  collectionData?: Collection;
  showInfoMobile?: () => void;
}

export interface CollectionContextValue {
  collectionsData: Data<Collection> | null;
  specializationsData: Data<Specialization> | null;
  pagesCount: number;
  page: number;
  collectionData: Collection;
  initialLoading: boolean,
  handleNextPage: () => void;
  handleCurrentPage: (page: number) => void;
  handlePreviousPage: () => void;
  setSpecialization: (id: number) => void;
  setSearch: (words: string) => void;
  setAccess: (access: boolean) => void;
  getSpecializations: (limit: number) => void;
  getCollectionData: (id: string) => void;
  loading: boolean;
  error: string;
  collectionLoading: boolean;
  collectionError: string;
}

export interface ContextProps {
  children: ReactNode;
}
