import "../App.css"
import { Menu } from "./Menu";
import { HomeDiv } from "./styled-components/Divs";
import { H2 } from "./styled-components/Headings";

export function Home() {

    return(
        <>
        <section id="homeBgImg">
            <HomeDiv>
                <H2>"Stark asiatisk mat med en twist"</H2>
            </HomeDiv>
        </section>
        <Menu></Menu>
        </>
    );
};