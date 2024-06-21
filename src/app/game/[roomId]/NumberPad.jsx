import React, { useEffect, useMemo } from "react";
import { useSudoku } from "../../../../context/SudokuContext";
import { isValidMove, isValidSudoku } from "./gameUtil";

const NumberPad = () => {
  const {
    board,
    selectedCell,
    setBoard,
    solutionBoard,
    pencilMode,
    updateNumPressed,
  } = useSudoku();

  const hasZero = (_board) => {
    return _board.some((row) => row.some((element) => element === 0));
  };

  const deepCopy2DArray = (arr) => {
    return arr.map((row) => [...row]);
  };
  const isSolved = (_board) => {
    return _board.every((row, rowIndex) =>
      row.every(
        (element, colIndex) => element === solutionBoard[rowIndex][colIndex]
      )
    );
  };

  const handleNumberClick = (number) => {
    if (selectedCell && pencilMode) {
      updateNumPressed(number);
    } else if (selectedCell) {
      updateNumPressed(0);
      let audio;
      const newBoard = deepCopy2DArray(board);
      const [row, col] = [selectedCell.row, selectedCell.col];
      if (newBoard[row][col] === number) {
        newBoard[row][col] = 0;
        audio = new Audio("/sounds/erase.mp3");
      } else {
        newBoard[row][col] = number;
        if (isValidMove(newBoard, number, row, col)) {
          audio = new Audio("/sounds/click1.mp3");
        } else {
          audio = new Audio("/sounds/wrongClick1.mp3");
        }
      }
      setBoard(newBoard);
      audio.play();
      if (!hasZero(newBoard) && isSolved(newBoard)) {
        console.log("you win !!");
      }
    }
  };

  return (
    <div className="number-pad w-full md:w-fit">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => handleNumberClick(num)}
          className="number-button"
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default NumberPad;
