import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Play, RotateCcw , Check } from 'lucide-react';

import { Label } from "@radix-ui/react-label";

const PomodoroTimer = () => {
    const [time, setTime] = useState(25 * 60);
    const [initialTime, setInitialTime] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [summary, setSummary] = useState('');
    const [completedPomodoros, setCompletedPomodoros] = useState([]);
    const [customTime, setCustomTime] = useState(25);

    useEffect(() => {
        let interval = null;
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            setIsRunning(false);
            setShowSummaryModal(true);
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    useEffect(() => {
        setTime(customTime * 60);
        setInitialTime(customTime * 60);
    }, [customTime]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const toggleTimer = () => {
        if (isRunning) {
            setIsRunning(false);
            setTime(initialTime);
        } else {
            setIsRunning(true);
        }
    };

    const completeTimer = () => {
        setIsRunning(false);
        setShowSummaryModal(true);
    };

    const handleSummarySubmit = () => {
        setCompletedPomodoros([...completedPomodoros, { duration: initialTime / 60, summary }]);
        setShowSummaryModal(false);
        setSummary('');
        setTime(initialTime);
    };

    const handleCustomTimeChange = (e) => {
        let value = parseInt(e.target.value);
        if (isNaN(value)) {
            value = 25; // 默认值
        } else if (value < 20) {
            value = 20; // 最小值
        } else if (value > 60) {
            value = 60; // 最大值
        }
        setCustomTime(value);
    };

    const progress = ((initialTime - time) / initialTime) * 100;

    return (
        <div className="p-6 max-w-md mx-auto flex flex-col items-center w-full">
            <div className="text-8xl font-bold mb-8">
                {formatTime(time)}
            </div>
            <div className="w-full flex flex-col space-y-2 mb-4">
                <Progress value={progress} className="w-full h-2"/>
                <div className="flex justify-between space-x-2">
                    <Button onClick={toggleTimer} size="sm" className="w-1/2">
                        {isRunning ? <RotateCcw className="mr-2 h-4 w-4"/>: <Play className="mr-2 h-4 w-4"/>}
                        {isRunning ? '重置' : '开始'}
                    </Button>
                    <Button onClick={completeTimer} size="sm" className="w-1/2">
                        <Check className="mr-2 h-4 w-4"/> 立即完成
                    </Button>
                </div>
            </div>
            <div className="flex flex-row items-center space-x-2 w-full">
                <Label htmlFor="customTime">时间设置：</Label>
                <Input
                    id="customTime"
                    type="number"
                    value={customTime}
                    onChange={handleCustomTimeChange}
                    className="mb-1 text-center w-2/3"
                    placeholder="20-60分钟"
                    disabled={isRunning}
                />
            </div>

            <AlertDialog open={showSummaryModal} onOpenChange={setShowSummaryModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>番茄钟完成</AlertDialogTitle>
                        <AlertDialogDescription>
                            请总结这个番茄钟期间完成的工作：
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="输入总结..."
                        rows={4}
                        className="w-full p-2 border rounded"
                    />
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={handleSummarySubmit}>提交</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default PomodoroTimer;