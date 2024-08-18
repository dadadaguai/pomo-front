import React from 'react';
import { Card } from "@/components/ui/card.jsx";
import TomatoCalendar from "../component/TomatoCalendar.jsx"
import FunctionBar from "@/src/component/menu.jsx";
const HomePage = () => {
    return (
        <div className="flex flex-col flex-wrap justify-center items-start mx-8"> {/* 外层容器使用 flex 布局 */}
            <Card className="w-[400px] mx-2 border-0 shadow-none h-screen"> {/* 使用 Card 包装 TomatoCalendar 并设置宽度和内外边距 */}
                <TomatoCalendar/>
                <FunctionBar/>
            </Card>
        </div>

    );
};

export default HomePage;