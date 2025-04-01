"use client";

import { useEffect } from "react";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

export default function Home() {
    useEffect(() => {
        initCesium();
    }, []);

    const initCesium = async () => {
        window.CESIUM_BASE_URL = "/Cesium";

        // 配置自己的Cesium token
        Cesium.Ion.defaultAccessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMGE1ZmU5OC01NGU2LTQyYmItYWUxMC1lZTU2YjdjOTBjZGYiLCJpZCI6Mjg4MTQxLCJpYXQiOjE3NDMwNDI5ODB9.QRrb8OkJQAHP1bXhD00vV9bPjSKlPwc20D71THdwnmY";

        // 初始化Cesium视窗
        const viewer = new Cesium.Viewer("cesiumContainer", {
            // 加载地形
            terrainProvider: await Cesium.createWorldTerrainAsync({
                requestVertexNormals: true, // 开启照明信息
                requestWaterMask: true, // 开启水波效果
            }),
        });

        // 摄像头飞行到目标区域
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(108.953364, 34.266161, 1000), // 摄像头的对准的目标坐标
            orientation: {
                // 摄像头目标方向
                heading: Cesium.Math.toRadians(0.0), // 方位角，地图沿着目标左右旋转，往左转正值，往右转负值，默认值 0
                pitch: Cesium.Math.toRadians(-90.0), // 俯仰角，0度是水平，往下看（怀里）是负值，网上看（抬头）是正值，默认值 -90
            },
        });
    };

    return <div id="cesiumContainer"></div>;
}
