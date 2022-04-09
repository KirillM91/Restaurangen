import { ChangeEvent, useState } from "react"
import { deleteBooking } from "../../services/DeleteBookingService"

export function CancelBooking () {

    const [bookingId, setbookingId] = useState("");

    function customerDeleteBooking(booking: string) {
    
        deleteBooking(booking)
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let id: string = e.target.value;
        
        setbookingId(id); 
    }

    return(
        <div>
            <h2>Behöver du avboka? Väligen ange ditt bokningsnummer: </h2>
            <input type="text" onChange={handleChange} value={bookingId}/>
            <button onClick = {() => customerDeleteBooking(bookingId)}>Avboka</button>
        </div>
    )
}