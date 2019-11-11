import Konva from "konva";
import ChessBoardConfig from "./chessboardviewconfig";
import ChessPiece from "./chesspieceentity";

export class ChessPiecesLayer extends Konva.Layer {

    public addPiece(piece: ChessPiece): void {
        this.add(piece.image);
    }

}

export default ChessPiecesLayer;
