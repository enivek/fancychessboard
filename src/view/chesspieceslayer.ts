import Konva from "konva";
import ChessBoardConfig from "./chessboardviewconfig";
import ChessPieceView from "./chesspieceview";

export class ChessPiecesLayer extends Konva.Layer {

    public addPiece(piece: ChessPieceView): void {
        this.add(piece.image);
    }

}

export default ChessPiecesLayer;
