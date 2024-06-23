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
    updatePressedNumber,
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
    if (selectedCell) {
      updatePressedNumber(number);
    }
  };

  return (
    <div className="number-pad w-full md:w-fit">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => selectedCell && updatePressedNumber(num)}
          className="number-button"
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default NumberPad;
