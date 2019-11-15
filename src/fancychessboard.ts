import { IWindow } from "./iwindow";
import { Color, Piece, Row } from "./constants";
import { ImageLoader } from "./imageloader";
import { ChessBoardView } from "./view";
import { ChessBoard, ChessPiece } from "./model";
import { Coordinate } from "./common";
import { FancyChessBoardConfig } from "./config";
import { Logic } from "./logic";

export class FancyChessBoard {

    private static _listOfInstances: { [key: string]: any; } = {};

    private readonly _colors: Array<Color> = [ Color.White, Color.Black ];
    private readonly _pieces: Array<Piece> = [ Piece.Bishop, Piece.King, Piece.Knight, Piece.Pawn, Piece.Queen, Piece.Rook ];
    private readonly _chessBoardView: ChessBoardView;
    private readonly _config: FancyChessBoardConfig;
    private _logic: Logic;

    public static windowReized(): void {
        for ( let containerId of Object.keys(FancyChessBoard._listOfInstances) ) {
            let fcb = FancyChessBoard._listOfInstances[containerId];
            fcb.responsiveResize();
        }
    }

    public static initialize( config: FancyChessBoardConfig ): FancyChessBoard {
        let fancyChessBoard = new FancyChessBoard(config);
        FancyChessBoard._listOfInstances[config.containerId] = fancyChessBoard;
        return fancyChessBoard;
    }

    public fen( fen: string ): void {
        this._logic = new Logic();
        let chessBoard = this._logic.convertFenToChessBoard(fen);
        this._chessBoardView.draw(chessBoard);
    }

    public responsiveResize(): void {
        this._chessBoardView.responsiveResize();
    }

    private constructor( config: FancyChessBoardConfig ) {
        this._config = config;
        this._chessBoardView = new ChessBoardView(config.containerId);
        this.loadAllPieces().then((_result) => {
            if (config.onAssetsLoaded) {
                config.onAssetsLoaded();
            }
        });
    }

    private async loadAllPieces(): Promise<void> {
        this._setChessBoardToLoad();
        this._setPiecesToLoad();
        await ImageLoader.loadAllImages();
    }

    private _setChessBoardToLoad(): void {
        let theme = "wood";
        let imagePath = this._config.assetRoot + "/chessboards/" + theme + ".png";
        ImageLoader.setImageToLoad("chessboard", imagePath);
    }

    private _setPiecesToLoad(): void {
        for ( let i = 0; i < this._colors.length; i++ ) {
            for ( let j = 0; j < this._pieces.length; j++ ) {
                let color = this._colors[i];
                let piece = this._pieces[j];
                let name = color + piece;
                let imagePath = this._config.assetRoot + "/pieces/wikipedia/" + name + ".png";
                ImageLoader.setImageToLoad(name, imagePath);
            }
        }
    }

}

export default FancyChessBoard;

// ==================================================================
// External Window Load Events
// ==================================================================

let wnd = <IWindow><any>window;
wnd.FancyChessBoard = FancyChessBoard;
wnd.FancyChessBoardConfig = FancyChessBoardConfig;
window.addEventListener("resize", FancyChessBoard.windowReized);
