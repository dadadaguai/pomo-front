import React from 'react';
import MenuPage from "@/src/page/menupage.jsx";
import IndexPomo from "@/src/page/indexpomo.jsx";

const HomePage = () => {

    return (
        <div className="flex flex-row h-screen w-screen">
            <MenuPage />
            <IndexPomo />
        </div>
    );
};

export default HomePage;