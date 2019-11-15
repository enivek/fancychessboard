import Konva from "konva";
import { ChessBoardViewConfig } from "./config";
import { ChessBoardLayer, ChessPiecesLayer } from "./layer";
import { ChessPiece, ChessBoard } from "./model";
import { Coordinate, Point } from "./common";
import { ImageLoader } from "./imageloader";

export class ChessBoardView {

    private _stage: Konva.Stage;
    private _config: ChessBoardViewConfig;
    private _chessBoardLayer: ChessBoardLayer = new ChessBoardLayer();
    private _chessPiecesLayer: ChessPiecesLayer = new ChessPiecesLayer();
    private _nameToChessPieceViewMap: { [key: string]: ChessPieceView; } = {};

    public constructor(containerId: string) {

        this._config = new ChessBoardViewConfig(containerId);
        this._stage = new Konva.Stage(this._config);
        this.resizeStage(this._stage);

        let self = this;
        this._stage.on("dragend", function(_event) {
            let target = _event.target;
            self.snapChessPieceToBoard(target);
        });

        this._stage.on("click", function(_event) {
            let target = _event.target;
            console.log("Clicked: " + target);
        });

    }

    public draw( chessBoard: ChessBoard ): void {

        // Add pieces
        for ( let i = 0; i < chessBoard.listOfPieces.length; i++ ) {
            let chessPiece = chessBoard.listOfPieces[i];
            let chessPieceView = new ChessPieceView(chessPiece);
            this._nameToChessPieceViewMap[chessPiece.id] = chessPieceView;
            this._chessPiecesLayer.addPiece(chessPieceView);
            let point = this.convertCoordinateToPoint(chessPiece.coordinate);
            chessPieceView.setPosition(point);
        }

        // Add background image
        this._chessBoardLayer.addBackgroundImage();

        // Add layers
        this._stage.add( this._chessBoardLayer );
        this._stage.add( this._chessPiecesLayer );

        // Draw
        this._stage.draw();

    }

    public responsiveResize(): void {
        this.resizeStage(this._stage);
    }

    /**
     * User finished dragging a chess piece.
     * @param target
     */
    private snapChessPieceToBoard( target: any ) {
        let id: string = target.attrs.name;
        let chessPieceView: ChessPieceView = this._nameToChessPieceViewMap[id];
        let lastPosition = target._lastPos;
        let coordinate = this.convertPointToCoordinate(new Point(lastPosition.x, lastPosition.y));
        if ( coordinate.isValid() ) {
            let point = this.convertCoordinateToPoint(coordinate);
            chessPieceView.chessPiece.coordinate = coordinate;
            chessPieceView.setPosition(point);
        } else {
            let point = this.convertCoordinateToPoint(chessPieceView.chessPiece.coordinate);
            chessPieceView.setPosition(point);
        }
        this._chessPiecesLayer.draw();
    }

    private convertCoordinateToPoint(coordinate: Coordinate): Point {
        let rowInt = (coordinate.row.charCodeAt(0) - 97);
        let colInt = 8 - coordinate.col;
        let rowConvert = rowInt * 80;
        let colConvert = colInt * 80;
        return new Point(rowConvert, colConvert);
    }

    private convertPointToCoordinate(point: Point): Coordinate {
        let width = this._config.getSize();
        let scale = width / ChessBoardViewConfig.canvasSize;

        let r = Math.round((point.x / scale) / 80) + 97;
        let c = 8 - Math.round((point.y / scale) / 80);
        let rowConvert = String.fromCharCode(r);
        let colConvert = c;

        return new Coordinate(rowConvert, colConvert);
    }

    private resizeStage( stage: Konva.Stage ) {
        let width = this._config.getSize();
        let height = this._config.getSize();
        let scale = width / ChessBoardViewConfig.canvasSize;

        stage.width(width);
        stage.height(height);
        stage.scale({ x: scale, y: scale });
        stage.draw();
    }

}

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

