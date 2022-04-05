import { useEffect, useState } from "react";
import { IGetBooking } from "../models/IGetBooking";
import { GetBookingsService } from "../services/GetBookingsService";

export function Admin() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        let service = new GetBookingsService();

        service.getBookings()
        .then(bookings => {
            console.log(bookings)
            setBookings(bookings);

            return bookings;
        })
    }, []);

    let booking = bookings.map((booking: IGetBooking) => {
        return <>
            <h2>{booking.customerId}</h2>
            <h2>{booking.date}</h2>
            <h2>{booking.id}</h2>
            <h2>{booking.numberOfGuests}</h2>
            <h2>{booking.restaurantId}</h2>
            <h2>{booking.time}</h2>
        </>
    })

    return(
        <section>
            <p>Admin</p>
            <div>
                {booking}
            </div>
        </section>
    );
};