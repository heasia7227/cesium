"use client";

import { useState } from "react";
import { Menu } from "antd";
import { GlobalOutlined, CodeSandboxOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const menus = [
    {
        key: "cesium",
        label: "Cesium",
        icon: <GlobalOutlined />,
        children: [
            {
                key: "plane",
                label: "飞机",
                path: "/cesium/plane",
            },
        ],
    },
    {
        key: "threejs",
        label: "Three.js",
        icon: <CodeSandboxOutlined />,
    },
];

const Menus = () => {
    const router = useRouter();
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const onSelect = (values: any) => {
        setSelectedKeys(values.selectedKeys);
        const path = values.item.props.path;
        path && router.push(path);
    };

    return (
        <>
            <Menu
                mode="inline"
                selectedKeys={selectedKeys}
                onSelect={onSelect}
                items={menus}
                className="h-full overflow-y-hidden hover:overflow-y-auto"
            />
        </>
    );
};

export default Menus;
