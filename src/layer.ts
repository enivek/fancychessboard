import Konva from "konva";
import { ImageLoader } from "./imageloader";
import { ChessPieceView } from "./view";

export class ChessBoardLayer extends Konva.Layer {

    public addBackgroundImage(): void {
        let imageProperty = {
            draggable: false,
            height: 640,
            image: ImageLoader.getImage("chessboard"),
            width: 640,
            x: 0,
            y: 0
        };
        let konvaImage = new Konva.Image(imageProperty);
        this.add(konvaImage);
    }

}

export class ChessPiecesLayer extends Konva.Layer {

    public addPiece(piece: ChessPieceView): void {
        this.add(piece.image);
    }

}
