import styled from "styled-components";
import { IApproved } from "../../models/IApproved";
// import { IError } from "../../models/IError";
// import { Itouched } from "../../models/ITouched";

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