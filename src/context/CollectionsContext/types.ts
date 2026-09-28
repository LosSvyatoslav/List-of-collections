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
  company?: Company;
  description: string;
  keywords: string[];
  questionsCount: number;
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
  setSpecialization: (id: number | null) => void;
  setSearch: (words: string | null) => void;
  setAccess: (access: boolean | null) => void;
  getSpecializations: (limit: number) => void;
  getCollectionData: (id: string) => void;
  loading: boolean;
  error: string;
  collectionLoading: boolean;
  collectionError: string;
  specializations: number | null,
  search: string | null,
  access: boolean | null,
}

export interface ContextProps {
  children: ReactNode;
}

export interface Company {
  title: string;
  imageSrc: string;
}