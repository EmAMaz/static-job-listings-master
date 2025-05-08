import { createContext } from "react";

interface CardContextType {
  filters: string[];
  addFilter: (filters: string) => void;
}

export const CardContext = createContext<CardContextType>({
    filters: [],
    addFilter: () => console.warn("No provider for CardContext")
});