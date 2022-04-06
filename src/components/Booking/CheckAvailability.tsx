import { ChangeEvent, useEffect, useState } from "react";
import { IGetBooking } from "../../models/IGetBooking";
import { GetBookingsService } from "../../services/GetBookingsService";

export function CheckAvailability() {

    const [pickedDate, setPickedDate] = useState("");
    const [dateTaken, setdateTaken] = useState<Boolean>(true);
    const [bookings, setBookings] = useState([]);

    // Funktion som körs när inputfältet för datum ändras
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setPickedDate(e.target.value);
    }

    // Funktion för att hämta bokningar och se om bokning är möjlig
    function checkDate() {

        let service = new GetBookingsService();

        service.getBookings()
        .then(bookings => {
            setBookings(bookings)
            console.log(bookings)

            if (bookings === 0) {
                console.log("Ingen data, möjligt att boka");
                setdateTaken(false);
            } else {
                console.log("Det finns någon bokning någon dag");
                // Behöver kollas om det finns någon bokning vald dag
                if (bookings.date === pickedDate) {
                    console.log(bookings.date)
                    console.log(pickedDate)
                    console.log("Finns minst en bokning med valt datum");
                    // Kolla om det finns 15 bokningar eller fler för vald dag
                    if (bookings.length >= 15) {
                        console.log("Det finns minst 15 bokningar denna dag");
                    }
                } else {
                    console.log("Finns ingen bokning med valt datum");
                }
            }
        })
        // Fånga eventuellt error
        .catch((error: any) => {
            console.log("Error:", error)
            setdateTaken(false);
        });
    };

    let avaliablieTables = bookings.map((booking: IGetBooking) => {
        return <>
            <h2>{booking.date}</h2>
            <h2>{booking.time}</h2>
        </>
    })

    return(
        <div>
            <p>CheckAvailability</p>
            <input type="date" onChange={handleChange}></input>
            <button onClick={checkDate}>Se tillgänglighet</button>
            {!dateTaken && <p>Datum är tillgängligt</p>}
            {avaliablieTables}
        </div>
    );
};