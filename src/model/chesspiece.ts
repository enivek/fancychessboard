import { Color, Piece } from "../constants";
import { Coordinate } from "./coordinate";

export class ChessPiece {

    set coordinate(value: Coordinate) {
        this._coordinte = value;
    }

    get coordinate() {
        return this._coordinte;
    }

    get color() {
        return this._color;
    }

    get piece() {
        return this._piece;
    }
    private static maxId = 0;

    private _coordinte: Coordinate;
    private _color: Color;
    private _piece: Piece;
    private _id: number;

    public constructor(color: Color, piece: Piece, coordinate: Coordinate) {
        this._color = color;
        this._piece = piece;
        this._coordinte = coordinate;
        this._id = ChessPiece.maxId + 1;
        ChessPiece.maxId += 1;
    }

    get id(): string {
        return this._color + this._piece + this._id;
    }

    public getName(): string {
        return this._color + this._piece;
    }

}

export default ChessPiece;
