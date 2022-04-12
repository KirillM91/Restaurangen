import { ChangeEvent, useEffect, useState } from "react";
import { deleteBooking } from "../services/DeleteBookingService";
import { SubmitButton } from "./styled-components/Buttons";
import { BorderDiv, PaddingDiv } from "./styled-components/Divs";
import { H2, H3, H4 } from "./styled-components/Headings";

export function Contact() {
    
    const [bookingId, setbookingId] = useState("");
    const [bookingCancel, setBookingCancel] = useState(false);
    const [disableSubmitInput, setDisableSubmitInput] = useState(true);

    //Används för att kolla om användaren har varit inne i fältet 
    //och ger ett felmedelande först när användaren har lämnat fältet
    const [touched, setTouched] = useState({
        bookingIdNr: false,
    });

    //Approved, för att kolla om fältet är korrekt ifyllt
    const [error, setError] = useState({
        bookingIdError: {
            bookingIdNr: "",
            approved: false
        }
    });

    //Kollar om alla fältet är korrekt ifyllt
    useEffect(() => {
        if (error.bookingIdError.approved === true) {
            setDisableSubmitInput(false);
        } else {
            setDisableSubmitInput(true);
        }
    });

    //Kör valideringen 
    useEffect(() => {
        validation();   
    }, [bookingId]);

    //Validerar input fälten och ger medelanden beroende på felet
    function validation() {               

        if (!bookingId.match(/^\S{24}$/)) {
            error.bookingIdError.bookingIdNr = "Vänligen fyll i en korrekt bokningsId";
            error.bookingIdError.approved = false;
        } else {
            error.bookingIdError.bookingIdNr = ""
            error.bookingIdError.approved = true;
        }

        setError(error);    
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let id: string = e.target.value;
        
        setbookingId(id); 
    }

    // Funktion för att ta bort en bokning
    function customerDeleteBooking(booking: string) {
    
        deleteBooking(booking);

        setBookingCancel(true);
    }

    // Om bokning är genomförd ska bekräftelse visas
    let bookingCancelled = 
    <></>
    if (bookingCancel) {
        bookingCancelled =
        <div>
            <p>Vi har nu tagit emot din avbokning.</p>
        </div>
    };
    
    return(
        <section>
            <PaddingDiv>
                <H2>Kontakta oss</H2>
                <H4>Tel: 08- 123 456 789</H4>
                <H4>E-mail: kitchenonfire@restaurang.se</H4>
            </PaddingDiv>

            <img id="chiliFlamesImg" src={require("../assets/chili-flames.jpg")} alt="red-chili-in-flames"/>

            <PaddingDiv>
                <H3>Hitta hit</H3>
                <H4>
                    Adress: <br></br> 
                    Fejkgatan 2,<br></br> 
                    543 21 Stockholm
                </H4>
            </PaddingDiv>

            <BorderDiv>
                <H3>Behöver du avboka?</H3>
                <H4>Väligen ange ditt bokningsnummer: </H4>
                <input 
                    type="text" 
                    onChange={handleChange} 
                    value={bookingId} 
                    name="bookingId" 
                    onBlur={() => setTouched({...touched, bookingIdNr: true})} 
                />
                <button disabled={disableSubmitInput} onClick = {() => customerDeleteBooking(bookingId)}>Avboka</button>
                {bookingCancelled}
                {touched.bookingIdNr && <p>{error.bookingIdError.bookingIdNr}</p>}
            </BorderDiv>
        </section>
    );
};