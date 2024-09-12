import React, { createContext, useState, useContext, useEffect } from 'react';
const AuthContext = createContext(null);
import Cookies from 'js-cookie';
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        checkAuth().then(r => console.log(r));
    }, []);

    const checkAuth = async () => {
        const token = Cookies.get('access_token');
        if(token){
            try {
                const response = await fetch('http://127.0.0.1:5000/auth/user', {
                    method: 'POST',
                    body: JSON.stringify({ token }),
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    withCredentials: true
                });
                if (response.ok) {
                    console.log('验证成功');
                    console.log(response.json());
                } else {
                    console.error('没成功')
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            }
            // setUser({token});
        }else {
            console.log('why')
            // navigate('/login')
        }

    };

    const login = async (username, password) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/user_service/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                // 将id和username放进AuthContext中。
                Cookies.set('access_token', data.access_token);
                Cookies.set('username',data.username);
                Cookies.set('u_id',data.user_id);
                setUser({ id: data.user_id ,
                                username:data.username});
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) {
                setUser(null);
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const register = async (username, password, email) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/user_service/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email }),
                credentials: 'include'
            });

            return response.ok;

        } catch (error) {
            console.error('Registration failed:', error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);