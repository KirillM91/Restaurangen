import ramen from "../assets/ramen.jpg"
import chicken from "../assets/chicken.jpg"
import squid from "../assets/squid.jpg"
import { MenuParagraph } from "./styled-components/Paragraf"
import { MenuImage } from "./styled-components/Images"
import { MenuDiv, MenuDiv2, MenuSection } from "./styled-components/Divs"
import { H2 } from "./styled-components/Headings"

export function Menu () {
    return(
        <MenuSection>
            <H2>Meny:</H2>
            <MenuDiv>
                <MenuImage src={ramen}/>
                <MenuParagraph>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    Enim distinctio libero ducimus suscipit sed aliquam recusandae at a possimus aspernatur vero, 
                    aut soluta temporibus repellat, reprehenderit aperiam. Odit, sequi aliquam!
                </MenuParagraph>
            </MenuDiv>
            <MenuDiv2>            
                <MenuParagraph>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    Enim distinctio libero ducimus suscipit sed aliquam recusandae at a possimus aspernatur vero, 
                    aut soluta temporibus repellat, reprehenderit aperiam. Odit, sequi aliquam!
                </MenuParagraph>
                <MenuImage src={chicken}/>
            </MenuDiv2>
            <MenuDiv>
                <MenuImage src={squid}/>
                <MenuParagraph>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    Enim distinctio libero ducimus suscipit sed aliquam recusandae at a possimus aspernatur vero, 
                    aut soluta temporibus repellat, reprehenderit aperiam. Odit, sequi aliquam!
                </MenuParagraph>
            </MenuDiv>
        </MenuSection>
    )
}