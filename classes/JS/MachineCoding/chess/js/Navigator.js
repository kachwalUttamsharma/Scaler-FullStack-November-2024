// This is the file that will control all the event that will happened in the application
import * as chessBoardUI from "./ChessBoardUI.js";
import { boardPieces, pieceMoves, resetBoardHandler, selectedPlayer, whoIsPlaying } from "./GameJson.js";


function Navigator() {
    document.addEventListener("click", (Event) => {
        const targetElement = Event.target;
        if (targetElement.closest(".bg-selected")) {
            const mainBoard = targetElement.closest(".mainBoard");
            if (!mainBoard) { return null; }
            const column = targetElement.closest(".bg-selected");
            const columnNumber = +column.dataset.column;
            const rowNumber = +targetElement.closest(".row").dataset.row;
            const currentPiece = boardPieces[selectedPlayer];
            // Reset the boardPieces delete old  one and add now move
            const newLocation = `${rowNumber}_${columnNumber}`;
            const deletedPlayer = boardPieces[newLocation] ? JSON.parse(JSON.stringify(boardPieces[newLocation])) : undefined;
            boardPieces[newLocation] = currentPiece;
            delete boardPieces[selectedPlayer];

            // Reset the board
            chessBoardUI["movePiceHandler"]({ oldLocation: selectedPlayer, newLocation, deletedPlayer });
        } else if (targetElement.closest(".resetGame")) {
            resetBoardHandler();
        } else if (targetElement.closest(".hasPiecs")) {
            const mainBoard = targetElement.closest(".mainBoard");

            const column = targetElement.closest(".hasPiecs");
            const playerType = column.dataset.playertype;
            const team = column.dataset.team;
            chessBoardUI["resetSelectionHandler"]();
            if (!mainBoard || team == whoIsPlaying) { return null; }
            // Call all the function that this piece can take
            pieceMoves[playerType].forEach(pieceFunction => {
                chessBoardUI[pieceFunction]({ selectedElement: column });
            });
        }

    })
}

export { Navigator };
