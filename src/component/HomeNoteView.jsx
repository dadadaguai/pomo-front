import React from 'react';
import {Card, CardTitle, CardDescription, CardContent, CardFooter} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge'
import '../static/styles.css'


const chats = [
    { title: 'Tomato Calendar with Daily Tracking', date: '2024年7月31日' , keywords:['Tomato','Calendar','Daily']},
    { title: 'Setting up shadcn/ui with React, Vite, and...', date: '2024年7月30日', keywords: ['shadcn/ui', 'React', 'Vite'] },
    { title: 'Customizable Functionality Bar for...', date: '2024年7月14日', keywords: ['Customizable', 'Functionality', 'Bar'] },
    { title: '模仿这种类似于github提交的显示方式，生成...模仿这种类似于github提交的显示方式，生成..模仿这种类似于github提交的显示方式，生成..模仿这种类似于github提交的显示方式，生成..', date: '2024年7月30日', keywords: ['GitHub', '提交', '显示'] },
    { title: '(New chat)', date: '2024年7月14日', keywords: ['New', 'Chat', 'Entry'] },
    { title: 'Implementing JWT Authentication in Flaska', date: '2024年7月29日', keywords: ['JWT', 'Authentication', 'Flaska'] },

];

const HomeNoteView = () => {
    return (
        <div className="p-4 bg-background">
            <h2 className="text-1xl font-semibold mb-2">最近的番茄记录</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {chats.map((chat, index) => (
                    <Card key={index} className="border border-border rounded-lg h-32 pl-0">
                        <CardContent className="h-20 w-full">
                            <div className="flex flex-row mt-4 space-x-3">
                                {chat.keywords.map((keyword,k) => (
                                    <Badge key={k} variant="secondary">{keyword}</Badge>
                                ))}
                            </div>
                            <CardTitle className="font-medium text-1xl mt-2 line-clamp-2" >{chat.title}</CardTitle>
                        </CardContent>
                        <CardFooter className="">
                            <CardDescription>{chat.date}</CardDescription>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default HomeNoteView;
