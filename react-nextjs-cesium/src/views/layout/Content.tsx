"use client";

import { Card } from "antd";
import Menus from "./Menus";

interface IProps {
    children: React.ReactNode;
}

const Content = ({ children }: IProps) => {
    return (
        <>
            <div className="flex bg-slate-200 h-[calc(100vh-56px)]">
                <div className="w-[257px] h-full">
                    <Menus />
                </div>
                <div className="flex-1 h-full">{children}</div>
            </div>
        </>
    );
};

export default Content;
