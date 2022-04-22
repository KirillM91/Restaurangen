import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Footer } from "./styled-components/Divs";

export function Layout() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [menuOpenButton, setMenueOpenButton] = useState(false);

    function toggleMenu() {
        setMenuOpen(!menuOpen);
        console.log("click");
        
        setMenueOpenButton(!menuOpenButton);
    };

    return(
        <>
            <header className="layout-header">
                <h1 className="layout-logotype">Kitchen 
                    <br/>
                    On <span className="layout-logotype-fire">Fire</span>
                </h1>
                <div className="layout-nav-wrapper">                    
                    <nav className={`${menuOpen ? "menu-open": "menu-closed"} layout-nav`}>
                        <ul>
                            <li><Link to="/" onClick={toggleMenu}> Hem</Link></li>
                            <li><Link to="/booking" onClick={toggleMenu}> Boka bord</Link></li>
                            <li><Link to="/contact" onClick={toggleMenu}> Kontakt</Link></li>
                            <li><Link to="/admin" onClick={toggleMenu}> Admin</Link></li>
                        </ul>
                    </nav>
                    <button className="layout-menu-button" onClick={toggleMenu}>
                        <span className={`${menuOpenButton ? "menu-closed-button": "menu-open-button"} button-line-1`}></span>
                        <span className={`${menuOpenButton ? "menu-closed-button": "menu-open-button"} button-line-2`}></span>
                        <span className={`${menuOpenButton ? "menu-closed-button": "menu-open-button"} button-line-3`}></span>
                    </button>
                </div>
            </header>
            <main><Outlet></Outlet></main>
            <Footer>A school project at Medieinstitutet made by Fanny Lundberg and Kirill Missarov</Footer>
        </>
    );
};