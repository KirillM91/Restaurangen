import ramen from "../assets/ramen.jpg"
import chicken from "../assets/chicken.jpg"
import squid from "../assets/squid.jpg"
import { MenuParagraph } from "./styled-components/Paragraf"
import { MenuImage } from "./styled-components/Images"
import { MenuDiv, MenuDiv2, MenuSection } from "./styled-components/Divs"
import { H2, H4 } from "./styled-components/Headings"

export function Menu () {
    return(
        <MenuSection>
            <H2>Meny </H2>

            <MenuDiv>
                <MenuImage src={ramen}/>
                <MenuParagraph>
                    <H4>Magma ramen ........... 189 kr</H4>
                    Kyckling, äggnudlar, ägg, <br/>
                    schalottenlök, röd chili, sesam
                </MenuParagraph>
            </MenuDiv>

            <MenuDiv2>            
                <MenuParagraph>
                    <H4>Dragon nuggets ........ 229 kr</H4>
                    Kyckling, ris, rödlök, röd <br/>
                    chili, koriander, salladslök
                </MenuParagraph>
                <MenuImage src={chicken}/>
            </MenuDiv2>

            <MenuDiv>
                <MenuImage src={squid}/>
                <MenuParagraph>
                    <H4>Squid on Fire ......... 239 kr</H4>
                    Bläckfisk, ris, rödlök, röd <br/>
                    chili, koriander, salladslök
                </MenuParagraph>
            </MenuDiv>

        </MenuSection>
    )
}