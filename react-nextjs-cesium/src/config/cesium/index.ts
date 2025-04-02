import * as Cesium from "cesium";

const CreateViewer = async (cesiumContainer: string) => {
    // 初始化Cesium视窗
    const viewer = new Cesium.Viewer(cesiumContainer, {
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
            requestVertexNormals: true, // 照明信息
            requestWaterMask: true, // 水波效果
        }),

        shouldAnimate: true, // 开启动画，GLTF中的动画会播放
    } as any);

    // 底部，隐藏版权信息
    (viewer.cesiumWidget.creditContainer as any).style.display = "none";

    // 高德影像地图
    const gaodeImage = new Cesium.UrlTemplateImageryProvider({
        url: "https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    });
    viewer.imageryLayers.addImageryProvider(gaodeImage);

    // 高德矢量地图
    // const gaodeVector = new Cesium.UrlTemplateImageryProvider({
    //     url: "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    // });
    // viewer.imageryLayers.addImageryProvider(gaodeVector);

    return viewer;
};

export { CreateViewer };
