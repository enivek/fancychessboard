import { ChessBoard, ChessPiece } from "./model";
import { Coordinate } from "./common";
import * as chessjs from "chess.js";
import * as constants from "./constants";

export class Logic {

    public convertFenToChessBoard( fen: string ): ChessBoard {

        let chessboard = new ChessBoard();
        let chess = chessjs.Chess(fen);

        for ( let i = 0; i < constants.getAllRows().length; i++ ) {
            for ( let j = 0; j < constants.getAllColumns().length; j++ ) {
                let r = constants.getAllRows()[i];
                let c = constants.getAllColumns()[j];
                let s: chessjs.Square = <chessjs.Square>(r + c);
                let pieceOrNull: chessjs.Piece|null = chess.get(s);
                if ( pieceOrNull !== null ) {
                    let piece: chessjs.Piece = <chessjs.Piece> chess.get(s);
                    let color: string = <string> piece.color;
                    let type: string = <string> piece.type;
                    let knight = new ChessPiece(color, type, new Coordinate(r, c));
                    chessboard.listOfPieces.push(knight);
                }
            }
        }

        return chessboard;

    }

}
