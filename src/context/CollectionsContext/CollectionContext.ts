import { createContext } from "react";
import type { CollectionContextValue } from "./types";

export const CollectionContext = createContext<CollectionContextValue | null>(null)