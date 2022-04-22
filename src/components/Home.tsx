import "../App.css"
import { Menu } from "./Menu";
import { HomeDiv } from "./styled-components/Divs";
import { H1, H2 } from "./styled-components/Headings";
import { RedSpan } from "./styled-components/Span";

export function Home() {

    return(
        <>
        <section id="homeBgImg">
            <H1>Kitchen On <RedSpan>Fire</RedSpan></H1>
            <HomeDiv>
                <H2>"Stark asiatisk mat med en twist"</H2>
            </HomeDiv>
        </section>
        <Menu></Menu>
        </>
    );
};