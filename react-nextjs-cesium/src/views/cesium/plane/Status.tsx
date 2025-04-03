"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import _ from "lodash";

interface IProps {
    show: boolean;
}

const PlaneStatus = ({ show }: IProps) => {
    const [scene3D, setScene3D] = useState<THREE.Scene>();
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        displayPlaneStatus();
    }, []);

    useEffect(() => {
        if (show && scene3D) {
            testException();
        }
    }, [scene3D, show]);

    const displayPlaneStatus = () => {
        let mixer: THREE.AnimationMixer; // 动画混合器
        const clock = new THREE.Clock();

        const container = document.getElementById("planeStatusContainer");
        const width = container?.clientWidth || 300;
        const height = container?.clientHeight || 300;

        // 3D场景
        const scene = new THREE.Scene();
        setScene3D(scene);

        // 环境光
        const ambient = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambient);

        // GLTF加载器
        const loader = new GLTFLoader();
        loader.load("/gltf/Cesium_Air.glb", function (gltf) {
            const model = gltf.scene;
            scene.add(model);

            model.traverse((item: any) => {
                if (item.isMesh) {
                    item.material = new THREE.MeshLambertMaterial({
                        color: 0x00ff00,
                        transparent: true,
                        opacity: 0.5,
                    });
                }
            });

            // 获取动画数据
            const animations = gltf.animations;

            // 初始化动画混合器
            mixer = new THREE.AnimationMixer(model);

            // 播放所有动画（假设模型有动画）
            animations.forEach((clip) => {
                const action = mixer.clipAction(clip);
                action.play();
            });
        });

        // 透视相机
        const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 8000);
        // 设置相机位置
        camera.position.set(30, 15, 30);
        // 设置相机观察点或对象
        camera.lookAt(0, 0, 0);

        // 渲染器
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        renderer.setSize(width, height);
        renderer.render(scene, camera);
        renderer.setClearColor(0x000000, 0.7);
        renderer.outputColorSpace = THREE.SRGBColorSpace; //设置为SRGB颜色空间
        renderer.setAnimationLoop(animate);
        renderer.setPixelRatio(window.devicePixelRatio);
        container?.appendChild(renderer.domElement);

        // 设置相机控件轨道控制器OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);

        function animate() {
            renderer.render(scene, camera);
            const planeModel = scene.getObjectByName("Scene");
            planeModel?.rotateY(-0.005);

            // 计算时间差
            const delta = clock.getDelta();
            // 更新动画混合器
            if (mixer) mixer.update(delta);
        }
    };

    const testException = () => {
        _.delay(() => {
            const planePart = scene3D?.getObjectByName("Prop__2_");
            planePart?.traverse((item: any) => {
                item.material = new THREE.MeshLambertMaterial({
                    color: 0xff0000,
                    transparent: true,
                    opacity: 0.5,
                });
            });
            setErrorMessage("左侧发动机故障！");
        }, 5000);
    };

    return (
        <>
            <div
                id="planeStatusContainer"
                className="absolute w-[300px] h-[300px] top-[60px] right-1 z-[1000]"
                style={{ display: show ? "" : "none" }}
            ></div>
            {errorMessage && (
                <span
                    className="absolute top-[60px] right-1 z-[1001] text-red-500"
                    style={{ display: show ? "" : "none" }}
                >
                    {errorMessage}
                </span>
            )}
        </>
    );
};

export default PlaneStatus;
