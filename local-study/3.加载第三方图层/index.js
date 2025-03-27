import { CustomBaiduImageryProvider } from "./CustomBaiduImageryProvider.js";

// 配置自己的Cesium token
Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMGE1ZmU5OC01NGU2LTQyYmItYWUxMC1lZTU2YjdjOTBjZGYiLCJpZCI6Mjg4MTQxLCJpYXQiOjE3NDMwNDI5ODB9.QRrb8OkJQAHP1bXhD00vV9bPjSKlPwc20D71THdwnmY";

// 初始化Cesium视窗
const viewer = new Cesium.Viewer("cesiumContainer", {
    geocoder: false, // 右上角，隐藏查找控件
    homeButton: false, // 右上角，隐藏 Home Icon
    sceneModePicker: false, // 右上角，隐藏视角选择器，球、平面、梯形
    baseLayerPicker: false, // 右上角，隐藏图层选择器
    navigationHelpButton: false, // 右上角，隐藏帮助按钮
    animation: false, // 左下角，隐藏动画控制器
    timeline: false, // 底部，隐藏时间线
    fullscreenButton: false, // 右下角，隐藏全屏按钮
    imageryProvider: false, // 加载其他第三方地图时，需要关闭默认图层
    // 加载地形
    terrainProvider: await Cesium.createWorldTerrainAsync({
        requestVertexNormals: true, // 开启照明信息
        requestWaterMask: true, // 开启水波效果
    }),
});

// 底部，隐藏版权信息
viewer.cesiumWidget.creditContainer.style.display = "none";

// 高德矢量地图
// const gaodeVector = new Cesium.UrlTemplateImageryProvider({
//     url: "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
//     name: "高德矢量地图",
// });
// viewer.imageryLayers.addImageryProvider(gaodeVector);

// 高德影像地图
// const gaodeImage = new Cesium.UrlTemplateImageryProvider({
//     url: "https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
//     name: "高德影像地图",
// });
// viewer.imageryLayers.addImageryProvider(gaodeImage);

// 百度矢量地图
const baiduVector = new CustomBaiduImageryProvider({
    url: "http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1",
});
viewer.imageryLayers.addImageryProvider(baiduVector);

// 腾讯矢量地图
// const tencentVector = new Cesium.UrlTemplateImageryProvider({
//     url: "https://rt3.map.gtimg.com/tile?z={z}&x={x}&y={reverseY}&styleid=1&version=297",
//     customTags: {
//         sx: function (imageryProvider, x, y, level) {
//             return x >> 4;
//         },
//         sy: function (imageryProvider, x, y, level) {
//             return ((1 << level) - y) >> 4;
//         },
//     },
//     name: "腾讯矢量地图",
// });
// viewer.imageryLayers.addImageryProvider(tencentVector);

// 腾讯影像地图
// const tencentImage = new Cesium.UrlTemplateImageryProvider({
//     url: "https://p2.map.gtimg.com/sateTiles/{z}/{sx}/{sy}/{x}_{reverseY}.jpg?version=400",
//     customTags: {
//         sx: function (imageryProvider, x, y, level) {
//             return x >> 4;
//         },
//         sy: function (imageryProvider, x, y, level) {
//             return ((1 << level) - y) >> 4;
//         },
//     },
//     name: "腾讯影像地图",
// });
// viewer.imageryLayers.addImageryProvider(tencentImage);

// ArcGIS 矢量地图
// const arcGISVector = new Cesium.WebMapTileServiceImageryProvider({
//     url: "https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/WMTS",
//     layer: "World_Imagery",
//     style: "default",
//     format: "image/jpeg",
//     tileMatrixSetID: "GoogleMapsCompatible",
//     maximumLevel: 19,
//     credit: new Cesium.Credit("© Esri", "https://www.esri.com/"),
// });
// viewer.imageryLayers.addImageryProvider(arcGISVector);

// ArcGIS 影像地图
// const arcGISImage = new Cesium.WebMapTileServiceImageryProvider({
//     url: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS",
//     layer: "World_Imagery",
//     style: "default",
//     format: "image/jpeg",
//     tileMatrixSetID: "GoogleMapsCompatible",
//     maximumLevel: 19,
//     credit: new Cesium.Credit("© Esri", "https://www.esri.com/"),
// });
// viewer.imageryLayers.addImageryProvider(arcGISImage);

// 天地图矢量地图
// const tiandituVector = new Cesium.WebMapTileServiceImageryProvider({
//     url: "http://t0.tianditu.gov.cn/vec_w/wmts?tk=25129831bd91c81af49d3ecf578f6b3c",
//     layer: "img",
//     style: "default",
//     format: "tiles",
//     tileMatrixSetID: "w",
//     maximumLevel: 18,
//     credit: new Cesium.Credit("© Tianditu", "http://www.tianditu.gov.cn/"),
//     name: "天地图矢量地图",
// });
// viewer.imageryLayers.addImageryProvider(tiandituVector);

// 天地图影像地图
// const tiandituImage = new Cesium.WebMapTileServiceImageryProvider({
//     url: "http://t0.tianditu.gov.cn/img_w/wmts?tk=25129831bd91c81af49d3ecf578f6b3c",
//     layer: "img",
//     style: "default",
//     format: "tiles",
//     tileMatrixSetID: "w",
//     maximumLevel: 18,
//     credit: new Cesium.Credit("© Tianditu", "http://www.tianditu.gov.cn/"),
//     name: "天地图影像地图",
// });
// viewer.imageryLayers.addImageryProvider(tiandituImage);

// 摄像头飞行到目标区域
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(108.953364, 34.266161, 1000), // 摄像头的对准的目标坐标
    orientation: {
        // 摄像头目标方向
        heading: Cesium.Math.toRadians(0.0), // 方位角，地图沿着目标左右旋转，往左转正值，往右转负值，默认值 0
        pitch: Cesium.Math.toRadians(-90.0), // 俯仰角，0度是水平，往下看（怀里）是负值，网上看（抬头）是正值，默认值 -90
    },
});
