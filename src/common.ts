export class Point {

    private _x: number;
    private _y: number;

    constructor( x: number, y: number ) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

}

export class Coordinate {

    private _row: string;
    private _col: number;

    constructor( row: string, col: number ) {
        this._row = row;
        this._col = col;

        if ( !row ) {
            this._row = "";
        }
        if ( !col ) {
            this._col = 0;
        }
    }

    get col() {
        return this._col;
    }

    get row() {
        return this._row;
    }

    public isValid(): boolean {
        if ( this._col < 1 || this._col > 8 ) {
            return false;
        }
        if ( this._row.charCodeAt(0) < "A".charCodeAt(0) || this._row.charCodeAt(0) > "H".charCodeAt(0) ) {
            return false;
        }
        return true;
    }

}
