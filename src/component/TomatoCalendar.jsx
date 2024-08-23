import React from 'react';
import { format, subDays, eachDayOfInterval, isToday } from 'date-fns';
import { Badge } from "@/components/ui/badge"
const getColor = (count) => {
    if (count === 0) return 'bg-gray-100';
    if (count >= 1 && count <= 4) return 'bg-green-100';
    if (count >= 5 && count <= 8) return 'bg-green-300';
    if (count >= 9 && count <= 16) return 'bg-green-500';
    return 'bg-green-700';
};

const TomatoCalendar = () => {
    const today = new Date();
    const pastDays = 89;
    const startDate = subDays(today, pastDays);
    const endDate = today;
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    // 模拟数据 - 请用实际数据替换
    const tomatoCounts = days.reduce((acc, day) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        acc[dateStr] = Math.floor(Math.random() * 20);
        return acc;
    }, {});

    // 计算今日番茄数
    const todayKey = format(today, 'yyyy-MM-dd');
    const todayTomatoes = tomatoCounts[todayKey] || 0;

    // 计算当前连续天数
    let currentStreak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
        const day = days[i];
        const dateKey = format(day, 'yyyy-MM-dd');
        if (tomatoCounts[dateKey] > 0) {
            currentStreak++;
        } else {
            break;
        }
    }

    return (
        <div className="flex flex-col items-center my-4">
            {/*<h2 className="text-2xl font-bold mb-4">Hello,接着加油！</h2>*/}
            <div className="text-lg mb-2 my-2">
                <Badge variant="secondary" className="mx-8">今日番茄: {todayTomatoes}</Badge>
                <Badge variant="secondary" className="mx-8">连续天数: {currentStreak}</Badge>

            </div>
            <div className="grid grid-cols-12 gap-1.5">
                {days.map(day => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const count = tomatoCounts[dateKey];

                    return (
                        <div
                            key={dateKey}
                            className={`w-5 h-5 ${getColor(count)} rounded-sm flex items-center justify-center`}
                            title={`${count}个番茄于${format(day, 'yyyy年MM月dd日')}`}
                        >
                            {isToday(day) && <div className="w-1 h-1 bg-blue-500 rounded-full"></div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TomatoCalendar;