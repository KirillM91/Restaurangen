import { Link } from "react-router-dom";
import { NotFoundDiv } from "./styled-components/Divs";

export function NotFound() {

    return(
        <>
            <NotFoundDiv>
                <h2>Denna sida kunde tyvärr inte hittas.</h2>
            </NotFoundDiv>
            <h3><Link to="/"> Gå till förstasidan</Link></h3>
        </>
    );
};