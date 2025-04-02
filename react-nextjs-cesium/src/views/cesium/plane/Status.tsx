"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface IProps {
    show: boolean;
}

const PlaneStatus = ({ show }: IProps) => {
    useEffect(() => {
        displayPlaneStatus();
    }, []);

    const displayPlaneStatus = () => {
        let mixer: THREE.AnimationMixer; // 动画混合器
        const clock = new THREE.Clock();

        const container = document.getElementById("planeStatusContainer");
        const width = container?.clientWidth || 300;
        const height = container?.clientHeight || 300;

        // 3D场景
        const scene = new THREE.Scene();

        // 环境光
        const ambient = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambient);

        // GLTF加载器
        const loader = new GLTFLoader();
        loader.load("/gltf/Cesium_Air.glb", function (gltf) {
            const model = gltf.scene;
            scene.add(model);

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

    return (
        <>
            <div
                id="planeStatusContainer"
                className="absolute w-[300px] h-[300px] top-[60px] right-1 z-[1000]"
                style={{ display: show ? "" : "none" }}
            ></div>
        </>
    );
};

export default PlaneStatus;
