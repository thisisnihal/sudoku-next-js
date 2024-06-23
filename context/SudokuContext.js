// Create a context for Sudoku game state
import React, { createContext, useContext, useState } from "react";

const SudokuContext = createContext();

export const SudokuProvider = ({ children }) => {
  const [fillable, setFillable] = useState([]);
  const [board, setBoard] = useState([]);
  const [solutionBoard, setSolutionBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [pencilMode, setPencilMode] = useState(false);

  const togglePencilMode = () => setPencilMode((prev) => !prev);

  const [PressedNumber, setPressedNumber] = useState([0, false]);

  const updateBoard = (newBoard) => {
    setBoard(newBoard);
  };

  const updateSelectedCell = (row, col) => {
    setSelectedCell({ row, col });
  };

  const updatePressedNumber = (num) => {
    setPressedNumber((prev) => {
      const newPressedNumber = [num, !prev];
      return newPressedNumber;
    });
  };
  const getPressedNumber = () => {
    return PressedNumber[0];
  };

  const contextValue = {
    fillable,
    setFillable,
    board,
    setBoard,
    updateBoard,
    solutionBoard,
    setSolutionBoard,
    selectedCell,
    setSelectedCell,
    updateSelectedCell,
    pencilMode,
    setPencilMode,
    togglePencilMode,

    PressedNumber,
    getPressedNumber,
    updatePressedNumber,
  };

  return (
    <SudokuContext.Provider value={contextValue}>
      {children}
    </SudokuContext.Provider>
  );
};

export const useSudoku = () => useContext(SudokuContext);
