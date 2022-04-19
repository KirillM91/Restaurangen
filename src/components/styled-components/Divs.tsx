import styled from "styled-components";

export const BookingDiv = styled.div`
    width: 80%;
    margin: 0 auto;
    background-color: #111111;
    margin-bottom: 10%;
    border-radius: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    padding-left: 1%;
    padding-right: 1%;
    clear: both;
    box-shadow: 1px 1px 1px grey;

    @media screen and (min-width: 1024px) {
        width: 40%;
        padding: 2%;
        margin-bottom: 5%;
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
    box-shadow: 1px 1px 1px grey;

    @media screen and (min-width: 1024px) {
        padding: 1%;
        width: 32%;
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
    background-color: #111111;
    padding: 3%;
    border-radius: 10px;
    align-self: center;
    box-shadow: 1px 1px 1px grey;
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

export const BoxBooking = styled.div`
    background-color: #ffffff11;
    padding: 1%;
    margin-bottom: 1%;
    border-radius: 5px;
`;