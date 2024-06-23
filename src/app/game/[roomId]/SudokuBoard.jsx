import React, { useEffect, useState } from "react";
import { useSudoku } from "../../../../context/SudokuContext";
import { isValidMove, sounds } from "./gameUtil";
import "./SudokuBoard.css";

const Cell = ({ num, rowIndex, colIndex }) => {
  const {
    board,
    updateBoard,
    solutionBoard,
    fillable,
    selectedCell,
    updateSelectedCell,
    pencilMode,
    PressedNumber,
    getPressedNumber,
  } = useSudoku();
  const isFillable = fillable[rowIndex][colIndex];

  const [pencilCellArray, setPencilCellArray] = useState(
    Array.from({ length: 9 }, (_, index) => 0)
  );

  const [isThisSelected, setIsThisSelected] = useState(false);
  const [showPencilCell, setShowPencilCell] = useState(false);

  useEffect(() => {
    setShowPencilCell(num === 0 && pencilCellArray.some((val) => val !== 0));
  }, [pencilCellArray]);

  const classNames = (...classes) => classes.filter(Boolean).join(" ");

  useEffect(() => {
    setIsThisSelected(
      selectedCell?.row === rowIndex && selectedCell?.col === colIndex
    );
  }, [selectedCell]);

  const copyBoard = (arr) => {
    return arr.map((row) => [...row]);
  };

  const resetPencilArray = () => {
    const newpencilCellArray = [...pencilCellArray];
    for (let i = 0; i < newpencilCellArray.length; i++) {
      newpencilCellArray[i] = 0;
    }
    setPencilCellArray(newpencilCellArray);
  };

  useEffect(() => {
    const num = getPressedNumber();
    if (!selectedCell || !isThisSelected) return;

    const [row, col] = [selectedCell.row, selectedCell.col];

    if (pencilMode) {
      handlePencilMode(num);
    } else {
      handleNormalMode(num, row, col);
    }
  }, [PressedNumber]);

  const handlePencilMode = (num) => {
    const newPencilCellArray = [...pencilCellArray];
    if (num === 0) {
      for (let i = 0; i < newPencilCellArray.length; i++) {
        newPencilCellArray[i] = 0;
      }
    } else {
      newPencilCellArray[num - 1] =
        newPencilCellArray[num - 1] === num ? 0 : num;
    }
    setPencilCellArray(newPencilCellArray);
  };

  const handleNormalMode = (num, row, col) => {
    resetPencilArray();
    const newBoard = copyBoard(board);
    console.log("pressed ", num);

    if (board[row][col] === num || num === 0) {
      newBoard[row][col] = 0;
      sounds.playErase();
    } else {
      newBoard[row][col] = num;
      solutionBoard[row][col] === num
        ? sounds.playCorrect()
        : sounds.playWrong();
    }
    updateBoard(newBoard);
  };

  const isBorderRight = colIndex % 3 === 2 && colIndex !== 8;
  const isBorderBottom = rowIndex % 3 === 2 && rowIndex !== 8;
  const isIncorrectMove =
    num && isThisSelected && !isValidMove(board, num, rowIndex, colIndex);
  const isIncorrectFill =
    isFillable && num && !isValidMove(board, num, rowIndex, colIndex);

  return (
    <div
      className={classNames(
        "sudoku-cell",
        isBorderRight && "border-r",
        isBorderBottom && "border-b",
        isThisSelected && "selected-cell",
        isIncorrectMove && "bg-incorrect",
        isIncorrectFill && "bg-incorrect",
        " "
      )}
      onClick={() => isFillable && updateSelectedCell(rowIndex, colIndex)}
    >
      {showPencilCell ? (
        <div className="pencil-cell">
          {pencilCellArray.map((val, index) => (
            <div className="pencil-sub-cell" key={index}>
              {val || " "}
            </div>
          ))}
        </div>
      ) : (
        <input
          type="number"
          value={num || ""}
          min={1}
          max={9}
          readOnly
          className={classNames(
            "cell-number",
            isIncorrectMove && "bg-incorrect-move",
            isIncorrectFill && "bg-incorrect",
            isFillable && "fillable-cell"
          )}
        />
      )}
    </div>
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
