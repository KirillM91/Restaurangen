import styled from "styled-components";

export const H1 = styled.h1`
    display: none;
    font-size: 5rem;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; 
    font-weight: bold;
    position: absolute;
    top: 40%;
    left: 25%;
    
    @media screen and (min-width: 1024px) {
        display: inline-block;  
    }
`;

export const H2 = styled.h2`
    font-size: 1.8rem;
    margin-bottom: 2%;
    
    @media screen and (min-width: 1024px) {
        margin-bottom: 1%;
    }
`;

export const H3 = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 2%;
    width: 100%;

    @media screen and (min-width: 1024px) {
        margin-bottom: 1%;
    }
`;

export const H4 = styled.h4`
    font-size: 1.1rem;
    margin-bottom: 1%;
`;