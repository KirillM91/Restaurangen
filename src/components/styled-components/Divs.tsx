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
    border-radius: 5%;
    margin-top: 4%;
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
    padding: 1.5em;    
`;

export const BorderDiv = styled.div`
    padding: 5%;
    border-top: 1px solid #383737ae;
    margin-left: 4%; 
    margin-right: 4%; 

    @media screen and (min-width: 1024px) {
        padding: 1%;
    }
`;

export const BorderBookingDiv = styled.div`
    padding-top: 5%;
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
    height: 75px;
    margin-bottom: 1rem;
    margin-top: 1rem;
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
        background-color: #000000b0;
        padding: 1%;
        border-radius: 10px;
        position: absolute;
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

export const CheckAvailabilityDiv = styled.div`
    margin-top: 0;
`;

export const Footer = styled.footer`
    color: gray;
    text-align: center;
    font-size: 0.75rem;
    padding-top: 1.25em;
`;

export const MenuDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 60%;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
    border-top: 1px solid white;
    padding-top: 1em;
    gap: 15%;
    

    @media screen and (max-width: 1024px) {
        flex-direction: column;
    }
`;

export const MenuDiv2 = styled.div`
    display: flex;
    flex-direction: row;
    width: 60%;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
    border-top: 1px solid white;
    padding-top: 1em;
    gap: 15%;
    

    @media screen and (max-width: 1024px) {
        flex-direction: column-reverse;
    }
`;

export const MenuSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: fit-content;
`;

export const MenuInlineBlockDiv = styled.div`
    display: inline-block;
`;
