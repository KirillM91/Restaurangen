import { ChangeEvent, useEffect, useState } from "react";
import { ChangeBooking } from "../models/ChangeBooking";
import { IGetBooking } from "../models/IGetBooking";
import { IGetCustomer } from "../models/IGetCustomer";
import { updateBooking } from "../services/ChangeBookingService";
import { deleteBooking } from "../services/DeleteBookingService";
import { GetBookingsService } from "../services/GetBookingsService";
import { GetCustomerService } from "../services/GetCustomerService";
import { DeleteButton } from "./styled-components/Buttons";
import { BookingDiv, ChangeBookingDiv } from "./styled-components/Divs";

export function Admin() {

    const [bookings, setBookings] = useState<IGetBooking[]>([]);
    const [customers, setCustomers] = useState<IGetCustomer[]>([]);
    const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
    const [disablePlus, setDisablePlus] = useState(false);
    const [disableMinus, setDisableMinus] = useState(false);

    const [changeBooking, setChangeBooking] = useState<ChangeBooking>({    
        date: "",
        time: "",
        numberOfGuests: 0,
    });
    
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


    //Uppdaterar renderingen av antalet gäster samt uppdaterar numberOfGuests i changeBooking
    useEffect(() => {
        if (numberOfGuests >= 6) {
            setDisablePlus(true);
        } else {
            setDisablePlus(false);
        };

        if (numberOfGuests <= 1) {
            setDisableMinus(true);
        } else {
            setDisableMinus(false);
        };

        setChangeBooking({...changeBooking, numberOfGuests: numberOfGuests});                

    }, [numberOfGuests]);

    // function checkCutomerArray(){
    //     console.log(customers);
        
    // }

    function adminDeleteBooking(bookingId: string) {
        // let service = new GetBookingsService();
    
        deleteBooking(bookingId)
        // service.getBookings()
        // .then(bookingsResponse => {
        //     setBookings(bookingsResponse);
        //     console.log("Bokningar:", bookingsResponse)
        // }) 
    }


    // Uppdatera värde vid förändring genom input
    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        let name: string | number = e.target.name;
            
        setChangeBooking({...changeBooking, [name]: e.target.value});       
        
        console.log(changeBooking)
    }


    // När "Ändra bokning" klickas på. Kör put-funktion i service
    function adminChangeBooking(bookingId: string, customerId: string) {
        
        updateBooking(bookingId, changeBooking, customerId);
    };


    let customer = customers.map((customer: IGetCustomer, j: number) => {

        for (let i = 0; i < bookings.length; i++) {
        // bookings.map((booking: IGetBooking) => {
            if (customer._id === bookings[i].customerId) {
                return ( 
                    <BookingDiv key={j}>
                        <h3>KundId: {customer._id}</h3>
                        <p>Förnamn: {customer.name}</p>
                        <p>Efternamn: {customer.lastname}</p>
                        <p>Telnr: {customer.phone}</p>
                        <p>E-mail: {customer.email}</p>
                 
                        {/* <p>KundId: {bookings[i].customerId}</p> */}
                        <p>Datum: {bookings[i].date}</p>
                        <p>BokningsId: {bookings[i]._id}</p>
                        <p>Antal personer: {bookings[i].numberOfGuests}</p>
                        {/* <p>RestaurangId: {bookings[i].restaurantId}</p> */}
                        <p>Bokad tid: {bookings[i].time}</p>
                        <DeleteButton onClick = {() => adminDeleteBooking(bookings[i]._id)}>Ta bort bokning</DeleteButton>
                        
                        <ChangeBookingDiv>
                            <h3>Ändra bokningen: </h3>
                            <span>Antal gäster: {numberOfGuests}</span>
                            <button onClick = {() => setNumberOfGuests(numberOfGuests +1)} disabled={disablePlus}>+</button>
                            <button onClick = {() => setNumberOfGuests(numberOfGuests -1)} disabled={disableMinus}>-</button>
                        </ChangeBookingDiv>

                        <form>
                            <ChangeBookingDiv>
                                <label htmlFor="date"> Datum: </label>
                                <input type="date" name="date" onChange={handleInput}/>
                            </ChangeBookingDiv>

                            <ChangeBookingDiv>
                                <label htmlFor="time"> Tid: </label>
                                <input type="text" name="time" value={changeBooking.time} onChange={handleInput}/>
                            </ChangeBookingDiv>
                        </form>
                        <ChangeBookingDiv>
                            <button onClick = {() => adminChangeBooking(bookings[i]._id, bookings[i].customerId)}>Ändra bokning</button>
                        </ChangeBookingDiv>

                    </BookingDiv> 
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
            {/* <button onClick={checkCutomerArray}>Click</button> */}
        </section>
    );
};