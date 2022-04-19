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

    &:hover {
        background-color: #a8a6a6;
    }

    &:focus {
        background-color: #706c6c;
        /* border: white 1px solid; */
        color: white;
    }

    &:disabled {
        background-color: #1b1a1a;
        color: #868686;
        border-color: #868686;
    }

    @media screen and (min-width: 1024px) {
        padding: 1%;
    }
`;

export const SubmitButton = styled.button`
    background-color: #464242;
    color: white;
    padding: 2%;
    border-radius: 8px;

    &:disabled {
        background-color: #1b1a1a;
        color: black;
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
    
    @media screen and (min-width: 1024px) {
        font-size: 1.1rem;
        padding: 0.5%;
    }
`;