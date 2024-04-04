import React, { useEffect } from 'react';
import AOS from 'aos';
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";

import "./globals.css";
import 'aos/dist/aos.css';

function App() {
    useEffect(() => {
        AOS.init({
            duration : 1200,
            data_aos_offset : 300,
            data_aos_easing : "ease-in-sine"
        });
    }, []);
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </div>
    );
}

export default App;
