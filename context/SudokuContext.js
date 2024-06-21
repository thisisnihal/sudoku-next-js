// Create a context for Sudoku game state
import React, { createContext, useContext, useState } from "react";

const SudokuContext = createContext();

export const SudokuProvider = ({ children }) => {
  const [initialBoard, setInitialBoard] = useState([]);
  const [board, setBoard] = useState([]);
  const [solutionBoard, setSolutionBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [pencilMode, setPencilMode] = useState(false);

  const togglePencilMode = () => setPencilMode((prev) => !prev);

  const [numPressed, setNumPressed] = useState([false, 0]);

  const updateBoard = (newBoard) => {
    setBoard(newBoard);
  };

  const updateSelectedCell = (row, col) => {
    setSelectedCell({ row, col });
  };

  const updateNumPressed = (num) => {
    setNumPressed((prev) => {
      let newNumPressed = [...prev];

      newNumPressed = [!prev[0], num];
      return newNumPressed;
    });
  };

  const contextValue = {
    initialBoard,
    setInitialBoard,
    board,
    setBoard,
    solutionBoard,
    setSolutionBoard,
    selectedCell,
    setSelectedCell,
    updateBoard,
    updateSelectedCell,
    pencilMode,
    setPencilMode,
    togglePencilMode,
    numPressed,
    updateNumPressed,
  };

  return (
    <SudokuContext.Provider value={contextValue}>
      {children}
    </SudokuContext.Provider>
  );
};

export const useSudoku = () => useContext(SudokuContext);
