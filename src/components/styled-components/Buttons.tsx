import styled from "styled-components";

export const DeleteButton = styled.button`
    background-color: #a80b04;
    color: white;
    padding: 1%;
    @media screen and (min-width: 1024px) {
        padding: 0.5%;
    }
`;

export const ChangeButton = styled.button`
    background-color: #d3cccc;
    color: black;
    padding: 1%;
    @media screen and (min-width: 1024px) {
        padding: 0.5%;
    }
`;

export const TimeButton = styled.button`
    background-color: #f8f8f8;
    color: black;
    padding: 4%;
    border-radius: 8px;
    @media screen and (min-width: 1024px) {
        padding: 1%;
    }
`;

export const SubmitButton = styled.button`
    background-color: #e7e5e5;
    color: black;
    padding: 0.5%;
    border-radius: 8px;
`;

export const PlusMinusButton = styled.button`
    background-color: #eeeaea;
    color: black;
    padding: 1%;
    border-radius: 8px;
    width: 38px;
    @media screen and (min-width: 1024px) {
        font-size: 1.1rem;
        padding: 0.5%;
    }
`;