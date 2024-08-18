import React from 'react';
import { format, subDays, eachDayOfInterval } from 'date-fns';

const getColor = (count) => {
    if (count === 0) return 'bg-gray-100'; // 未完成的日期显示为灰色
    if (count >= 1 && count <= 4) return 'bg-green-100';
    if (count >= 5 && count <= 8) return 'bg-green-300';
    if (count >= 9 && count <= 16) return 'bg-green-500';
    return 'bg-green-700'; // 大于等于17的番茄数显示为最深色
};

const TomatoCalendar = () => {
    const today = new Date();
    const pastDays = 89; // 显示过去90天的记录
    const startDate = subDays(today, pastDays); // 计算90天前的日期
    const endDate = today; // 结束日期为今天
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    // 模拟数据 - 请用实际数据替换
    const tomatoCounts = days.reduce((acc, day) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        acc[dateStr] = Math.floor(Math.random() * 20); // 随机生成0到19的番茄数
        return acc;
    }, {});

    // 计算总番茄数
    const totalTomatoes = Object.values(tomatoCounts).reduce((sum, count) => sum + count, 0);

    // 计算最长连续日期数
    let maxStreak = 0;
    let currentStreak = 0;
    const streaks = {};

    days.forEach(day => {
        const dateKey = format(day, 'yyyy-MM-dd');
        const count = tomatoCounts[dateKey];
        if (count > 0) {
            currentStreak += 1;
            streaks[dateKey] = currentStreak;
            maxStreak = Math.max(maxStreak, currentStreak);
        } else {
            currentStreak = 0;
        }
    });

    return (
        <div className="flex flex-col items-center my-4">
            <h2 className="text-2xl font-bold mb-4">Hello,接着加油！</h2>
            <div className="text-lg mb-2">
                今日番茄: {totalTomatoes}，连续天数: {maxStreak}
            </div>
            <div className="grid grid-cols-12 gap-1.5">
                {days.map(day => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const count = tomatoCounts[dateKey];
                    const streak = streaks[dateKey] || 0;

                    return (
                        <div
                            key={dateKey}
                            className={`w-5 h-5 ${getColor(count)} rounded-sm flex items-center justify-center`}
                            title={`${count}个番茄于${format(day, 'yyyy年MM月dd日')} - 连续天数: ${streak}`}
                        >

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TomatoCalendar;