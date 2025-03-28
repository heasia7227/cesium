const createPlane = (viewer) => {
    const position = Cesium.Cartesian3.fromDegrees(108.953364, 34.266161, 1000);

    const heading = Cesium.Math.toRadians(45); // 调整飞机的方位，默认值0，正值顺时针转，负值逆时针转
    const pitch = Cesium.Math.toRadians(20); // 调整飞机的仰角，默认值0，正值头部向上，负值头部向下
    const roll = Cesium.Math.toRadians(30); // 调整飞机的转向，默认值0，正值向左转，负值向右转
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    const planeEntity = viewer.entities.add({
        name: "plane",
        position: position,
        orientation: orientation,
        model: {
            uri: "./gltf/Cesium_Air.glb",
            minimumPixelSize: 128,
            maximumScale: 20000,
        },
    });

    return planeEntity;
};

export { createPlane };
