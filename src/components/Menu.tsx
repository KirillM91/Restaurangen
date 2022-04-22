import ramen from "../assets/ramen.jpg"
import chicken from "../assets/chicken.jpg"
import squid from "../assets/squid.jpg"
import { MenuImage } from "./styled-components/Images"
import { MenuDiv, MenuDiv2, MenuInlineBlockDiv, MenuSection } from "./styled-components/Divs"
import { H2, H4 } from "./styled-components/Headings"

export function Menu () {
    return(
        <MenuSection>
            <H2>Meny </H2>

            <MenuDiv>
                <MenuImage src={ramen}/>
                <MenuInlineBlockDiv>
                    <H4>Magma ramen ........... 189 kr</H4>
                    Kyckling, äggnudlar, ägg, <br/>
                    schalottenlök, röd chili, sesam
                </MenuInlineBlockDiv>
            </MenuDiv>

            <MenuDiv2>            
                <MenuInlineBlockDiv>
                    <H4>Dragon nuggets ........ 229 kr</H4>
                    Kyckling, ris, rödlök, röd <br/>
                    chili, koriander, salladslök
                </MenuInlineBlockDiv>
                <MenuImage src={chicken}/>
            </MenuDiv2>

            <MenuDiv>
                <MenuImage src={squid}/>
                <MenuInlineBlockDiv>
                    <H4>Squid on Fire ......... 239 kr</H4>
                    Bläckfisk, ris, rödlök, röd <br/>
                    chili, koriander, salladslök
                </MenuInlineBlockDiv>
            </MenuDiv>

        </MenuSection>
    )
}