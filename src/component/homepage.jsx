import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HomePage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Hello, Pomodoro</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                    <p className="text-center">Welcome to your productivity dashboard!</p>
                    <Button className="w-full">Start a Pomodoro</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default HomePage;