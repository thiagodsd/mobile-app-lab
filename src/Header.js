import React from 'react';

import icon from "./img/icon.png";

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src={icon} alt="icon" />
            </div>
            <h1>Menú en Pasos</h1>
            <p>DESDE 1902</p>
        </header>
    );
}

export default Header;
