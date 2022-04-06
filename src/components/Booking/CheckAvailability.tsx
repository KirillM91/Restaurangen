import { ChangeEvent, useEffect, useState } from "react";
import { GetBooking } from "../../models/GetBooking";
import { IGetBooking } from "../../models/IGetBooking";
import { GetBookingsService } from "../../services/GetBookingsService";

export function CheckAvailability() {

    const [pickedDate, setPickedDate] = useState("");
    const [dateTaken, setdateTaken] = useState<Boolean>(true);
    const [bookings, setBookings] = useState<GetBooking[]>([]);

    // let timeList;

    useEffect(() => {

    }, [bookings])

    // Funktion som körs när inputfältet för datum ändras
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setPickedDate(e.target.value);
    }

    // Funktion för att hämta bokningar och se om bokning är möjlig
    function checkDate() {

        // timeList = [];

        console.log(pickedDate)

        let service = new GetBookingsService();

        service.getBookings()
        .then((bookingsResponse) => {

            let bookingsFromApi = bookingsResponse.map((booking: GetBooking) => {

                return new GetBooking (
                    booking._id,
                    booking.customerId,
                    booking.date,
                    booking.time,
                    booking.numberOfGuests,
                    booking.restaurantId,
                )
            })
            setBookings(bookingsFromApi);
            console.log(bookingsFromApi);
            console.log(bookingsResponse)
            console.log(bookings)

            for (var booking in bookingsFromApi) {
                if (bookingsFromApi[booking].date === pickedDate) {
                    for (var time in bookingsFromApi[booking]) {
                        if (bookingsFromApi[booking][time] === "22:00"){
                            console.log("22:00");
                                                        
                        }
                        if (bookingsFromApi[booking][time] === "21:00"){
                            console.log("21:00")
                        }
                    }
                } 
            }   
            console.log(bookingsFromApi[0].date);
        

            // if (bookings.length === 0) {
            //     console.log("Ingen data, möjligt att boka");
            //     setdateTaken(false);
            // } else {
            //     console.log("Det finns någon bokning någon dag");
            //     // Behöver kollas om det finns någon bokning vald dag
            //         console.log(bookings.date)
            //         console.log(pickedDate)
            //     if (bookings.date === pickedDate) {
            //         console.log("Finns minst en bokning med valt datum");
            //         // Kolla om det finns 15 bokningar eller fler för vald dag
            //         if (bookings.length >= 15) {
            //             console.log("Det finns minst 15 bokningar denna dag");
            //         }
            //     } else {
            //         console.log("Finns ingen bokning med valt datum");
            //     }
            // }
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