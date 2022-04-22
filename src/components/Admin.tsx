import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChangeBooking } from "../models/ChangeBooking";
import { IGetBooking } from "../models/IGetBooking";
import { IGetCustomer } from "../models/IGetCustomer";
import { updateBooking } from "../services/ChangeBookingService";
import { deleteBooking } from "../services/DeleteBookingService";
import { GetBookingsService } from "../services/GetBookingsService";
import { GetCustomerService } from "../services/GetCustomerService";
import { AdminButton, ChangeButton, DeleteButton } from "./styled-components/Buttons";
import { BookingDiv, BorderBookingDiv, BoxBooking, ChangeBookingDiv, PaddingDiv, TransparentDiv } from "./styled-components/Divs";
import { H2, H3, H4 } from "./styled-components/Headings";
import { UnderlineP, WordBreakOK } from "./styled-components/Paragraf";
import { BoldSpan } from "./styled-components/Span";

export function Admin() {
    
    const [bookings, setBookings] = useState<IGetBooking[]>([]);
    const [customers, setCustomers] = useState<IGetCustomer[]>([]);
    const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
    const [disablePlus, setDisablePlus] = useState(false);
    const [disableMinus, setDisableMinus] = useState(false);
    const [changeBookingAdmin, setChangeBookingAdmin] = useState<null | number>();
    const [updateConfirmation, setUpdateConfirmation] = useState(false);
    const [dateInput, setDateInput] = useState(false);
    const [timeInput, setTimeInput] = useState(false);

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
            let sortedBookingResponse = bookingsResponse.sort((a, b) => +new Date(a.date) - +new Date(b.date))
            setBookings(sortedBookingResponse);
        }) 
    }, [updateConfirmation]);

    
    useEffect(() => {  

        for(let booking in bookings) {            
            let customerId = bookings[booking].customerId;

            customerService.getCustomers(customerId)
            .then(customerServiceResponse => {
                customerArray.push(customerServiceResponse)
                setCustomers(customerArray.flat())
            }); 
        }   
    }, [bookings]);

    //Uppdaterar renderingen av antalet gäster samt uppdaterar numberOfGuests i changeBooking
    useEffect(() => {

        if (numberOfGuests <= 1) {
            setDisableMinus(true);
        } else {
            setDisableMinus(false);
        };

        setChangeBooking({...changeBooking, numberOfGuests: numberOfGuests});                

    }, [numberOfGuests]);

    function adminDeleteBooking(bookingId: string, customerId: string) {
    
        deleteBooking(bookingId);

        let bookingIds = bookings.map(customerId => customerId.customerId)
        let i = bookingIds.indexOf(customerId)        
        bookings.splice(i, 1)

        setBookings(bookings.filter(item => item.customerId !== customerId))


        let customerIds = customers.map(userId => userId._id)
        let j = customerIds.indexOf(customerId)       
        customers.splice(j, 1)
        
        setCustomers(customers.filter(item => item._id !== customerId))
    };


    // Uppdatera värde vid förändring genom input
    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        let name: string | number = e.target.name;
            
        setChangeBooking({...changeBooking, [name]: e.target.value});       
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
    };

    // Om bokning är genomförd ska bekräftelse visas
    let updateDone = 
    <></>
    if (updateConfirmation) {
        updateDone =
        <TransparentDiv>
            <H3>Bokningen är nu uppdaterad.</H3>
            <br/>
            <H3></H3>
            <br/>
            <button onClick = {() => setUpdateConfirmation(false)}>Se alla bokningar</button>
        </TransparentDiv>
    };
   
    // Visa bokningar samt möjlighet att ta bort och ändra bokningar
    let booking = bookings.map((booking: IGetBooking, j: number) => {
        for (let i = 0; i < customers.length; i++) {            
            if (booking.customerId === customers[i]._id) {

                return ( 
                    <BookingDiv key={j}>
                        <H4><BoldSpan>Namn: </BoldSpan>{customers[i].name} {customers[i].lastname}</H4> 
                        <p><BoldSpan>Telnr: </BoldSpan>{customers[i].phone}</p>
                        <WordBreakOK>
                            <BoldSpan>E-mail: </BoldSpan>
                            {customers[i].email}
                        </WordBreakOK> 
                        <br/>

                        <BoxBooking>
                            <p>{booking.date} kl. {booking.time}</p>

                            {booking.numberOfGuests <= 6 && 
                                <p>{booking.numberOfGuests} personer</p>
                            }

                            {booking.numberOfGuests > 6 && 
                                <p>
                                    <BoldSpan>! </BoldSpan>
                                    {booking.numberOfGuests} personer
                                    <BoldSpan> !</BoldSpan>
                                </p>
                            }
                        </BoxBooking>

                        <br/>

                        <WordBreakOK>
                            <BoldSpan>
                                <UnderlineP> BokningsId: </UnderlineP>
                            </BoldSpan>
                            {booking._id}
                        </WordBreakOK> 
                        <br/>
                        <ChangeButton onClick = {() => printChangeBooking(j)}> Ändra bokning </ChangeButton>
                        <br/>
                        <DeleteButton onClick = {() => adminDeleteBooking(booking._id, customers[i]._id)}>Ta bort bokning</DeleteButton>
                        
                        {changeBookingAdmin === j && <div>
                            <ChangeBookingDiv>
                                <h3>Ändra bokningen: </h3>
                                <br/>
                                <span>Antal gäster: {numberOfGuests}</span>
                                <AdminButton onClick = {() => setNumberOfGuests(numberOfGuests -1)} disabled={disableMinus}>-</AdminButton>
                                <AdminButton onClick = {() => setNumberOfGuests(numberOfGuests +1)} disabled={disablePlus}>+</AdminButton>
                                
                                <form>
                                    <label htmlFor="date"> Datum: </label>
                                    <input type="date" name="date" onChange={handleInput} onClick = {() => setDateInput(true)} />
                                </form>                                  
                                
                                <p>Ny tid: {changeBooking.time}</p>
                                <AdminButton onClick={() => { setChangeBooking({...changeBooking, time: "18:00"}); setTimeInput(true); }}>Kl. 18</AdminButton>  
                                <AdminButton onClick={() => { setChangeBooking({...changeBooking, time: "21:00"}); setTimeInput(true); }}>Kl. 21</AdminButton>                                   
                                <br/>
                                <AdminButton onClick = {() => adminChangeBooking(booking._id, booking.customerId)} disabled={!dateInput || !timeInput}>Ändra bokning</AdminButton>
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
            {booking}
        </>        
    }

    return(
        <section>
            <PaddingDiv>
                <H2>Admin</H2>
            </PaddingDiv>
            <TransparentDiv>
                <p>
                    <BoldSpan>OBS! </BoldSpan> 
                    Om en kund har en bokning och vill ändra till fler än sex personer 
                    så behöver en avbokning göras för att sedan göra en ny bokning på bokningssidan.
                </p>

                <br/><br/>

                <p>Klicka <BoldSpan><Link to="/booking">här</Link></BoldSpan> om du vill göra en ny bokning.</p>
            </TransparentDiv>

            <br/>
            
            <BorderBookingDiv>  
                <H3>Bokningar</H3>
                {bookingView}
                {updateDone}
            </BorderBookingDiv>
        </section>
    );
};