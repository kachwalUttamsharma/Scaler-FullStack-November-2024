import { ChessBoardUI } from "./ChessBoardUI.js";
import { boardContainer, leftBoardContainer, rightBoardContainer } from "./Controller.js";

let selectedPlayer = null;
let whoIsPlaying=null;
function whoIsPlayingHandler({ player }) {
    whoIsPlaying = player;
}
// This function will update selected player so when move is done right pices can move
function selectedPlayerHandler({ pieceMoves }) {
    selectedPlayer = pieceMoves;
}
const playerInformationJSON = {
    "white_pawn": {
        team: "white_team",
        pieceName: "pawn",
        imagePath: "./images/white-pawn.webp",
    },
    "white_left_rook": {
        team: "white_team",
        pieceName: "rook",
        imagePath: "./images/white-rook.webp",
    },
    "white_rook": {
        team: "white_team",
        pieceName: "rook",
        imagePath: "./images/white-rook.webp",
    },
    "white_left_knight": {
        team: "white_team",
        pieceName: "knight",
        imagePath: "./images/white-left-knight.webp",
    },
    "white_right_knight": {
        team: "white_team",
        pieceName: "knight",
        imagePath: "./images/white-right-knight.webp",
    },
    "white_left_bishop": {
        team: "white_team",
        pieceName: "bishop",
        imagePath: "./images/white-left-bishop.webp",
    },
    "white_right_bishop": {
        team: "white_team",
        pieceName: "bishop",
        imagePath: "./images/white-right-bishop.webp",
    },
    "white_queen": {
        team: "white_team",
        pieceName: "queen",
        imagePath: "./images/white-queen.webp",
    },
    "white_king": {
        team: "white_team",
        pieceName: "king",
        imagePath: "./images/white-king.webp",
    },
    "black_rook": {
        team: "black_team",
        pieceName: "rook",
        imagePath: "./images/black-rook.webp",
    },
    "black_left_knight": {
        team: "black_team",
        pieceName: "knight",
        imagePath: "./images/black-left-knight.webp",
    },
    "black_right_knight": {
        team: "black_team",
        pieceName: "knight",
        imagePath: "./images/black-right-knight.webp",
    },
    "black_left_bishop": {
        team: "black_team",
        pieceName: "bishop",
        imagePath: "./images/black-left-bishop.webp",
    },
    "black_right_bishop": {
        team: "black_team",
        pieceName: "bishop",
        imagePath: "./images/black-right-bishop.webp",
    },
    "black_queen": {
        team: "black_team",
        pieceName: "queen",
        imagePath: "./images/black-queen.webp",
    },
    "black_king": {
        team: "black_team",
        pieceName: "king",
        imagePath: "./images/black-king.webp",
    },
    "black_pawn": {
        team: "black_team",
        pieceName: "pawn",
        imagePath: "./images/black-pawn.webp",
    },
};
let playerInformation = JSON.parse(JSON.stringify(playerInformationJSON));
const boardPiecesJSON = {
    "7_1": {
        isActive: false,
        currentLocation: "7_1",
        pieceInfo: playerInformation["white_pawn"]
    },
    "7_2": {
        isActive: false,
        currentLocation: "7_2",
        pieceInfo: playerInformation["white_pawn"]
    },
    "7_3": {
        isActive: false,
        currentLocation: "7_3",
        pieceInfo: playerInformation["white_pawn"]
    },
    "7_4": {
        isActive: false,
        currentLocation: "7_4",
        pieceInfo: playerInformation["white_pawn"]
    },
    "7_5": {
        isActive: false,
        currentLocation: "7_5",
        pieceInfo: playerInformation["white_pawn"]
    },
    "7_6": {
        isActive: false,
        currentLocation: "7_6",
        pieceInfo: playerInformation["white_pawn"]
    },
    "7_7": {
        isActive: false,
        currentLocation: "7_7",
        pieceInfo: playerInformation["white_pawn"]
    },
    "7_8": {
        isActive: false,
        currentLocation: "7_8",
        pieceInfo: playerInformation["white_pawn"]
    },

    "8_1": {
        isActive: false,
        currentLocation: "8_1",
        pieceInfo: playerInformation["white_rook"]
    },
    "8_2": {
        isActive: false,
        currentLocation: "8_2",
        pieceInfo: playerInformation["white_left_knight"]
    },
    "8_3": {
        isActive: false,
        currentLocation: "8_3",
        pieceInfo: playerInformation["white_left_bishop"]
    },
    "8_4": {
        isActive: false,
        currentLocation: "8_4",
        pieceInfo: playerInformation["white_king"]
    },
    "8_5": {
        isActive: false,
        currentLocation: "8_5",
        pieceInfo: playerInformation["white_queen"]
    },
    "8_6": {
        isActive: false,
        currentLocation: "8_6",
        pieceInfo: playerInformation["white_right_bishop"]
    },
    "8_7": {
        isActive: false,
        currentLocation: "8_7",
        pieceInfo: playerInformation["white_right_knight"]
    },
    "8_8": {
        isActive: false,
        currentLocation: "8_8",
        pieceInfo: playerInformation["white_rook"]
    },

    "2_1": {
        isActive: false,
        currentLocation: "2_1",
        pieceInfo: playerInformation["black_pawn"]
    },
    "2_2": {
        isActive: false,
        currentLocation: "2_2",
        pieceInfo: playerInformation["black_pawn"]
    },
    "2_3": {
        isActive: false,
        currentLocation: "2_3",
        pieceInfo: playerInformation["black_pawn"]
    },
    "2_4": {
        isActive: false,
        currentLocation: "2_4",
        pieceInfo: playerInformation["black_pawn"]
    },
    "2_5": {
        isActive: false,
        currentLocation: "2_5",
        pieceInfo: playerInformation["black_pawn"]
    },
    "2_6": {
        isActive: false,
        currentLocation: "2_6",
        pieceInfo: playerInformation["black_pawn"]
    },
    "2_7": {
        isActive: false,
        currentLocation: "2_7",
        pieceInfo: playerInformation["black_pawn"]
    },
    "2_8": {
        isActive: false,
        currentLocation: "2_8",
        pieceInfo: playerInformation["black_pawn"]
    },

    "1_1": {
        isActive: false,
        currentLocation: "1_1",
        pieceInfo: playerInformation["black_rook"]
    },
    "1_2": {
        isActive: false,
        currentLocation: "1_2",
        pieceInfo: playerInformation["black_left_knight"]
    },
    "1_3": {
        isActive: false,
        currentLocation: "1_3",
        pieceInfo: playerInformation["black_left_bishop"]
    },
    "1_5": {
        isActive: false,
        currentLocation: "1_5",
        pieceInfo: playerInformation["black_king"]
    },
    "1_4": {
        isActive: false,
        currentLocation: "1_4",
        pieceInfo: playerInformation["black_queen"]
    },
    "1_6": {
        isActive: false,
        currentLocation: "1_6",
        pieceInfo: playerInformation["black_right_bishop"]
    },
    "1_7": {
        isActive: false,
        currentLocation: "1_7",
        pieceInfo: playerInformation["black_right_knight"]
    },
    "1_8": {
        isActive: false,
        currentLocation: "1_8",
        pieceInfo: playerInformation["black_rook"]
    },
}
let boardPieces = JSON.parse(JSON.stringify(boardPiecesJSON));

function resetBoardHandler() {
    playerInformation = JSON.parse(JSON.stringify(playerInformationJSON));
    boardPieces = JSON.parse(JSON.stringify(boardPiecesJSON));
    selectedPlayer = null;

    ChessBoardUI({ boardSize: 8, leftBoardContainer, rightBoardContainer, container: boardContainer });
}

const pieceMoves = {
    king: ["kingHandler"],
    queen: ["leftToRightHandler", "topToBottomHandler", "topLeftToBottomRightHandler", "topRightToBottomLeftHandler"],
    bishop: ["topLeftToBottomRightHandler", "topRightToBottomLeftHandler"],
    knight: ["knightHandler"],
    rook: ["leftToRightHandler", "topToBottomHandler"],
    pawn: ["pawnHandler"]
}
export {
    boardPieces, pieceMoves, playerInformation, resetBoardHandler, selectedPlayer, selectedPlayerHandler, whoIsPlaying,
    whoIsPlayingHandler
};

