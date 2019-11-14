import { IWindow } from "./iwindow";
import { Settings } from "./view/settings";
import { Color, Piece, Row } from "./constants";
import { ImageLoader } from "./view/imageloader";
import { ChessBoardView } from "./view/chessboardview";
import { ChessBoard } from "./model/chessboard";
import { ChessPiece } from "./model/chesspiece";
import Coordinate from "./model/coordinate";

export class FancyChessBoard {
    private static _listOfInstances: { [key: string]: any; } = {};

    private readonly _colors: Array<Color> = [ Color.White, Color.Black ];
    private readonly _pieces: Array<Piece> = [ Piece.Bishop, Piece.King, Piece.Knight, Piece.Pawn, Piece.Queen, Piece.Rook ];
    private readonly _chessBoardView: ChessBoardView;
    private _settings: Settings = new Settings();

    public static windowReized(): void {
        for ( let containerId of Object.keys(FancyChessBoard._listOfInstances) ) {
            let fcb = FancyChessBoard._listOfInstances[containerId];
            fcb.responsiveResize();
        }
    }

    public static initialize( containerId: string, assetsHost: string, callBack: Function ): FancyChessBoard {
        let fancyChessBoard = new FancyChessBoard(containerId, assetsHost, callBack);
        FancyChessBoard._listOfInstances[containerId] = fancyChessBoard;
        return fancyChessBoard;
    }

    public fen(): void {
        let chessBoard = new ChessBoard();
        let knight = new ChessPiece(Color.White, Piece.King, new Coordinate("H", 8));
        chessBoard.listOfPieces.push(knight);
        this._chessBoardView.draw(chessBoard);
    }

    public responsiveResize(): void {
        this._chessBoardView.responsiveResize();
    }

    private constructor( containerId: string, assetsRoot: string, callBack: Function ) {
        this._settings.assetRoot = assetsRoot;
        this._chessBoardView = new ChessBoardView(containerId);
        this.loadAllPieces().then((_result) => {
            if (callBack) {
                callBack();
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
        let imagePath = this._settings.assetRoot + "/chessboards/" + theme + ".png";
        ImageLoader.setImageToLoad("chessboard", imagePath);
    }

    private _setPiecesToLoad(): void {
        for ( let i = 0; i < this._colors.length; i++ ) {
            for ( let j = 0; j < this._pieces.length; j++ ) {
                let color = this._colors[i];
                let piece = this._pieces[j];
                let name = color + piece;
                let imagePath = this._settings.assetRoot + "/pieces/wikipedia/" + name + ".png";
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
window.addEventListener("resize", FancyChessBoard.windowReized);
