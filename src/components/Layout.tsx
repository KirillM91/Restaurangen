import { Link, Outlet } from "react-router-dom";

export function Layout() {

    return(
        <>
            <header>
                <h1>Kitchen On Fire</h1>
                <nav>
                    <ul>
                        <li><Link to="/"> Hem</Link></li>
                        <li><Link to="/booking"> Boka bord</Link></li>
                        <li><Link to="/contact"> Kontakt</Link></li>
                        <li><Link to="/admin"> Admin</Link></li>
                    </ul>
                </nav>
            </header>
            <main><Outlet></Outlet></main>
            <footer>©</footer>
        </>
    );
};