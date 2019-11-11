import Konva from "konva";
import { Color, Piece } from "../constants";
import ImageLoader from "./imageloader";

export class ChessPieceEntity {

    private _konvaImage: any;
    private _color: Color;
    private _piece: Piece;

    constructor(color: Color, piece: Piece) {
        this._color = color;
        this._piece = piece;
        let name = this._color + this._piece;
        let imageProperty = {
            draggable: true,
            height: 80,
            image: ImageLoader.getImage(name),
            width: 80,
            x: 0,
            y: 0
        };
        this._konvaImage = new Konva.Image(imageProperty);
        this._konvaImage.addName("ASD");
    }

    get image() {
        return this._konvaImage;
    }

}

export default ChessPieceEntity;
