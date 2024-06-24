export function isValidMove(board, num, row, col) {
  const BOARD_SIZE = 9;
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (
      (i != row && board[i][col] == num) ||
      (i != col && board[row][i] == num)
    )
      return false;
  }

  let r = row - (row % 3);
  let c = col - (col % 3);
  for (let i = r; i < r + 3; i++) {
    for (let j = c; j < c + 3; j++) {
      if (i != row && j != col && board[i][j] == num) return false;
    }
  }
  return true;
}

export function isValidSudoku(board) {
  const BOARD_SIZE = 9;
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] != 0) {
        //cout << "i:" << i << " j:" << j << ", " << board[i][j] << ed;
        if (!isValidMove(board, board[i][j], i, j)) return false;
      }
    }
  }
  return true;
}

export function dependentCells(row, col) {
  const dependentCellsArray = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => false)
  );

  const BOARD_SIZE = 9;
  if (row === undefined || col === undefined) return dependentCellsArray;
  for (let i = 0; i < BOARD_SIZE; i++) {
    dependentCellsArray[i][col] = true;
    dependentCellsArray[row][i] = true;
  }

  let r = row - (row % 3);
  let c = col - (col % 3);
  for (let i = r; i < r + 3; i++) {
    for (let j = c; j < c + 3; j++) {
      dependentCellsArray[i][j] = true;
    }
  }
  dependentCellsArray[row][col] = false;

  return dependentCellsArray;
}


function isValid(board, row, col, num) {
  for (let i = 0; i < 9; ++i) {
    if (board[row][i] === num || board[i][col] === num) {
      return false;
    }
  }
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = startRow; i < startRow + 3; ++i) {
    for (let j = startCol; j < startCol + 3; ++j) {
      if (board[i][j] === num) {
        return false;
      }
    }
  }
  return true;
}

export function findEmptyLocation(board) {
  
  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return null;
}

function solveSudoku(board) {
  const emptyLoc = findEmptyLocation(board);
  if (!emptyLoc) {
    return true;
  }
  const [row, col] = emptyLoc;

  for (let num = 1; num <= 9; ++num) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;
      if (solveSudoku(board)) {
        return true;
      }
      board[row][col] = 0;
    }
  }
  return false;
}

function generateFullSudoku() {
  const board = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => 0)
  );
  for (let k = 0; k < 9; k += 3) {
    fill3x3Subgrid(board, k, k);
  }
  solveSudoku(board);
  return board;
}

function fill3x3Subgrid(board, row, col) {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffle(nums);
  let idx = 0;
  for (let i = row; i < row + 3; ++i) {
    for (let j = col; j < col + 3; ++j) {
      board[i][j] = nums[idx++];
    }
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function checkUniqueSolution(board) {
  const boardCopy = JSON.parse(JSON.stringify(board));
  const solutions = [];

  function findSolutions(board) {
    const emptyLoc = findEmptyLocation(board);
    if (!emptyLoc) {
      solutions.push(board.map((row) => [...row]));
      return;
    }
    const [row, col] = emptyLoc;
    for (let num = 1; num <= 9; ++num) {
      if (isValid(board, row, col, num)) {
        board[row][col] = num;
        findSolutions(board);
        board[row][col] = 0;
      }
    }
    if (solutions.length > 1) {
      return;
    }
  }

  findSolutions(boardCopy);
  return solutions.length === 1;
}

function removeNumbers(board, difficulty) {
  const emptyCells = [];
  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      if (board[i][j] !== 0) {
        emptyCells.push([i, j]);
      }
    }
  }
  shuffle(emptyCells);

  let attempts = difficulty;
  while (attempts > 0 && emptyCells.length > 0) {
    const [row, col] = emptyCells.pop();
    const backup = board[row][col];
    board[row][col] = 0;
    if (!checkUniqueSolution(board)) {
      board[row][col] = backup;
    } else {
      attempts--;
    }
  }
  return board;
}

export function generateSudoku(difficulty) {
  if (difficulty >= 64) difficulty = 63;

  const fullBoard = generateFullSudoku();
  const solvedBoard = fullBoard.map((row) => [...row]);
  const puzzleBoard = removeNumbers(fullBoard, difficulty);
  return [puzzleBoard, solvedBoard];
}

// Example usage
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question("Enter difficulty: ", (difficulty) => {
//     const sudokuPuzzle = generateSudoku(parseInt(difficulty));
//     function formatSudoku(board) {
//         return board.map(row => row.join(' ')).join('\n');
//     }

//     // Example usage
//     console.log("----Printing Sudoku------\n");
//     console.log(formatSudoku(sudokuPuzzle[0]));
//     console.log("\n-------Solution------\n");
//     console.log(formatSudoku(sudokuPuzzle[1]));
//     rl.close();
// });

export const sounds = (() => {
  const correct = new Audio("/sounds/click1.mp3");
  const wrong = new Audio("/sounds/wrong2.mp3");
  const erase = new Audio("/sounds/erase.mp3");

  function playCorrect() {
    correct.currentTime = 0;
    correct
      .play()
      .catch((error) => console.error("Error playing sound:", error));
  }
  function playWrong() {
    wrong.currentTime = 0;
    wrong.play().catch((error) => console.error("Error playing sound:", error));
  }
  function playErase() {
    erase.currentTime = 0;
    erase.play().catch((error) => console.error("Error playing sound:", error));
  }

  return {
    playCorrect,
    playWrong,
    playErase,
  };
})();

export function checkWin(currentBoard, solutionBoard) {
  if (currentBoard.length !== solutionBoard.length) return false;
  for (let i = 0; i < currentBoard.length; i++) {
    if (currentBoard[i].length !== solutionBoard[i].length) return false;
    for (let j = 0; j < currentBoard[i].length; j++) {
      if (currentBoard[i][j] !== solutionBoard[i][j]) return false;
    }
  }
  return true;
}
