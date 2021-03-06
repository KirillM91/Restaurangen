import styled from "styled-components";
import { IApproved } from "../../models/IApproved";

export const Input = styled.input`
    height: 1.8rem;
    border: none;
    border-radius: 5px;
    width: 150px;
    text-align: center;
`;

export const FormInput = styled.input<IApproved>`
    
    height: 2rem;
    border: none;
    border-radius: 5px;
    width: 50%; 
    border-left: 7px solid   
    ${props => (props.approved === false) && props.touched ? "red" : "none"};  

    @media screen and (min-width: 1024px) {
            width: 30%;
    }
`;

export const Form = styled.form`
    height: fit-content;
`;