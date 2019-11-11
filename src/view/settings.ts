export class Settings {

    private _assetRoot = "";

    set assetRoot(value: string) {
        this._assetRoot = value;
    }

    get assetRoot() {
        return this._assetRoot;
    }

}

export default Settings;
