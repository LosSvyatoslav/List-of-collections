import { createContext } from "react";
import type { QuestionContextValue } from "./types";

export const QuestionContext = createContext<QuestionContextValue | null>(null);