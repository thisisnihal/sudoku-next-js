import React, { useEffect, useState } from "react";
import { useSudoku } from "../../../../context/SudokuContext";
import { isValidMove } from "./gameUtil";
import "./SudokuBoard.css";

const Cell = ({ num, rowIndex, colIndex }) => {
  const {
    board,
    initialBoard,
    selectedCell,
    updateSelectedCell,
    pencilMode,
    numPressed,
    setPencilMode,
  } = useSudoku();
  const isFillable = initialBoard[rowIndex][colIndex] === 0;

  const [isThisSelected, setIsThisSelected] = useState(false);
  const [pencilArray, setPencilArray] = useState(
    Array.from({ length: 9 }, (_, index) => 0)
  );
  const [showHighlightCell, setshowHighlightCell] = useState(false);

  useEffect(() => {
   
  }, [isThisSelected]);


  useEffect(() => {
    setIsThisSelected(
      selectedCell?.row === rowIndex && selectedCell?.col === colIndex
    );

    setshowHighlightCell(() => {
      return pencilArray.some((val) => val !== 0);
    });
    
    
  }, [selectedCell, pencilArray]);

useEffect(() => {
  setPencilMode((prev) => {
    if (isThisSelected && showHighlightCell) return true;
    else if (showHighlightCell) return showHighlightCell;
    else if (prev) return true;
    return showHighlightCell;
  });
}, [isThisSelected, showHighlightCell])


  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  const handlePencilInput = () => {
    if (isFillable) updateSelectedCell(rowIndex, colIndex);
  };

  useEffect(() => {
    if (isThisSelected) {
      const num = numPressed[1];
      const newPencilArray = [...pencilArray];
      if (num === 0) {
        for (let i = 0; i < newPencilArray.length; i++) {
          newPencilArray[i] = 0;
        }
      } else if (newPencilArray[num - 1] === num) {
        newPencilArray[num - 1] = 0;
      } else {
        newPencilArray[num - 1] = newPencilArray[num - 1] === 0 ? num : 0;
      }
      setPencilArray(newPencilArray);
    }
  }, [numPressed]);

  const isBorderRight = colIndex % 3 === 2 && colIndex !== 8;
  const isBorderBottom = rowIndex % 3 === 2 && rowIndex !== 8;
  const isIncorrectMove =
    num && isThisSelected && !isValidMove(board, num, rowIndex, colIndex);
  const isIncorrectFill =
    isFillable && num && !isValidMove(board, num, rowIndex, colIndex);

  return (pencilMode && isThisSelected) || showHighlightCell ? (
    <div
      className={classNames(
        "highlight-cell",
        isBorderRight && "border-r",
        isBorderBottom && "border-b",
        isThisSelected && "selected-cell"
      )}
      onClick={handlePencilInput}
    >
      {pencilArray.map((val, index) => {
        return (
          <div className="highlight-sub-cell" key={index}>
            {val || ' '}
          </div>
        );
      })}
    </div>
  ) : (
    <input
      type="number"
      value={num || ""}
      onClick={() => isFillable && updateSelectedCell(rowIndex, colIndex)}
      className={classNames(
        "sudoku-cell",
        isFillable && "fillable-cell",
        isThisSelected && "selected-cell",
        isBorderRight && "border-r",
        isBorderBottom && "border-b",
        isIncorrectMove && "bg-incorrect",
        isIncorrectFill && "bg-incorrect"
      )}
      min="1"
      max="9"
      readOnly
    />
  );
};

const SudokuBoard = () => {
  const { board } = useSudoku();

  return (
    <div className="sudoku-board">
      {board.map((row, rowIndex) =>
        row.map((num, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            num={num}
            rowIndex={rowIndex}
            colIndex={colIndex}
          />
        ))
      )}
    </div>
  );
};

export default SudokuBoard;
