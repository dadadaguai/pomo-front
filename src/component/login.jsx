import React, { useState } from 'react';
// 插入组件
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// 导入图片。
import IndexPageImg from "../assets/pomo1.jpg"
// 导入路由库。
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);

    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login:', { username, password, rememberPassword });
        // 跳转页面
        navigate('/home');
    };

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('Register:', { registerUsername, registerPassword, registerEmail });
        setIsRegisterOpen(false);
    };

    const handleForgotPassword = () => {
        console.log('Forgot password clicked');
        // 实现忘记密码功能
    };

    return (
        <div className="flex h-screen">
            <div className="w-2/3 bg-gray-200">
                {/* 这里放置您的图片 */}
                <img src={IndexPageImg} alt="Login background" className="w-full h-full object-cover" />
            </div>
            <div className="w-1/3 flex items-center justify-center bg-white">
                <Card className="w-[90%] max-w-[400px] shadow-lg">
                    <CardHeader className="space-y-1">
                        <h2 className="text-2xl font-bold text-center">欢迎</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-sm font-medium">用户名</Label>
                                <Input
                                    id="username"
                                    placeholder="请输入用户名"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium">密码</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="请输入密码"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={rememberPassword}
                                        onCheckedChange={setRememberPassword}
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        记住密码
                                    </label>
                                </div>
                                <Button
                                    variant="link"
                                    className="text-sm text-blue-600 hover:underline p-0 h-auto font-normal"
                                    onClick={handleForgotPassword}
                                >
                                    忘记密码？
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between space-x-2">
                        <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full">注册</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>注册新账户</DialogTitle>
                                    <DialogDescription>
                                        请填写以下信息以创建新账户。
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleRegister} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="register-username">用户名</Label>
                                        <Input
                                            id="register-username"
                                            placeholder="请输入用户名"
                                            value={registerUsername}
                                            onChange={(e) => setRegisterUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="register-password">密码</Label>
                                        <Input
                                            id="register-password"
                                            type="password"
                                            placeholder="请输入密码"
                                            value={registerPassword}
                                            onChange={(e) => setRegisterPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="register-email">邮箱</Label>
                                        <Input
                                            id="register-email"
                                            type="email"
                                            placeholder="请输入邮箱"
                                            value={registerEmail}
                                            onChange={(e) => setRegisterEmail(e.target.value)}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">注册</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <Button type="submit" onClick={handleLogin} className="w-full">登录</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;