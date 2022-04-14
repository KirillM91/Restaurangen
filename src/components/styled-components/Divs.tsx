import styled from "styled-components";

export const BookingDiv = styled.div`
    width: 80%;
    margin: 0 auto;
    background-color: #1a1919;
    margin-bottom: 5%;
    border-radius: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    padding-left: 1%;
    padding-right: 1%;
    clear: both;
    @media screen and (min-width: 1024px) {
        width: 40%;
        padding: 2%;
    }
`;

export const ChangeBookingDiv = styled.div`
    width: 100%;
    background-color: #5e5c5c;
    padding: 1%;
`;

export const TimeDiv = styled.div`
    width: 70%;
    margin: 0 auto;
    background-color: #ffffff1f;
    padding: 3%;
    border-radius: 10px;
    align-self: center;
    @media screen and (min-width: 1024px) {
        padding: 1%;
        width: 40%;
    }
`;

export const PaddingDiv = styled.div`
    padding: 5%;
    @media screen and (min-width: 1024px) {
        padding: 1%;
    }
`;

export const BorderDiv = styled.div`
    padding: 5%;
    border-top: 1px solid white;
    margin-left: 4%; 
    margin-right: 4%; 
    @media screen and (min-width: 1024px) {
        padding: 1%;
    }
`;

export const BorderBookingDiv = styled.div`
    padding: 5%;
    border-top: 1px solid white;
    margin-left: 4%; 
    margin-right: 4%; 
    display: flex;
    flex-wrap: wrap;
    @media screen and (min-width: 1024px) {
        padding: 1%;
    }
`;

export const TransparentDiv = styled.div`
    width: 75%;
    margin: 0 auto;
    background-color: #ffffff1f;
    padding: 3%;
    border-radius: 10px;
    align-self: center;
`;

export const WrongInputDiv = styled.div`
    color: red;
    margin: 2%;
`;

export const NotFoundDiv = styled.div`
    background-color: #ffffff1f;
    padding: 5%;
    margin-bottom: 5%;
`;

export const HomeDiv = styled.div`
    width: 75%;
    margin: 0 auto;
    background-color: #ffffff1f;
    padding: 3%;
    border-radius: 10px;
    align-self: center;
    @media screen and (min-width: 1024px) {
        width: auto;
        background-color: transparent;
        padding: 1%;
        border-radius: 10px;
        position: fixed;
        right: 5%;
        bottom: 15%;
    }
`;