import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { IPostBooking } from "../../models/IPostBooking";
import { IPostCustomer } from "../../models/IPostCustomer";
import { CancelBooking } from "./CancelBooking";
import { CheckAvailability } from "./CheckAvailability";

export function Booking() {

    const restaurantId = "624aa9f0df8a9fb11c3ea8aa"
    const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
    const [disablePlus, setDisablePlus] = useState(false);
    const [disableMinus, setDisableMinus] = useState(false);
    const [disabledInput, setDisabledInput] = useState(true);
    const [bookingOk, setBookingOk] = useState(false);
    const [confirmGDPR, setConfirmGDPR] = useState(false);

    const [customer, setCustomer] = useState<IPostCustomer>({
        name: "",
        lastname: "",
        email: "",
        phone: ""
    });
    
    const [newBooking, setNewBooking] = useState<IPostBooking>({    
        restaurantId: restaurantId,
        date: "",
        time: "",
        numberOfGuests: 0,
        customer: customer 
    });

    //Sätter användarens värden, från förmuläret, in i newBooking.customer objektet
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let name: string = event.target.name;
        
        setCustomer({...customer, [name]: event.target.value});        
        setNewBooking({...newBooking, customer: customer})      
    };  

    //Skapar en post request med en ny bokning
    function submitBooking(){
        
        axios.post("https://school-restaurant-api.azurewebsites.net/booking/create", 
        newBooking,
        {headers: {"content-type": "application/json"}}
        )
        .then(response => {console.log(response.data)})
        .catch(error => {console.log(error)});

        console.log(newBooking);

        setBookingOk(true);
        
    }

    //Uppdaterar renderingen av antalet gäster samt uppdaterar numberOfGuests i newBooking
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

        setNewBooking({...newBooking, numberOfGuests: numberOfGuests});                

    }, [numberOfGuests]);

    // Tar emot värde från CheckAvailability
    function childToParentDate(childDataDate: string) {
        console.log(childDataDate)
        setNewBooking({...newBooking, date: childDataDate})
        
    };

    function childToParentTime(childDataTime: string) {
        console.log(childDataTime)
        
        setNewBooking({...newBooking, time: childDataTime})
        setDisabledInput(false)
    };

    function testFunk() {
        console.log("new booking test: ", newBooking);
        
    }

    // Olika symboler beroende på om GDPR är godkänt eller inte
    let submitGDPR = 
    <>◻</>
    if (confirmGDPR) {
        submitGDPR =
        <>✔</>
    };

    // Om bokning är genomförd ska bekräftelse visas
    let bookingDone = 
    <></>
    if (bookingOk) {
        bookingDone =
        <div>
            <p>Din bokning har nu genomförts. Vi ser fram emot ditt besök!</p>
        </div>
    };

    return(
        <div>
            {/* <p>Booking</p> */}
            <CheckAvailability childToParentDate={childToParentDate} childToParentTime={childToParentTime}></CheckAvailability>

            <div>
                <p>Antal gäster: {numberOfGuests}</p>
                <button onClick = {() => setNumberOfGuests(numberOfGuests +1)} disabled={disablePlus}>+</button>
                <button onClick = {() => setNumberOfGuests(numberOfGuests -1)} disabled={disableMinus}>-</button>
            </div>

            <form>
                <label htmlFor="name"> Namn: </label>
                <input disabled={disabledInput} type="text" name="name" onChange={handleChange} value={customer.name} id="name" />
                <br/>
                
                <label htmlFor="lastname"> Efternamn: </label>
                <input disabled={disabledInput} type="text" name="lastname" onChange={handleChange} value={customer.lastname} id="lastname"/>
                <br/>

                <label htmlFor="email"> E-post: </label>
                <input disabled={disabledInput} type="text" name="email" onChange={handleChange} value={customer.email} id="email"/>
                <br/>

                <label htmlFor="phone"> Telefon nr: </label>
                <input disabled={disabledInput} type="text" name="phone" onChange={handleChange} value={customer.phone} id="phone"/>
                <br/>
            </form>
            <p><span onClick = {() => setConfirmGDPR(true)}>{submitGDPR}</span>Jag godkänner Kitchen on Fires-villkor för personuppgiftshantering (GDPR)</p>
            <button disabled={disabledInput && !confirmGDPR} onClick={submitBooking}>Boka bord</button>
            <button onClick={testFunk}>Testa conssole log</button>

            {bookingDone}
            <CancelBooking></CancelBooking>
        </div>
    );
};