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

export class FancyChessBoardConfig {

    private _assetRoot = "../assets";
    private _onAssetsLoaded: Function;
    private _containerId: string;

    constructor( containerId: string ) {
        if ( !containerId ) {
            throw new Error("No container id");
        } else {
            this._containerId = containerId;
        }
    }

    set assetRoot(value: string) {
        this._assetRoot = value;
    }

    get assetRoot() {
        return this._assetRoot;
    }

    get containerId() {
        return this._containerId;
    }

    set onAssetsLoaded(value: Function) {
        this._onAssetsLoaded = value;
    }

    get onAssetsLoaded() {
        return this._onAssetsLoaded;
    }

}

