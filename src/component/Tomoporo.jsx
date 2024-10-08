import React, { useState, useEffect } from 'react';
import {
    AlertDialog,
    AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Play, RotateCcw , Check } from 'lucide-react';
import { Label } from "@radix-ui/react-label";
import { generateUUID} from "@/src/utils/uuid.js";
import EnhancedTextarea from "@/src/component/EnhancedTextarea.jsx";
import Cookies from 'js-cookie';

const PomodoroTimer = () => {
    const [time, setTime] = useState(25 * 60);
    const [initialTime, setInitialTime] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [summary, setSummary] = useState('');
    const [customTime, setCustomTime] = useState(25);
    const [isFinished, setIsFinished] = useState(true);
    const [showResetAlert, setShowResetAlert] = useState(false);

// 定义一个useEffect钩子，用于设置和清理计时器
    useEffect(() => {
        let interval = null; // 定义一个变量来存储计时器的ID
        if (isRunning && time > 0) {
            interval = setInterval(() => { // 如果计时器正在运行且时间大于0，则设置一个每秒减少time的计时器
                setTime((prevTime) => prevTime - 1); // 每次计时器触发时，减少1秒
            }, 1000); // 计时器每秒触发一次
        } else if (time === 0) {
            setIsRunning(false); // 如果时间到达0，停止计时器
            setShowSummaryModal(true); // 显示总结模态框
        }
        return () => clearInterval(interval); // 组件卸载时清理计时器
    }, [isRunning, time]); // 依赖项列表，当isRunning或time变化时，重新执行这个useEffect

// 定义另一个useEffect钩子，用于初始化计时器的时间
    useEffect(() => {
        setTime(customTime * 60); // 将自定义时间（分钟）转换为秒，并设置为计时器的初始时间
        setInitialTime(customTime * 60); // 同时设置初始时间为自定义时间
    }, [customTime]); // 当customTime变化时，重新执行这个useEffect

// 定义一个formatTime函数，用于格式化时间显示
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60); // 将秒数转换为分钟
        const remainingSeconds = seconds % 60; // 获取剩余的秒数
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`; // 返回格式化的时间字符串，确保分钟和秒数都是两位数
    };
// 定义添加番茄钟的请求
    const addNormalPomodoro = async (pomodoroSession) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/pomodoro_service/add_normal_pomodoro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // 设置请求头为JSON
                },
                body: pomodoroSession,
                credentials: 'include' // 包括cookies
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Pomodoro added successfully:', data);
            } else {
                console.error('Failed to add pomodoro:', response.status, await response.text());
            }
        } catch (error) {
            console.error('Error adding pomodoro:', error);
        }
    };
// 定义一个toggleTimer函数，用于开始或停止计时器
    const toggleTimer = () => {
        if (isRunning) {
            // 重置操作
            setIsRunning(false); // 如果计时器正在运行，先停止它
            if( summary.length === 0 &&  progress <= 40 ){ // 判断无笔记且进度小于40%，直接进行重置。
                setTime(initialTime); // 并将时间重置为初始时间
                setIsFinished(true); // 设置完成的默认值
                setSummary(''); // 设置笔记为空
            }else {
                setShowResetAlert(true);
            }
        }
        else {
            // 开始操作
            let newPomodoroUuid = generateUUID(); // 创建一个番茄事例的uuid
            let currentTime = new Date(); // 获取当前的开始时间
            let sessionPomodoroData = {
                uuid: newPomodoroUuid,
                initTime: initialTime,
                startTime: currentTime,
            }
            setIsRunning(true); // 如果计时器已停止，开始它
            sessionStorage.setItem('pomodoroSession', JSON.stringify(sessionPomodoroData));
            let sessionSummaryData = {
                summary: summary,
                pomodoro_uuid:newPomodoroUuid,
            }
            sessionStorage.setItem('summarySession', JSON.stringify(sessionSummaryData));
        }
    };

    // 定义重置提醒后点击继续的函数
    const handleResetContinued = () => {
        setIsFinished(false); // 设置未完成
        setShowSummaryModal(true); // 显示模态框
    }
    // 定义重置提醒后点击取消的函数
    const handleResetCancel = () => {
        setIsRunning(true);
    }
// 定义一个completeTimer函数，用于完成计时器
    const completeTimer = () => {
        setIsRunning(false); // 停止计时器
        setShowSummaryModal(true); // 显示总结模态框
    };
    // 用于在番茄钟的过程中，点击记录来进行一次暂时的笔记记录。
    const handleSummaryChange = () => {
        if (isRunning && time > 0) {
            setShowSummaryModal(true); // 显示模态框
        }
    }
    // 处理暂存时的笔记记录提交的函数
    const handleStagingSummarySubmit  = () => {
        let summarySessionData = JSON.parse(sessionStorage.getItem('summarySession'));
        summarySessionData.summary = summary;
        sessionStorage.setItem('summarySession', JSON.stringify(summarySessionData));
    }
// 定义一个handleSummarySubmit函数，用于处理总结模态框的提交
    const handleSummarySubmit = () => {
        const endTime =  new Date();

        setShowSummaryModal(false); // 关闭总结模态框
        if (isRunning && time > 0) {
            handleStagingSummarySubmit();
        }else {
            // 获取要提交番茄事例的创建时间、结束时间、持续时间、是否完成、总结文本。
            let startTime = new Date(JSON.parse(sessionStorage.getItem('pomodoroSession')).startTime)
            // 发送后端请求。
            let pomodoroSession = JSON.stringify({
                UserID:Cookies.get('userid'),
                StartTime: startTime, // 开始时间，ISO 8601格式
                EndTime: endTime, // 结束时间，ISO 8601格式
                Duration: initialTime, // 持续时间，单位为毫秒
                Completed: isFinished, // 是否完成
                SummaryText: summary // 番茄钟总结文本
            });
            addNormalPomodoro(pomodoroSession).then(r => console.log(r))
            setSummary(''); // 清空总结文本
            setTime(initialTime); // 重置计时器时间
            setIsFinished(true);
        }
    };

// 定义一个handleCustomTimeChange函数，用于处理自定义时间的输入变化
    const handleCustomTimeChange = (e) => {
        let value = parseInt(e.target.value); // 获取输入框的值并转换为整数
        if (isNaN(value)) {
            value = 25; // 如果输入无效，则设置默认值为25分钟
        } else if (value < 20) {
            value = 1; // 如果输入值小于20，则设置最小值为20分钟
        } else if (value > 60) {
            value = 60; // 如果输入值大于60，则设置最大值为60分钟
        }
        setCustomTime(value); // 设置自定义时间为输入的值
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
                    <Button onClick={handleSummaryChange} size="sm" className="w-1/2">
                        <Check className="mr-2 h-4 w-4"/> 记录
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
                    {/*<textarea*/}
                    {/*    value={summary}*/}
                    {/*    onChange={(e) => setSummary(e.target.value)}*/}
                    {/*    placeholder="输入总结内容(可为空)..."*/}
                    {/*    rows={4}*/}
                    {/*    className="w-full p-2 border rounded"*/}
                    {/*/>*/}
                    <EnhancedTextarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="输入总结内容(可为空)..."
                        rows={10}
                        className="w-full p-2 border rounded"
                        maxLength={800}
                    />
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={handleSummarySubmit}>提交</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={showResetAlert} onOpenChange={setShowResetAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogDescription>
                            在当前番茄钟的过程中，你已经完成了{progress.toFixed(2)}%，{summary.length > 0 ? '并且记录了学习过程中的部分笔记，':''}是否确定要关闭当前的番茄钟吗？是请点击继续，否请点击取消。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleResetCancel}>取消</AlertDialogCancel>
                        <AlertDialogAction onClick={handleResetContinued}>继续</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default PomodoroTimer;