import Konva from "konva";

export class ChessBoardViewConfig implements Konva.ContainerConfig {

    public static readonly canvasSize: number = 640;

    public container: string;
    public width = 0;
    public height = 0;

    private _containerObject: HTMLElement;

    constructor( containerId: string ) {
        this.container = containerId;
        this._containerObject = (<HTMLElement>document.getElementById(containerId));
    }

    public getAbsoluteSize(): number {
        let containerWidth = this._containerObject.offsetWidth;
        return containerWidth;
    }

    public getScale(): number {
        let size = this.getAbsoluteSize();
        return size / ChessBoardViewConfig.canvasSize;
    }

    public getSize(): number {
        let size = this.getAbsoluteSize();
        return size * this.getScale();
    }

}

console.log("Chessboard config");

export default ChessBoardViewConfig;
