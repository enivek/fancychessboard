export interface IWindow {

    FancyChessBoard: any;

    Image: {
        prototype: HTMLImageElement;
        new (): HTMLImageElement;
    };

    /**
     * Loads the main chessboard.
     */
    loadStart( callback: Function ): void;

}

export default IWindow;
