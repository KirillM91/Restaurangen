import { useEffect, useState } from "react";
import { IGetBooking } from "../models/IGetBooking";
import { IGetCustomer } from "../models/IGetCustomer";
import { deleteBooking } from "../services/DeleteBookingService";
import { GetBookingsService } from "../services/GetBookingsService";
import { GetCustomerService } from "../services/GetCustomerService";

export function Admin() {

    const [bookings, setBookings] = useState<IGetBooking[]>([]);
    const [customers, setCustomers] = useState<IGetCustomer[]>([]);
    
    let customerArray: IGetCustomer[] = []

    useEffect(() => {
        let service = new GetBookingsService();
        // let customerService = new GetCustomerService();
        

        service.getBookings()
        .then(bookingsResponse => {
            setBookings(bookingsResponse);
            console.log("Bokningar:", bookingsResponse)
        }) 
        
    }, []);

    useEffect(() => {
        let customerService = new GetCustomerService();

        customerArray = [];
        
        for(var booking in bookings) {            
            let customerId = bookings[booking].customerId;

            customerService.getCustomers(customerId)
            .then(customerServiceResponse => {
                // console.log("customer service response: ",customerServiceResponse) 
                customerArray.push(customerServiceResponse)
                setCustomers(customerArray.flat())
                
                
                // setCustomers(flatCustomerArray.flat()) 
                
                
            }); 
        }   
        console.log("customers", customers);  
    }, [bookings])

    function checkCutomerArray(){
        console.log(customers);
        
    }

    function adminDeleteBooking(bookingId: string) {
        // let service = new GetBookingsService();
    
        deleteBooking(bookingId)
        // service.getBookings()
        // .then(bookingsResponse => {
        //     setBookings(bookingsResponse);
        //     console.log("Bokningar:", bookingsResponse)
        // }) 
    }

    let customer = customers.map((customer: IGetCustomer, j: number) => {

        for (let i = 0; i < bookings.length; i++) {
        // bookings.map((booking: IGetBooking) => {
            if (customer._id === bookings[i].customerId) {
                return (
                    
                    <div key={j}>
                        <h3>Customer Id: {customer._id}</h3>
                        <p>Name: {customer.name}</p>
                        <p>Lastname: {customer.lastname}</p>
                        <p>Phone: {customer.phone}</p>
                        <p>E-Mail: {customer.email}</p>
                 
                        <p>KundId: {bookings[i].customerId}</p>
                        <p>Datum: {bookings[i].date}</p>
                        <p>BokningsId: {bookings[i]._id}</p>
                        <p>Antal personer: {bookings[i].numberOfGuests}</p>
                        <p>RestaurangId: {bookings[i].restaurantId}</p>
                        <p>Bokad tid: {bookings[i].time}</p>
                        <button onClick = {() => adminDeleteBooking(bookings[i]._id)}>Ta bort bokning</button>
                    </div>
                    
                    
                    )

            } 
        }
           
    
    })


    // })

    // let booking = bookings.map((booking: IGetBooking) => {
    //     customers.map((customer: IGetCustomer, i: number) => {
    //     return( 
    //     <div key={booking._id}>
    //         <h1>{customer.name}</h1>
    //         <h3>Booking id: {booking._id}</h3>
    //         <p>Customer id: {booking.customerId}</p>
    //         <p>Number of guests: {booking.numberOfGuests}</p>
    //         <p>Date: {booking.date}</p>
    //         <p>Time: {booking.time}</p>

    //         {/* customers.map((customer: IGetCustomer) => {
      
    //     <div>
    //         <h3>Customer Id: {customer._id}</h3>
    //         <p>Name: {customer.name}</p>
    //         <p>Lastname: {customer.lastname}</p>
    //         <p>Phone: {customer.phone}</p>
    //         <p>E-Mail: {customer.email}</p>
    //     </div>

    // }) */}
        

    //         {/* <h2>{booking.customerId}</h2>
    //         <h2>{booking.date}</h2>
    //         <h2>{booking.id}</h2>
    //         <h2>{booking.numberOfGuests}</h2>
    //         <h2>{booking.restaurantId}</h2>
    //         <h2>{booking.time}</h2> */}
    //     </div>
    //     )
    //     })
    // })

    return(
        <section>
            <p>Admin</p>
            <div> 
                {customer}
            </div>
            <button onClick={checkCutomerArray}>Click</button>
        </section>
    );
};