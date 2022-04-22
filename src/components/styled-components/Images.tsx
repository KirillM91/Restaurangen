import styled from "styled-components";

export const MenuImage = styled.img`
    display: inline-block;
    border-radius: 50%;
    width: 200px;
    aspect-ratio: 1/1;
    margin: 1em;
    border: 2px solid white;

    @media screen and (max-width: 1024px) {
        margin-bottom: 2em;
    }
`;