import { createContext } from "react";

type CardContextType = {
    addFilter: (filter: string) => void;
  };

export const CardContext = createContext<CardContextType>({
    addFilter: () => console.warn("No provider for CardContext")
});