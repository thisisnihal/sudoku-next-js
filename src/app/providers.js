'use client';

import { SudokuProvider } from "../../context/SudokuContext";

export function Providers({ children }) {
  return (
    <SudokuProvider>
        {children}
    </SudokuProvider>
  );
}