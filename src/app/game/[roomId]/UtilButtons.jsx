import React, { useState } from "react";
import { useSudoku } from "../../../../context/SudokuContext";
import "./SudokuBoard.css";

const deepCopy2DArray = (arr) => {
  return arr.map((row) => [...row]);
};
function UtilButtons() {
  const { board, selectedCell, setBoard, pencilMode,setPencilMode, togglePencilMode, updateNumPressed } = useSudoku();
  
  const audio = new Audio("/sounds/erase.mp3");
  const erase = () => {
    if (selectedCell && board[selectedCell.row][selectedCell.col] !== 0) {
      const newBoard = deepCopy2DArray(board);
      newBoard[selectedCell.row][selectedCell.col] = 0;
      audio.play();
      setBoard(newBoard);
    // } else if (selectedCell) {
      updateNumPressed(0);
      setPencilMode(false);
    }
  };
  const handleHighlight = () => {
    togglePencilMode();
  };
  return (
    <div className="number-pad w-full md:w-fit">
      <button className="number-button util-button" onClick={erase}>
        Erase
      </button>
      <button
        className={`number-button util-button ${
          pencilMode ? "highlightactive" : ""
        }`}
        onClick={handleHighlight}
      >
        Pencil
      </button>
    </div>
  );
}

export default UtilButtons;
