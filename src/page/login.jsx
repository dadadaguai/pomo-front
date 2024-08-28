import React, { useState } from 'react';
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import IndexPageImg from "../assets/pomo1.jpg";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // 确保路径正确
import { toast } from 'react-hot-toast'; // 假设使用 react-hot-toast 进行通知



const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);

    const navigate = useNavigate();
    const { login, register } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const success = await login(username, password);
            if (success) {
                toast.success('登录成功');
                navigate('/home');
            } else {
                toast.error('登录失败，请检查用户名和密码');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('登录时发生错误');
        }
    };


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const success = await register(registerUsername, registerPassword, registerEmail);
            if (success) {
                toast.success('注册成功，请登录');
                setIsRegisterOpen(false);
            } else {
                toast.error('注册失败，请稍后重试');
            }
        } catch (error) {
            console.error('Register error:', error);
            toast.error('注册时发生错误');
        }
    };

    const handleForgotPassword = () => {
        toast.info('忘记密码功能暂未实现');
    };
    return (
        <div className="flex h-screen">
            <div className="w-2/3 bg-gray-200">
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