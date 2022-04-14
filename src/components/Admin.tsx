import { ChangeEvent, useEffect, useState } from "react";
import { ChangeBooking } from "../models/ChangeBooking";
import { IGetBooking } from "../models/IGetBooking";
import { IGetCustomer } from "../models/IGetCustomer";
import { updateBooking } from "../services/ChangeBookingService";
import { deleteBooking } from "../services/DeleteBookingService";
import { GetBookingsService } from "../services/GetBookingsService";
import { GetCustomerService } from "../services/GetCustomerService";
import { ChangeButton, DeleteButton } from "./styled-components/Buttons";
import { BookingDiv, BorderBookingDiv, ChangeBookingDiv, TransparentDiv } from "./styled-components/Divs";
import { H2, H3 } from "./styled-components/Headings";
import { NrOfGuests, WordBreakOK } from "./styled-components/Paragraf";

export function Admin() {
    
    const [bookings, setBookings] = useState<IGetBooking[]>([]);
    const [customers, setCustomers] = useState<IGetCustomer[]>([]);
    const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
    const [disablePlus, setDisablePlus] = useState(false);
    const [disableMinus, setDisableMinus] = useState(false);
    const [changeBookingAdmin, setChangeBookingAdmin] = useState<null | number>();
    const [updateConfirmation, setUpdateConfirmation] = useState(false);

    const [changeBooking, setChangeBooking] = useState<ChangeBooking>({    
        date: "",
        time: "",
        numberOfGuests: 0,
    });
    
    let customerArray: IGetCustomer[] = [];
    let service = new GetBookingsService();
    let customerService = new GetCustomerService();

    useEffect(() => {

        service.getBookings()
        .then(bookingsResponse => {
            setBookings(bookingsResponse);
            console.log("Bokningar:", bookingsResponse)
        }) 
    }, [updateConfirmation]);

    
    useEffect(() => {  

        for(var booking in bookings) {            
            let customerId = bookings[booking].customerId;

            customerService.getCustomers(customerId)
            .then(customerServiceResponse => {
                customerArray.push(customerServiceResponse)
                setCustomers(customerArray.flat())
            }); 
        }   
    }, [bookings]);

    function checkCustomerArray() {
        console.log("customers", customers);
        console.log("bookings", bookings);
    };

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


    function adminDeleteBooking(bookingId: string, customerId: string) {
        // let service = new GetBookingsService();
    
        deleteBooking(bookingId);

        //===WIP===

        let bookingIds = bookings.map(customerId => customerId.customerId)
        let i = bookingIds.indexOf(customerId)        
        bookings.splice(i, 1)

        setBookings(bookings.filter(item => item.customerId !== customerId))


        let customerIds = customers.map(userId => userId._id)
        let j = customerIds.indexOf(customerId)       
        customers.splice(j, 1)
        
        setCustomers(customers.filter(item => item._id !== customerId))
        

        // console.log("i: ", i, "j: ", j)
        console.log(customerId);
        

        console.log("delet funk customers", bookings);
        console.log("delet funk bookings", customers);
    };


    // Uppdatera värde vid förändring genom input
    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        let name: string | number = e.target.name;
            
        setChangeBooking({...changeBooking, [name]: e.target.value});       
        
        console.log(changeBooking)
    };


    // När "Ändra bokning" klickas på. Kör put-funktion i service
    function adminChangeBooking(bookingId: string, customerId: string) {
    
        updateBooking(bookingId, changeBooking, customerId);


        setUpdateConfirmation(true);
    };

    // Vid tryck på Ändra boknings-knappen, togglar om rutan ska visas eller ej
    function printChangeBooking(j:number) {
        setChangeBookingAdmin(
            changeBookingAdmin === j ? null : j
        )
        console.log(j)
    };

    // Om bokning är genomförd ska bekräftelse visas
    let updateDone = 
    <></>
    if (updateConfirmation) {
        updateDone =
        <TransparentDiv>
            <H3>Bokningen är nu uppdaterad.</H3>
            <br></br>
            <H3></H3>
            <br></br>
            <button onClick = {() => setUpdateConfirmation(false)}>Se alla bokningar</button>
        </TransparentDiv>
    };

    // Skriva ut bokningarna
    let customer = customers.map((customer: IGetCustomer, j: number) => {
        for (let i = 0; i < bookings.length; i++) {
            if (customer._id === bookings[i].customerId) {
                return ( 
                    <BookingDiv key={j}>
                        <WordBreakOK>KundId: {customer._id}</WordBreakOK> 
                        <br></br>
                        <p>Förnamn: {customer.name}</p> 
                        <p>Efternamn: {customer.lastname}</p> 
                        <br></br>
                        <p>Telnr: {customer.phone}</p>
                        <WordBreakOK>E-mail: {customer.email}</WordBreakOK> 
                        <br></br>
                
                        {/* <p>KundId: {bookings[i].customerId}</p> */}
                        <p>Datum: {bookings[i].date}</p>
                        {bookings[i].numberOfGuests <= 6 && <p>Antal personer: {bookings[i].numberOfGuests}</p>}
                        {bookings[i].numberOfGuests > 6 && <NrOfGuests>Antal personer: {bookings[i].numberOfGuests}</NrOfGuests>}
                        {/* <p>RestaurangId: {bookings[i].restaurantId}</p> */}
                        <p>Bokad tid: {bookings[i].time}</p> 
                        <br></br>
                        <WordBreakOK>BokningsId: {bookings[i]._id}</WordBreakOK> 
                        <br></br>
                        <ChangeButton onClick = {() => printChangeBooking(j)}> Ändra bokning </ChangeButton>
                        <br></br>
                        <DeleteButton onClick = {() => adminDeleteBooking(bookings[i]._id, customer._id)}>Ta bort bokning</DeleteButton>
                    
                        {changeBookingAdmin === j && <div>
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
                                    <input type="text" name="time" value={changeBooking.time} onChange={handleInput}/>                                    </ChangeBookingDiv>
                            </form>
        
                            <ChangeBookingDiv>
                                <button onClick = {() => adminChangeBooking(bookings[i]._id, bookings[i].customerId)}>Ändra bokning</button>
                            </ChangeBookingDiv>
                        </div>}
                    </BookingDiv> 
                )
            } 
        }
    });

    // Visa alla bokningar om ändring av bokning ej är genomförd
    let bookingView = 
    <></>
    if (!updateConfirmation) {
        bookingView = 
        <>
            {customer}
        </>        
    }

    return(
        <section>
            <H2>Admin</H2>
            <TransparentDiv>
                OBS! Om en kund har en bokning och vill ändra till fler än sex personer 
                så behöver en avbokning göras för att sedan göra en ny bokning på bokningssidan.
            </TransparentDiv>
            <br></br>
            <BorderBookingDiv> 
                <H3>Bokningar</H3>
                {bookingView}
                {updateDone}
            </BorderBookingDiv>
            <button onClick={checkCustomerArray}>Click</button>
        </section>
    );
};