import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FunctionBar = () => {
    const functions = [
        { icon: "🍅", name: "番茄首页" },
        { icon: "📝", name: "全部笔记" },
        { icon: "📊", name: "每日回顾" },
        { icon: "⚙️", name: "自定义时钟" },
    ];

    return (
        <Card className="border-0 shadow-none mt-8">
            <CardContent className="flex flex-col space-y-2">
                {functions.map((func, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-left"
                    >
                        <span className="mr-2 text-lg">{func.icon}</span>
                        {func.name}
                    </Button>
                ))}
            </CardContent>
        </Card>
    );
};

export default FunctionBar;