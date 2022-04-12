import styled from "styled-components";
import { Itouched } from "../../models/ITouched";

export const FormInput = styled.input<Itouched>`
    height: 2rem;
    border: none;
    border-radius: 5px;    
    border-left: 7px solid ${props => props.fname ? "red" : "none"}
`;