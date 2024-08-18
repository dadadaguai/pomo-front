import React from 'react';
import { Clock } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">Hello, Pomodoro</h1>
                <Clock className="mx-auto mb-4" size={48} color="#4B5563" />
                <p className="text-lg text-gray-600">Welcome to your productivity dashboard!</p>
            </div>
        </div>
    );
};

export default HomePage;