"use client";

import { useEffect, useMemo, useState } from "react";
import GUI from "lil-gui";
import * as Cesium from "cesium";
import { CreateViewer } from "@/config/cesium";

const myObject = {
    flighting: false,
};

const CesiumPlane = () => {
    const [guiConfig, setGuiConfig] = useState<any>(myObject);
    const [airplaneEntity, setAirplaneEntity] = useState<Cesium.Entity>();
    const [cesiumViewer, setCesiumViewer] = useState<Cesium.Viewer>();
    const [flightingTimer, setFlightingTimer] = useState<boolean>(false);

    useEffect(() => {
        createGui();
        createPlane();
    }, []);

    useEffect(() => {
        // 飞行时间轴没有创建，但需要起飞
        if (guiConfig.flighting && airplaneEntity && cesiumViewer && !flightingTimer) {
            flighting(airplaneEntity, positions);
            setFlightingTimer(true);

            // 实时更新相机位置（在原有代码基础上修改）
            cesiumViewer.scene.postUpdate.addEventListener(() => {
                const currentTime = cesiumViewer.clock.currentTime;
                // 获取飞机当前状态
                const position = airplaneEntity?.position?.getValue(currentTime);
                if (!position) return;

                cameraPosition(cesiumViewer, position);
            });
        } else if (guiConfig.flighting && airplaneEntity && cesiumViewer && flightingTimer) {
            // 飞行时间轴已经创建，接着飞行
            cesiumViewer.clock.shouldAnimate = true;
        } else if (!guiConfig.flighting && airplaneEntity && cesiumViewer && flightingTimer) {
            // 飞行时间轴已经创建，暂停飞行
            cesiumViewer.clock.shouldAnimate = false;
            Cesium.JulianDate.clone(cesiumViewer.clock.currentTime);
        }
    }, [guiConfig.flighting]);

    const createGui = () => {
        const gui = new GUI();
        gui.add(myObject, "flighting")
            .name("飞行")
            .onChange((value: boolean) => {
                setGuiConfig((prev: any) => ({ ...prev, flighting: value }));
            });
    };

    const createPlane = async () => {
        const viewer = await CreateViewer("cesiumContainer");
        setCesiumViewer(viewer);

        const planeBeginningPosition = Cesium.Cartesian3.fromDegrees(108.748057, 34.438544, 0);

        const planeEntity = viewer.entities.add({
            name: "plane",
            position: planeBeginningPosition, // 西安
            model: {
                uri: "/gltf/Cesium_Air.glb",
                minimumPixelSize: 128,
                maximumScale: 20000,
            },
        });
        cameraPosition(viewer, planeBeginningPosition);

        setAirplaneEntity(planeEntity);

        // 显示飞行线路
        flightLinePath(viewer, positions);
    };

    const flightPath = () => {
        const positions: Cesium.Cartesian3[] = [];
        // 模拟起飞位置信息
        positions.push(Cesium.Cartesian3.fromDegrees(108.748057, 34.438544, 0));
        positions.push(Cesium.Cartesian3.fromDegrees(108.781375, 34.458782, 500));

        // 模拟平流层位置信息
        const start = Cesium.Cartesian3.fromDegrees(108.911771, 34.552463, 10000); // 西安
        const end = Cesium.Cartesian3.fromDegrees(116.520017, 39.968569, 10000); // 北京
        // 生成插值点（实际项目应从数据源获取）
        for (let i = 0; i <= 1; i += 0.01) {
            positions.push(Cesium.Cartesian3.lerp(start, end, i, new Cesium.Cartesian3()));
        }

        // 模拟飞机降落信息
        positions.push(Cesium.Cartesian3.fromDegrees(116.61893, 40.051592, 500));
        positions.push(Cesium.Cartesian3.fromDegrees(116.61524, 40.08739, 0));

        return positions;
    };

    const flighting = (planeEntity: Cesium.Entity, positions: Cesium.Cartesian3[]) => {
        const startTime = Cesium.JulianDate.now();

        const positionProperty = new Cesium.SampledPositionProperty();
        const orientationProperty = new Cesium.VelocityOrientationProperty(positionProperty);

        positions.forEach((pos, index) => {
            let time;
            if (index === 1 || positions.length - 2 === index) {
                time = Cesium.JulianDate.addSeconds(
                    startTime,
                    index * 2, // 每5秒一个点
                    new Cesium.JulianDate()
                );
            } else {
                time = Cesium.JulianDate.addSeconds(
                    startTime,
                    index * 10, // 每10秒一个点
                    new Cesium.JulianDate()
                );
            }
            positionProperty.addSample(time, pos);
        });

        // 绑定到实体
        planeEntity.position = positionProperty;
        planeEntity.orientation = orientationProperty;
    };

    const flightLinePath = (viewer: Cesium.Viewer, positions: Cesium.Cartesian3[]) => {
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

    const cameraPosition = (viewer: Cesium.Viewer, planeCartesian3: Cesium.Cartesian3) => {
        const planePosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(planeCartesian3);

        const planeLongitude = Cesium.Math.toDegrees(planePosition.longitude);
        const planeLatitude = Cesium.Math.toDegrees(planePosition.latitude);

        const cameraPosition = Cesium.Cartesian3.fromDegrees(
            planeLongitude + 0.05,
            planeLatitude - 0.05,
            planePosition.height + 10000
        );

        const heading = Cesium.Math.toRadians(0);
        const pitch = Cesium.Math.toRadians(-60.0);
        const range = 10000;

        // 设置相机位置和朝向
        viewer.camera.lookAt(cameraPosition, new Cesium.HeadingPitchRange(heading, pitch, range));
    };

    const positions = useMemo(() => flightPath(), []);

    return (
        <>
            <div id="cesiumContainer" className="h-full w-full"></div>
        </>
    );
};

export default CesiumPlane;
