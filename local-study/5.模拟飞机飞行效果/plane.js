// 设置时间范围（示例为24小时）
const startTime = Cesium.JulianDate.now();

const createPlane = (viewer) => {
    const planeEntity = viewer.entities.add({
        name: "plane",
        position: Cesium.Cartesian3.fromDegrees(108.95, 34.26, 10000), // 西安
        model: {
            uri: "./gltf/Cesium_Air.glb",
            minimumPixelSize: 128,
            maximumScale: 20000,
        },
    });

    // 创建线路
    const positions = flightPath();

    // 飞行
    flighting(planeEntity, positions);

    // 显示飞行线路
    flightLinePath(viewer, positions);

    return planeEntity;
};

const flightPath = () => {
    const positions = [];
    const start = Cesium.Cartesian3.fromDegrees(108.95, 34.26, 10000); // 西安
    const end = Cesium.Cartesian3.fromDegrees(116.39, 39.9, 10000); // 北京

    // 生成插值点（实际项目应从数据源获取）
    for (let i = 0; i <= 1; i += 0.01) {
        positions.push(Cesium.Cartesian3.lerp(start, end, i, new Cesium.Cartesian3()));
    }
    return positions;
};

const flighting = (planeEntity, positions) => {
    const positionProperty = new Cesium.SampledPositionProperty();
    const orientationProperty = new Cesium.VelocityOrientationProperty(positionProperty);

    positions.forEach((pos, index) => {
        const time = Cesium.JulianDate.addSeconds(
            startTime,
            index * 10, // 每10秒一个点
            new Cesium.JulianDate()
        );
        positionProperty.addSample(time, pos);
    });

    // 绑定到实体
    planeEntity.position = positionProperty;
    planeEntity.orientation = orientationProperty;
};

const flightLinePath = (viewer, positions) => {
    viewer.entities.add({
        polyline: {
            positions: positions,
            width: 3,
            material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.2,
                color: Cesium.Color.CORNFLOWERBLUE,
            }),
            arcType: Cesium.ArcType.GEODESIC,
        },
    });
};

export { createPlane };
