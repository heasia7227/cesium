"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const onEntry = () => {
        router.push("/cesium/plane");
    };

    return (
        <div className="flex justify-center items-center h-[100vh] w-[100vw]">
            <Button type="primary" size="large" onClick={onEntry}>
                进入控制台
            </Button>
        </div>
    );
}
