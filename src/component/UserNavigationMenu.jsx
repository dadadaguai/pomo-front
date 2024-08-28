import React from 'react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { User, UserCircle, Edit, Settings, LogOut } from "lucide-react";

const UserNavigationMenu = ({ username = "dadadaguai", onLogout }) => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-white hover:bg-gray-100">
                        <User className="w-4 h-4 mr-2" />
                        {username}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="w-[200px] p-2">
                            <li>
                                <a href="/personal-info" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground">
                                    <UserCircle className="w-4 h-4 mr-2" />
                                    个人信息
                                </a>
                            </li>
                            <li>
                                <a href="/modify-info" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground">
                                    <Edit className="w-4 h-4 mr-2" />
                                    修改信息
                                </a>
                            </li>
                            <li>
                                <a href="/settings" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground">
                                    <Settings className="w-4 h-4 mr-2" />
                                    配置设置
                                </a>
                            </li>
                            <li>
                                <button
                                    onClick={onLogout}
                                    className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground text-left"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    退出登录
                                </button>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default UserNavigationMenu;