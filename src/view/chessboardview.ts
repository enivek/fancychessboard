import Konva from "konva";
import { ChessBoardViewConfig } from "./chessboardviewconfig";
import { ChessBoardLayer } from "./chessboardlayer";
import { ChessPiecesLayer } from "./chesspieceslayer";
import { ChessPieceEntity } from "./chesspieceentity";
import { Color, Piece } from "../constants";

export class ChessBoardView {

    private _stage: Konva.Stage;
    private _config: ChessBoardViewConfig;
    private _chessBoardLayer: ChessBoardLayer = new ChessBoardLayer();
    private _chessPiecesLayer: ChessPiecesLayer = new ChessPiecesLayer();

    public constructor(containerId: string) {

        this._config = new ChessBoardViewConfig(containerId);
        this._stage = new Konva.Stage(this._config);
        this.resizeStage(this._stage);

        this._stage.on("dragend", function(e) {
            console.log("Target: " + e.target);
        });

    }

    public draw(): void {

        this._chessBoardLayer.drawIt();

        let knight = new ChessPieceEntity( Color.White, Piece.Knight );
        this._chessPiecesLayer.addPiece(knight);

        this._stage.add( this._chessBoardLayer );
        this._stage.add( this._chessPiecesLayer );

        this._stage.draw();

    }

    public responsiveResize(): void {
        this.resizeStage(this._stage);
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

export default ChessBoardView;
