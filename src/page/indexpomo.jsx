import React from 'react';
import { Card } from "@/components/ui/card.jsx";
import PomodoroTimer from "@/src/component/Tomoporo.jsx";
import HomeNoteView from "@/src/component/HomeNoteView.jsx";
const IndexPomo = () => {
    return (
            <div className="flex flex-col w-3/5">
                <Card className="my-7 w-full ">
                    <PomodoroTimer/>
                </Card>
                <Card className="w-full">
                    <HomeNoteView />
                </Card>
            </div>
    );
};

export default IndexPomo;