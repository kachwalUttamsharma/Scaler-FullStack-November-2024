// This the file from where this application will start working
import { ChessBoardUI } from "./ChessBoardUI.js";
import { Navigator } from "./Navigator.js";



const boardContainer = document.querySelector(".boardContainer .mainBoard");
const leftBoardContainer = document.querySelector(".boardContainer .leftBoard");
const rightBoardContainer = document.querySelector(".boardContainer .rightBoard");
const howWin = document.querySelector(".howWin");

window.addEventListener("load", () => {
    ChessBoardUI({ boardSize: 8, leftBoardContainer, rightBoardContainer, container: boardContainer });
    // All the function will be called from this function
    Navigator();
});

export { boardContainer, howWin, leftBoardContainer, rightBoardContainer };

