import logger = require("fancy-log");

export class ImageLoader {

    private static _intervalInMilliseconds = 100;
    private static _timeoutInMilliseconds = 10000;
    private static _nameToImageMap: { [key: string]: any; } = {};

    public static setImageToLoad( name: string, imagePath: string ) {
        let imageObj = new Image();
        imageObj.src = imagePath;
        this._nameToImageMap[name] = imageObj;
    }

    public static loadAllImages(): Promise<boolean> {
        return new Promise((resolve, reject) => {

            try {
                let startTime = new Date();
                let handle = setInterval( () => {
                    if ( handle > 0 ) {
                        let loaded = true;
                        for ( let name of Object.keys(ImageLoader._nameToImageMap) ) {
                            let img = ImageLoader._nameToImageMap[name];
                            if ( img.naturalWidth === 0 ) {
                                loaded = false;
                                break;
                            }
                        }

                        if ( loaded ) {
                            resolve();
                            clearInterval(handle);
                            handle = 0;
                        } else {
                            let currentTime = new Date();
                            let timeWait = currentTime.getTime() - startTime.getTime();
                            if ( timeWait > ImageLoader._timeoutInMilliseconds ) {
                                reject();
                                clearInterval(handle);
                                handle = 0;
                            }
                        }
                    }
                }, ImageLoader._intervalInMilliseconds );
            } catch ( error ) {
                console.error("Image Loader: Error: " + error);
                reject();
            }
        });
    }

    public static getImage(name: string): any {
        return ImageLoader._nameToImageMap[name];
    }

}

export default ImageLoader;
