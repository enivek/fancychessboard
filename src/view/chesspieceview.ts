import Konva from "konva";
import { Color, Piece } from "../constants";
import { ImageLoader } from "./imageloader";
import { ChessPiece } from "../model/chesspiece";
import { Point } from "./point";

export class ChessPieceView {

    private _konvaImage: any;
    private _chessPiece: ChessPiece;

    constructor(chessPiece: ChessPiece) {
        this._chessPiece = chessPiece;
        let name = this._chessPiece.getName();
        let imageProperty = {
            draggable: true,
            height: 80,
            image: ImageLoader.getImage(name),
            width: 80,
            x: 0,
            y: 0
        };
        this._konvaImage = new Konva.Image(imageProperty);
        this._konvaImage.setName(chessPiece.id);
    }

    get chessPiece() {
        return this._chessPiece;
    }

    get image() {
        return this._konvaImage;
    }

    public setPosition(position: Point) {
        this._konvaImage.position( {x: position.x, y: position.y} );
    }

}

export default ChessPieceView;
