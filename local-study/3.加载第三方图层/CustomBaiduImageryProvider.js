class CustomBaiduImageryProvider {
    constructor(options = {}) {
        // 使用正确的百度地图瓦片地址
        this._url = options.url; //"http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1";
        this._tileWidth = 256;
        this._tileHeight = 256;
        this._maximumLevel = 18;
        this._minimumLevel = 0;

        // 使用之前可以工作的投影参数
        let southwestInMeters = new Cesium.Cartesian2(-33554054, -33746824);
        let northeastInMeters = new Cesium.Cartesian2(33554054, 33746824);
        this._tilingScheme = new Cesium.WebMercatorTilingScheme({
            rectangleSouthwestInMeters: southwestInMeters,
            rectangleNortheastInMeters: northeastInMeters,
        });

        this._rectangle = this._tilingScheme.rectangle;
        this._credit = undefined;
        this._ready = true;
    }

    get url() {
        return this._url;
    }

    get tileWidth() {
        return this._tileWidth;
    }

    get tileHeight() {
        return this._tileHeight;
    }

    get maximumLevel() {
        return this._maximumLevel;
    }

    get minimumLevel() {
        return this._minimumLevel;
    }

    get tilingScheme() {
        return this._tilingScheme;
    }

    get rectangle() {
        return this._rectangle;
    }

    get credit() {
        return this._credit;
    }

    get ready() {
        return this._ready;
    }

    get hasAlphaChannel() {
        return true;
    }

    getTileCredits() {
        return [];
    }

    requestImage(x, y, level) {
        if (!this._ready) {
            throw new Cesium.DeveloperError("requestImage must not be called before the imagery provider is ready.");
        }

        const xTiles = this._tilingScheme.getNumberOfXTilesAtLevel(level);
        const yTiles = this._tilingScheme.getNumberOfYTilesAtLevel(level);

        let baiduX = Math.floor(x - xTiles / 2);
        let baiduY = Math.floor(yTiles / 2 - y - 1);

        let url = this._url
            .replace("{x}", baiduX)
            .replace("{y}", baiduY)
            .replace("{z}", level)
            .replace("{s}", Math.floor(Math.random() * 10));

        return Cesium.ImageryProvider.loadImage(this, url);
    }
}

export { CustomBaiduImageryProvider };
