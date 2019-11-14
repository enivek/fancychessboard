import { ChessPiece } from "./chesspiece";

export class ChessBoard {

    private _listOfPieces: Array<ChessPiece> = [];

    set listOfPieces(value: Array<ChessPiece>) {
        this._listOfPieces = value;
    }

    get listOfPieces() {
        return this._listOfPieces;
    }

}

export default ChessBoard;
