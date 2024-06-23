import React, { useState } from "react";
import { useSudoku } from "../../../../context/SudokuContext";
import "./SudokuBoard.css";

const deepCopy2DArray = (arr) => {
  return arr.map((row) => [...row]);
};
function UtilButtons() {
  const {
    board,
    selectedCell,
    setBoard,
    pencilMode,
    setPencilMode,
    togglePencilMode,
    fillable,
    updateSelectedCell,
    updatePressedNumber,
  } = useSudoku();

  const audio = new Audio("/sounds/erase.mp3");
  const erase = () => {
    if (
      selectedCell &&
      selectedCell.row !== undefined &&
      selectedCell.col !== undefined &&
      fillable[selectedCell.row][selectedCell.col]
    ) {
      updatePressedNumber(0);
      console.log("erased");
    }

    setPencilMode(false);
  };
  const handleHighlight = () => {
    if (
      selectedCell &&
      selectedCell.row !== undefined &&
      selectedCell.col !== undefined &&
      fillable[selectedCell.row][selectedCell.col]
    ) {
    togglePencilMode();
    }
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
      <button
        className="number-button util-button"
        onClick={() => updateSelectedCell(null)}
      >
        Deselect
      </button>
    </div>
  );
}

export default UtilButtons;
