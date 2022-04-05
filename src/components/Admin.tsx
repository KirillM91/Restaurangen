import { useEffect, useState } from "react";
import { IGetBooking } from "../models/IGetBooking";
import { IGetCustomer } from "../models/IGetCustomer";
import { GetBookingsService } from "../services/GetBookingsService";
import { GetCustomerService } from "../services/GetCustomerService";

export function Admin() {

    const [bookings, setBookings] = useState<IGetBooking[]>([]);
    const [customers, setCustomers] = useState<IGetCustomer[]>([]);
    

    useEffect(() => {
        let service = new GetBookingsService();
        let customerService = new GetCustomerService();
        

        service.getBookings()
        .then(bookings => {
            console.log(bookings)
            setBookings(bookings);


            for(var booking in bookings) {            
                let customerId = bookings[booking].customerId;

                customerService.getCustomers(customerId)
                .then(customerServiceResponse => {
                    console.log("customer service response: ",customerServiceResponse)  
                }); 
            }
            
            // return bookings;  
                
        }) 
        
    }, []);

    let customer = customers.map((customer: IGetCustomer) => {
        return <>
            <h3>Customer Id: {customer._id}</h3>
            <p>Name: {customer.name}</p>
            <p>Lastname: {customer.lastname}</p>
            <p>Phone: {customer.phone}</p>
            <p>E-Mail: {customer.email}</p>
        </>
    })

    let booking = bookings.map((booking: IGetBooking) => {
        return <>
            <h3>Booking id: {booking._id}</h3>
            <p>Customer id: {booking.customerId}</p>
            <p>Number of guests: {booking.numberOfGuests}</p>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>

            {/* <h2>{booking.customerId}</h2>
            <h2>{booking.date}</h2>
            <h2>{booking.id}</h2>
            <h2>{booking.numberOfGuests}</h2>
            <h2>{booking.restaurantId}</h2>
            <h2>{booking.time}</h2> */}
        </>
    })

    return(
        <section>
            <p>Admin</p>
            <div>
                {customer}
                {booking}
            </div>
        </section>
    );
};