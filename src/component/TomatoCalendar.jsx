import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

const getColor = (count) => {
    if (count === 0) return 'bg-gray-100';
    if (count >= 1 && count <= 4) return 'bg-green-100';
    if (count >= 5 && count <= 8) return 'bg-green-300';
    if (count >= 9 && count <= 16) return 'bg-green-500';
    if (count >= 17) return 'bg-green-700';
};

const TomatoCalendar = () => {
    const today = new Date();
    const startDate = startOfMonth(today);
    const endDate = endOfMonth(today);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    // Simulated data - replace with actual data
    const tomatoCounts = days.reduce((acc, day) => {
        acc[format(day, 'yyyy-MM-dd')] = Math.floor(Math.random() * 20);
        return acc;
    }, {});

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">{format(today, 'MMMM yyyy')}</h2>
            <div className="grid grid-cols-7 gap-1">
                {days.map((day) => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const count = tomatoCounts[dateKey] || 0;
                    return (
                        <div
                            key={dateKey}
                            className={`w-8 h-8 ${getColor(count)} flex items-center justify-center text-xs`}
                            title={`${format(day, 'd MMMM')}: ${count} tomatoes`}
                        >
                            {format(day, 'd')}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TomatoCalendar;