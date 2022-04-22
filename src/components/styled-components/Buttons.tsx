import styled from "styled-components";

export const DeleteButton = styled.button`
    background-color: #830b05;
    color: white;
    padding: 1%;
    border-radius: 5px;
    width: 110px;

    @media screen and (min-width: 1024px) {
        padding: 0.5%;
    }
`;

export const ChangeButton = styled.button`
    background-color: #464242;
    color: white;
    padding: 1%;
    border-radius: 5px;
    width: 110px;
    
    @media screen and (min-width: 1024px) {
        padding: 0.5%;
    }
`;

export const TimeButton = styled.button`
    background-color: #f8f8f8;
    color: black;
    padding: 4%;
    border-radius: 8px;
    border: none;
    margin: 1%;

    &:hover {
        background-color: #a8a6a6;
    }

    &:disabled {
        background-color: #1b1a1a;
        color: #868686;
        border: #868686 1px solid;
    }

    @media screen and (min-width: 1024px) {
        padding: 1%;
    }
`;

export const ChoosenTimeButton = styled.button`
    background-color: #706c6c;
    color: #f1f1f1;
    padding: 4%;
    border-radius: 8px;
    border: none;
    margin: 1%;

    &:disabled {
        background-color: #1b1a1a;
        color: #868686;
        border: #868686 1px solid;
    }

    @media screen and (min-width: 1024px) {
        padding: 1%;
    }
`;

export const SubmitButton = styled.button`
    background-color: #464242;
    color: white;
    padding: 1.5%;
    border-radius: 8px;
    margin-bottom: 1rem;
    border: none;
    margin: 1.5%; 

    &:disabled {
        background-color: #1b1a1a;
        color: black;
        border: #868686 1px solid;
    }

    @media screen and (min-width: 1024px) {
        padding: 0.5%;
    }
`;

export const PlusMinusButton = styled.button`
    background-color: black;
    color: white;
    border: 2px solid white;
    line-height: 0;
    font-size: 1.3rem;    
    padding: 0;
    border-radius: 50%;
    width: 38px;
    aspect-ratio: 1/1;
    margin: 1%;

    &:hover {
        border: 3px solid white;
    }

    &:active {
        border: 3px solid gray;
        color: gray;
    }

    &:disabled {
        border: 3px solid #5c5c5c;
        color: #5c5c5c;
    }
    
    @media screen and (min-width: 1024px) {
        font-size: 1.1rem;
        padding: 0.5%;
    }
`;

export const AdminButton = styled.button`
    min-width: fit-content;
    padding: 0.35em;
    width: 2em;
    border-radius: 5px;
    border: none;
    margin: 0.25em;
`