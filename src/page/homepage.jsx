import React from 'react';
import { Card } from "@/components/ui/card.jsx";
import TomatoCalendar from "../component/TomatoCalendar.jsx"
import FunctionBar from "@/src/component/menu.jsx";
import PomodoroTimer from "@/src/component/Tomoporo.jsx";
import HomeNoteView from "@/src/component/HomeNoteView.jsx";
import UserNavigationMenu from "@/src/component/UserNavigationMenu.jsx";
const HomePage = () => {
    return (
        <div className="flex flex-row h-screen w-screen">
            <div
                className="flex flex-col flex-wrap justify-center items-start mx-10 h-screen w-2/7"> {/* 外层容器使用 flex 布局 */}
                <Card
                    className="w-[400px] mx-2 border-0 shadow-none border-r border-amber-100 h-screen"
                    style={{
                        'position': 'relative', /* 使绝对定位的伪元素相对于Card定位 */
                        'border-right': '1px solid transparent' /* 初始透明边框，用于伪元素覆盖 */
                    }}> {/* 使用 Card 包装 TomatoCalendar 并设置宽度和内外边距 */}
                    <div className="w-full flex justify-end items-center my-4">
                        <UserNavigationMenu/>
                    </div>
                    <TomatoCalendar/>
                    <FunctionBar/>
                    <Card className="absolute inset-y-0 right-0  h-full"
                         style={{'background': 'inherit', 'height': '90%', 'top': '5%'}}>
                    </Card>
                </Card>

            </div>
            <div className="flex flex-col w-3/5">
                <Card className="my-7 w-full">
                    <PomodoroTimer/>
                </Card>
                <Card className="w-full">
                    <HomeNoteView />
                </Card>
            </div>
        </div>


    );
};

export default HomePage;