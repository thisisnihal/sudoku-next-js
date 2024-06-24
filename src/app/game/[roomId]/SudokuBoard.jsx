import React, { useEffect, useState } from "react";
import { useSudoku } from "../../../../context/SudokuContext";
import {
  checkWin,
  dependentCells,
  findEmptyLocation,
  isValidMove,
  sounds,
} from "./gameUtil";
import "./SudokuBoard.css";
import Confetti from "./Confetti";

const Cell = ({ num, rowIndex, colIndex, canHighlight }) => {
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
    updatePressedNumber,
  } = useSudoku();
  const isFillable = fillable[rowIndex][colIndex];
  const [pencilCellArray, setPencilCellArray] = useState(Array(9).fill(0));
  const [isThisSelected, setIsThisSelected] = useState(false);
  const [showPencilCell, setShowPencilCell] = useState(false);

  useEffect(() => {
    setShowPencilCell(num === 0 && pencilCellArray.some((val) => val !== 0));
  }, [pencilCellArray]);

  useEffect(() => {
    setIsThisSelected(
      isFillable &&
        selectedCell?.row === rowIndex &&
        selectedCell?.col === colIndex
    );
  }, [selectedCell]);

  const resetPencilArray = () => setPencilCellArray(Array(9).fill(0));

  useEffect(() => {
    const num = getPressedNumber();
    if (!selectedCell || !isThisSelected) return;

    const [row, col] = [selectedCell.row, selectedCell.col];
    if (board[row][col] === solutionBoard[row][col]) return;

    if (pencilMode) {
      const newPencilCellArray = [...pencilCellArray];
      newPencilCellArray[num - 1] =
        newPencilCellArray[num - 1] === num ? 0 : num;
      setPencilCellArray(num === 0 ? Array(9).fill(0) : newPencilCellArray);
    } else {
      resetPencilArray();
      const newBoard = board.map((row, i) => (i === rowIndex ? [...row] : row));
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
    }
  }, [PressedNumber]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key >= 0 && event.key <= 9 && isFillable && isThisSelected) {
        updatePressedNumber(parseInt(event.key, 10));
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isFillable, isThisSelected]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedCell) return;
      const { row, col } = selectedCell;
      const moveMap = {
        ArrowUp: () => (row > 0 ? updateSelectedCell(row - 1, col) : null),
        ArrowDown: () => (row < 8 ? updateSelectedCell(row + 1, col) : null),
        ArrowLeft: () => (col > 0 ? updateSelectedCell(row, col - 1) : null),
        ArrowRight: () => (col < 8 ? updateSelectedCell(row, col + 1) : null),
      };
      moveMap[event.key]?.();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell, updateSelectedCell]);

  const classNames = (...classes) => classes.filter(Boolean).join(" ");
  const isBorderRight = colIndex % 3 === 2 && colIndex !== 8;
  const isBorderBottom = rowIndex % 3 === 2 && rowIndex !== 8;
  const isIncorrectMove =
    num &&
    isThisSelected &&
    board[rowIndex][colIndex] !== solutionBoard[rowIndex][colIndex];
  const isIncorrectFill =
    isFillable &&
    num &&
    board[rowIndex][colIndex] !== solutionBoard[rowIndex][colIndex];

  return (
    <div
      className={classNames(
        "sudoku-cell",
        isBorderRight && "border-r",
        isBorderBottom && "border-b",
        isThisSelected && "selected-cell",
        isIncorrectMove && "bg-incorrect",
        isIncorrectFill && "bg-incorrect",
        canHighlight && "highlightcell"
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
  const { board, selectedCell, gameWin, setGameWin, solutionBoard } =
    useSudoku();
  const [canHighlight, setCanHighlight] = useState(
    Array(9).fill(Array(9).fill(false))
  );

  useEffect(() => {
    if (selectedCell) {
      setCanHighlight(dependentCells(selectedCell.row, selectedCell.col));
    } else {
      setCanHighlight(Array(9).fill(Array(9).fill(false)));
    }
  }, [selectedCell]);
  const winAudio = new Audio("/sounds/win1.mp3");
  useEffect(() => {
    if (!Array.isArray(board) || board.length !== 9) {
      return;
    }
    if (findEmptyLocation(board) === null && checkWin(board, solutionBoard)) {
      console.log("You won the Game!!");
      setGameWin(true);
      winAudio.play();
    }
  }, [board]);

  return (
    <div className="sudoku-board">
      {gameWin && <Confetti />}
      {board.map((row, rowIndex) =>
        row.map((num, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            num={num}
            rowIndex={rowIndex}
            colIndex={colIndex}
            canHighlight={canHighlight[rowIndex][colIndex]}
          />
        ))
      )}
    </div>
  );
};

export default SudokuBoard;
