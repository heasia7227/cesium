"use client";

import { useEffect } from "react";
import { ConfigProvider } from "antd";
import * as Cesium from "cesium";
import zhCN from "antd/locale/zh_CN";
import "cesium/Build/Cesium/Widgets/widgets.css";

interface IProps {
    children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
    useEffect(() => {
        window.CESIUM_BASE_URL = "/Cesium";

        Cesium.Ion.defaultAccessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMGE1ZmU5OC01NGU2LTQyYmItYWUxMC1lZTU2YjdjOTBjZGYiLCJpZCI6Mjg4MTQxLCJpYXQiOjE3NDMwNDI5ODB9.QRrb8OkJQAHP1bXhD00vV9bPjSKlPwc20D71THdwnmY";
    }, []);

    return (
        <ConfigProvider
            locale={zhCN}
            theme={{
                token: {
                    // Seed Token，影响范围大
                    // colorPrimary: "#00b96b",
                    // borderRadius: 2,
                    // 派生变量，影响范围小
                    // colorBgContainer: "#f6ffed",
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default Layout;
