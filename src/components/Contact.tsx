import { ChangeEvent, useEffect, useState } from "react";
import { deleteBooking } from "../services/DeleteBookingService";
import { BorderDiv, PaddingDiv } from "./styled-components/Divs";
import { H2, H3, H4 } from "./styled-components/Headings";

export function Contact() {
    
    const [bookingId, setbookingId] = useState("");
    const [bookingCancel, setBookingCancel] = useState(false);
    const [disableSubmitInput, setDisableSubmitInput] = useState(true);

    //Används för att kolla om användaren har markerat fältet
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

    //Validerar input-fälten och ger meddelanden beroende på felet
    function validation() {               

        if(!bookingId) {
            error.bookingIdError.bookingIdNr = "Ditt bokningsId består av 24 tecken och finns i det bekräftelsemail du fick vid bokningen."
            error.bookingIdError.approved = false
        } else if (!bookingId.match(/^\S{24}$/)) {
            error.bookingIdError.bookingIdNr = "Vänligen fyll i en korrekt bokningsID";
            error.bookingIdError.approved = false;
        } else {
            error.bookingIdError.bookingIdNr = ""
            error.bookingIdError.approved = true;
        }
        setError(error);    
    }

    // Hanterar input för avbokning
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
                <H4>E-post: kitchenonfire@restaurang.se</H4>
            </PaddingDiv>

            <img id="muffinFireImg" src={require("../assets/muffin-fire.jpg")} alt="red-chili-in-flames"/>

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
                <H4>Vänligen ange ditt bokningsnummer: </H4>
                <input 
                    type="text" 
                    onChange={handleChange} 
                    value={bookingId} 
                    name="bookingId" 
                    onSelect={() => setTouched({...touched, bookingIdNr: true})} 
                />
                <button disabled={disableSubmitInput} onClick = {() => customerDeleteBooking(bookingId)}>Avboka</button>
                {bookingCancelled}
                {touched.bookingIdNr && <p>{error.bookingIdError.bookingIdNr}</p>}
            </BorderDiv>
        </section>
    );
};