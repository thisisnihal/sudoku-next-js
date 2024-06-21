"use client";
import React, { useEffect } from "react";
import SudokuBoard from "./SudokuBoard";
import NumberPad from "./NumberPad";
import { useSudoku, SudokuProvider } from "../../../../context/SudokuContext";
import { generateSudoku } from "./gameUtil";
import "./SudokuBoard.css";
import UtilButtons from "./UtilButtons";

function GamePage({ params }) {
  const { roomId } = params;
  const { setInitialBoard, setBoard, setSolutionBoard } = useSudoku();

  useEffect(() => {
    const [initialBoard, solvedBoard] = generateSudoku(parseInt(roomId, 10));
    setInitialBoard(initialBoard);
    setBoard(initialBoard);
    setSolutionBoard(solvedBoard);
  }, [roomId]);

  return (
    <div className="w-screen h-screen p-1 bg-white flex flex-col justify-center items-center">
      <SudokuBoard />
      <UtilButtons />
      <NumberPad />
    </div>
  );
}

export default GamePage;
