import Konva from "konva";
import { ImageLoader } from "./imageloader";

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

export default ChessBoardLayer;
