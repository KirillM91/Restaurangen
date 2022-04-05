import { Link } from "react-router-dom";

export function NotFound() {

    return(
        <div>
            <h2>Denna sida kunde tyvärr inte hittas.</h2>
            <h3><Link to="/"> Gå till förstasidan</Link></h3>
        </div>
    );
};