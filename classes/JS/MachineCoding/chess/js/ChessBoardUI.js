// All the changes on board UI will be done from here
import { boardContainer, howWin } from "./Controller.js";
import { boardPieces, selectedPlayerHandler, whoIsPlayingHandler } from "./GameJson.js";

// This function will do all the logical work of selection of any element
function elementsSelectedHandler({ selectedElement, elements }) {
    const pieceOnBoard = selectedElement.dataset.pieceonboard;
    const selectedTeam = selectedElement.dataset.team;
    selectedPlayerHandler({ pieceMoves: pieceOnBoard });
    Object.entries(elements).forEach(([_, value]) => {
        let isLoop = false;
        Array.from(value).forEach(tag => {
            if (isLoop) { return null; }
            let boardPiece = boardPieces[tag.dataset.pieceonboard];
            if (boardPiece) {
                boardPiece = boardPiece["pieceInfo"];
                const movedSelectedTeam = boardPiece["team"];
                if (selectedTeam === movedSelectedTeam) {
                    // If both are same just return from there
                    isLoop = true;
                    return null;
                }
                isLoop = true;
            }
            tag.classList.add("bg-selected");
        });
    })
}

// This function will reset the selection by the user if needed
function resetSelectionHandler() {
    const bgSelected = boardContainer.querySelectorAll(".bg-selected");
    Array.from(bgSelected).forEach(tag => tag.classList.remove("bg-selected"));
}

// All the UI based on chess board is working form here
function ChessBoardUI({ boardSize, container, leftBoardContainer, rightBoardContainer }) {
    // Reset the board before doing anything
    Array.from(container.children).forEach(tag => tag.remove());
    Array.from(leftBoardContainer.children).forEach(tag => tag.remove());
    Array.from(rightBoardContainer.children).forEach(tag => tag.remove());
    const boardUI = document.createDocumentFragment();
    const leftBoardUI = document.createDocumentFragment();
    const rightBoardUI = document.createDocumentFragment();
    for (let row = 1; row <= boardSize; row++) {
        const rowTag = document.createElement('div');
        rowTag.classList.add("row");
        rowTag.dataset.row = row;
        for (let column = 1; column <= boardSize; column++) {
            const columnTag = document.createElement('div');
            columnTag.classList.add("column");
            columnTag.dataset.column = column;

            // Board column colors
            let boardBgColor = (column + row) % 2 == 0 ? "bg-white" : "bg-black";
            columnTag.classList.add(boardBgColor);
            // columnTag.textContent = `${row} - ${column}`;

            // Insert the images of the board palyers 
            const pieceKey = `${row}_${column}`;
            let pieceOnBoard = boardPieces[pieceKey];
            if (pieceOnBoard) {
                pieceOnBoard = pieceOnBoard["pieceInfo"]
                const { pieceName, imagePath, team } = pieceOnBoard;
                pieceOnBoard["currentLocation"] = { row, column };
                columnTag.dataset.team = team;
                columnTag.dataset.pieceonboard = pieceKey;
                columnTag.dataset.playertype = pieceName;
                columnTag.classList.add("hasPiecs");
                columnTag.insertAdjacentHTML("afterbegin", `<img src="${imagePath}" class="img-fluid">`);
            }

            // Add to the row
            rowTag.appendChild(columnTag);
        }
        if (row < 3) {
            const clonedRowTag = rowTag.cloneNode(true);
            leftBoardUI.appendChild(clonedRowTag);
        }
        if (row > 6) {
            const clonedRowTag = rowTag.cloneNode(true);
            rightBoardUI.appendChild(clonedRowTag);
        }
        boardUI.appendChild(rowTag);
    }

    rightBoardContainer.append(rightBoardUI);
    rightBoardContainer.insertAdjacentHTML("beforeend", `<p>PLAYER 2</p>`);
    leftBoardContainer.append(leftBoardUI);
    leftBoardContainer.insertAdjacentHTML("beforeend", `<p>PLAYER 1</p>`);
    container.append(boardUI);
    container.insertAdjacentHTML("beforeend", `<button class="resetGame btn btn-white">Restart Game</botton>`);
    container.classList.remove("notActive");
}

// This function will move the player from one point to second point
function movePiceHandler({ oldLocation, newLocation, deletedPlayer }) {
    const row = newLocation.split("_")[0];
    const column = newLocation.split("_")[1];
    const oldLocationTag = boardContainer.querySelector(`.row[data-row="${oldLocation.split("_")[0]}"] .column[data-column="${oldLocation.split("_")[1]}"]`)
    const newLocationTag = boardContainer.querySelector(`.row[data-row="${row}"] .column[data-column="${column}"]`)

    const deletedPlayerType = newLocationTag.dataset.playertype;
    const deletedTeam = newLocationTag.dataset.team;

    // Remove old pices
    Array.from(oldLocationTag.children).forEach(tag => tag.remove());
    delete oldLocationTag.dataset.team;
    delete oldLocationTag.dataset.pieceonboard;
    delete oldLocationTag.dataset.playertype;
    oldLocationTag.classList.remove("hasPiecs");

    // Add new pices
    const pieceOnBoard = boardPieces[newLocation]["pieceInfo"];
    const { pieceName, imagePath, team } = pieceOnBoard;
    pieceOnBoard["currentLocation"] = { row, column };
    boardPieces[newLocation]["isActive"] = true;
    newLocationTag.dataset.team = team;
    newLocationTag.dataset.pieceonboard = newLocation;
    newLocationTag.dataset.playertype = pieceName;
    newLocationTag.classList.add("hasPiecs");

    // If it's a player 
    Array.from(newLocationTag.children).forEach(tag => {
        const rowNumber = deletedPlayer ? deletedPlayer["currentLocation"].split("_")[0] : tag.closest('.row').dataset.row;
        const columnNumber = deletedPlayer ? deletedPlayer["currentLocation"].split("_")[1] : tag.closest('.column').dataset.column;
        const boarSide = team === "white_team" ? ".leftBoard" : ".rightBoard";
        const deleteLeftColumn = document.querySelector(`${boarSide} .row[data-row="${rowNumber}"] .column[data-column="${columnNumber}"]`);
        deleteLeftColumn?.classList.add("bg-selected");
        tag.remove();
    });
    newLocationTag.insertAdjacentHTML("afterbegin", `<img src="${imagePath}" class="img-fluid">`);


    // Clean the selection
    resetSelectionHandler();
    selectedPlayerHandler({ pieceMoves: null });
    whoIsPlayingHandler({ player: team });

    // If deletedPlayerType is king then game over 
    if (deletedPlayerType === "king") {
        const winner = deletedTeam === "black_team" ? 2 : 1;
        const player = howWin.querySelector(".player")
        player.textContent = winner;
        howWin.classList.add("active");
    }
}

// This function will select all the board elements from left to right
function leftToRightHandler({ selectedElement }) {
    const rowTag = selectedElement.closest('.row');
    const columnNumber = +selectedElement.dataset.column;
    const elements = { "toRight": [], "toLeft": [] };

    for (let index = columnNumber - 1; index >= 1; index--) {
        const selectedColumn = rowTag.querySelector(`.column[data-column="${index}"]`);
        elements["toRight"].push(selectedColumn);
    }
    for (let index = columnNumber + 1; index <= 8; index++) {
        const selectedColumn = rowTag.querySelector(`.column[data-column="${index}"]`);
        elements["toLeft"].push(selectedColumn);
    }
    elementsSelectedHandler({ selectedElement, elements });
}

// This function will select all the board elements from top to bottom
function topToBottomHandler({ selectedElement }) {
    const rowTag = selectedElement.closest('.row');
    const columnNumber = +selectedElement.dataset.column;
    const rowNumber = +rowTag.dataset.row;
    const elements = { "toTop": [], "toBottom": [] };

    for (let index = rowNumber - 1; index >= 1; index--) {
        const selectedColumn = boardContainer.querySelector(`.row[data-row="${index}"] .column[data-column="${columnNumber}"]`);
        elements["toTop"].push(selectedColumn);
    }
    for (let index = rowNumber + 1; index <= 8; index++) {
        const selectedColumn = boardContainer.querySelector(`.row[data-row="${index}"] .column[data-column="${columnNumber}"]`);
        elements["toBottom"].push(selectedColumn);
    }
    elementsSelectedHandler({ selectedElement, elements });
}


// This function will select all the board elements from top left to bottom right
function topLeftToBottomRightHandler({ selectedElement }) {
    const columnNumber = +selectedElement.dataset.column;
    const rowNumber = +selectedElement.closest('.row').dataset.row;

    const elements = { "toTopLeft": [], "toBottomRight": [] };

    for (let index = rowNumber - 1; index >= 1; index--) {
        const selectedRowNumber = columnNumber + (index - rowNumber);
        const selectedColumn = boardContainer.querySelector(`.row[data-row="${index}"] .column[data-column="${selectedRowNumber}"]`);
        if (!selectedColumn) {
            console.log("The element is not in the row");
            break;
        }
        elements["toTopLeft"].push(selectedColumn);
    }
    for (let index = rowNumber + 1; index <= 8; index++) {
        const selectedRowNumber = columnNumber - (rowNumber - index);
        const selectedColumn = boardContainer.querySelector(`.row[data-row="${index}"] .column[data-column="${selectedRowNumber}"]`);
        if (!selectedColumn) {
            console.log("The element is not in the row");
            break;
        }
        elements["toBottomRight"].push(selectedColumn);
    }
    elementsSelectedHandler({ selectedElement, elements });
}

// This function will select all the board elements from top right to bottom left
// This function has all the movement information of king
function kingHandler({ selectedElement }) {
    const rowNumber = +selectedElement.closest(".row").dataset.row;
    const columnNumber = +selectedElement.closest(".column").dataset.column;
    const elements = {
        "toTopLeft": [`${rowNumber - 1}_${columnNumber - 1}`],
        "toTop": [`${rowNumber - 1}_${columnNumber}`],
        "toTopRight": [`${rowNumber - 1}_${columnNumber + 1}`],
        "toCurrentLeft": [`${rowNumber}_${columnNumber - 1}`],
        "toCurrentRight": [`${rowNumber}_${columnNumber + 1}`],
        "toBottomLeft": [`${rowNumber + 1}_${columnNumber - 1}`],
        "toBottom": [`${rowNumber + 1}_${columnNumber}`],
        "toBottomRight": [`${rowNumber + 1}_${columnNumber + 1}`],
    };

    Object.entries(elements).forEach(([key, value]) => {
        const tamp = { [key]: [] };
        const isEvery = value.every(tag => {
            const row = tag.split("_")[0];
            const column = tag.split("_")[1];
            const isTag = document.querySelector(`.mainBoard .row[data-row="${row}"] .column[data-column="${column}"]`);
            if (isTag) {
                tamp[key].push(isTag);
                return true
            }
            return false;
        })
        if (!isEvery) {
            elements[key] = [];
            return null;
        }
        elements[key] = tamp[key];
    });

    elementsSelectedHandler({ selectedElement, elements });
}
// This function has all the movement information of knight
function knightHandler({ selectedElement }) {
    const rowNumber = +selectedElement.closest(".row").dataset.row;
    const columnNumber = +selectedElement.closest(".column").dataset.column;
    const elements = {
        "toTopLeft": [
            `${rowNumber - 1}_${columnNumber}`,
            `${rowNumber - 2}_${columnNumber}`,
            `${rowNumber - 2}_${columnNumber - 1}`,
        ],
        "toTopRight": [
            `${rowNumber - 1}_${columnNumber}`,
            `${rowNumber - 2}_${columnNumber}`,
            `${rowNumber - 2}_${columnNumber + 1}`,
        ],
        "toCurrentTopLeft": [
            `${rowNumber}_${columnNumber - 1}`,
            `${rowNumber}_${columnNumber - 2}`,
            `${rowNumber - 1}_${columnNumber - 2}`,
        ],
        "toCurrentBottomLeft": [
            `${rowNumber}_${columnNumber - 1}`,
            `${rowNumber}_${columnNumber - 2}`,
            `${rowNumber + 1}_${columnNumber - 2}`,
        ],
        "toCurrentTopRight": [
            `${rowNumber}_${columnNumber + 1}`,
            `${rowNumber}_${columnNumber + 2}`,
            `${rowNumber - 1}_${columnNumber + 2}`,
        ],
        "toCurrentBottomRight": [
            `${rowNumber}_${columnNumber + 1}`,
            `${rowNumber}_${columnNumber + 2}`,
            `${rowNumber + 1}_${columnNumber + 2}`,
        ],
        "toBottomLeft": [
            `${rowNumber + 1}_${columnNumber}`,
            `${rowNumber + 2}_${columnNumber}`,
            `${rowNumber + 2}_${columnNumber - 1}`,
        ],
        "toBottomRight": [
            `${rowNumber + 1}_${columnNumber}`,
            `${rowNumber + 2}_${columnNumber}`,
            `${rowNumber + 2}_${columnNumber + 1}`,
        ],
    };

    Object.entries(elements).forEach(([key, value]) => {
        const tamp = { [key]: [] };
        const isEvery = value.every(tag => {
            const row = tag.split("_")[0];
            const column = tag.split("_")[1];
            const isTag = document.querySelector(`.mainBoard .row[data-row="${row}"] .column[data-column="${column}"]`);
            if (isTag) {
                tamp[key].push(isTag);
                return true
            }
            return false;
        })
        if (!isEvery) {
            elements[key] = [];
            return null;
        }
        elements[key] = [tamp[key][2]];
    });

    elementsSelectedHandler({ selectedElement, elements });
}

// This function has all the movement information of pawn
function pawnHandler({ selectedElement }) {
    const columnNumber = +selectedElement.dataset.column;
    const pieceOnBoard = boardPieces[selectedElement.dataset.pieceonboard]["isActive"] ? 1 : 2;
    let rowNumber = +selectedElement.closest('.row').dataset.row;
    const team = selectedElement.dataset.team;
    const elements = { "toForward": [], "toForwardRight": [], "toForwardLeft": [] };
    for (let index = 1; index <= pieceOnBoard; index++) {
        const rowIndex = team === "white_team" ? rowNumber - index : rowNumber + index;
        const selectedRow = boardContainer.querySelector(`.boardContainer .row[data-row="${rowIndex}"]`);
        if (!selectedRow) {
            console.log("Can not go ferther");
            return null;
        }
        // Logic for pawn
        // 1. Go Forward not if anyone there already.
        // 2. Check right and left if oposite team there just add theme also.
        const rightPices = `${rowIndex}_${columnNumber + 1}`;
        const LeftPices = `${rowIndex}_${columnNumber - 1}`;
        const currentPices = `${rowNumber}_${columnNumber}`;
        const selectedColumn = selectedRow.querySelector(`.column[data-column="${columnNumber}"]`);
        const rightSelectedColumn = selectedRow.querySelector(`.column[data-column="${columnNumber + 1}"]`);
        const leftSelectedColumn = selectedRow.querySelector(`.column[data-column="${columnNumber - 1}"]`);


        if (pieceOnBoard == 1 && leftSelectedColumn && boardPieces.hasOwnProperty(LeftPices) &&
            boardPieces[LeftPices]["pieceInfo"]["team"] !== boardPieces[currentPices]["pieceInfo"]["team"]) {
            elements["toForwardRight"].push(leftSelectedColumn);
        }
        if (pieceOnBoard == 1 && rightSelectedColumn && boardPieces.hasOwnProperty(rightPices) &&
            boardPieces[rightPices]["pieceInfo"]["team"] !== boardPieces[currentPices]["pieceInfo"]["team"]) {
            elements["toForwardLeft"].push(rightSelectedColumn);
        }
        if (selectedColumn && !boardPieces.hasOwnProperty(`${rowIndex}_${columnNumber}`)) {
            elements["toForward"].push(selectedColumn);
        }
    }
    elementsSelectedHandler({ selectedElement, elements });
}
// This function will select all the board elements from top right to bottom left
function topRightToBottomLeftHandler({ selectedElement }) {
    const columnNumber = +selectedElement.dataset.column;
    const rowNumber = +selectedElement.closest('.row').dataset.row;
    const elements = { "toTopRight": [], "toBottomLeft": [] };

    for (let index = rowNumber - 1; index >= 1; index--) {

        const selectedRowNumber = columnNumber - (index - rowNumber);
        const selectedColumn = boardContainer.querySelector(`.row[data-row="${index}"] .column[data-column="${selectedRowNumber}"]`);
        if (!selectedColumn) {
            console.log("The element is not in the row");
            break;
        }
        elements["toTopRight"].push(selectedColumn);
    }
    for (let index = rowNumber + 1; index <= 8; index++) {

        const selectedRowNumber = columnNumber + (rowNumber - index);
        const selectedColumn = boardContainer.querySelector(`.row[data-row="${index}"] .column[data-column="${selectedRowNumber}"]`);
        if (!selectedColumn) {
            console.log("The element is not in the row");
            break;
        }
        elements["toBottomLeft"].push(selectedColumn);
    }
    elementsSelectedHandler({ selectedElement, elements });
}

export {
    ChessBoardUI, kingHandler, knightHandler, leftToRightHandler, movePiceHandler, pawnHandler, resetSelectionHandler, topLeftToBottomRightHandler, topRightToBottomLeftHandler, topToBottomHandler
};

