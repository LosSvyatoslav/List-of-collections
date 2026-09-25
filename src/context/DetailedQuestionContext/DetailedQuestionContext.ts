import { createContext } from "react"
import type { DetailedQuestionContextValue } from "./types"

export const DetailedQuestionContext = createContext<DetailedQuestionContextValue | null>(null)