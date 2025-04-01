"use client";

import { Modal, Space } from "antd";
import { useRouter } from "next/navigation";
import { LogoutOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const Header = () => {
    const router = useRouter();
    const [modal, contextHolder] = Modal.useModal();

    const onLogout = async () => {
        modal.confirm({
            title: "确认登出？",
            icon: <ExclamationCircleOutlined />,
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
                router.push("/");
            },
        });
    };

    return (
        <>
            {contextHolder}
            <div className="h-[56px] leading-[56px] border-b-[1px] border-slate-200 px-3 flex justify-between">
                <div className="flex items-center gap-2">3D Learn</div>
                <div className="cursor-pointer" onClick={onLogout}>
                    <Space>
                        <LogoutOutlined />
                        登出
                    </Space>
                </div>
            </div>
        </>
    );
};

export default Header;
