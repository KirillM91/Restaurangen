import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { IPostBooking } from "../../models/IPostBooking";
import { CheckAvailability } from "./CheckAvailability";

export function Booking() {

    const restaurantId = "624aa9f0df8a9fb11c3ea8aa"
    const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
    const [disablePlus, setDisablePlus] = useState(false);
    const [disableMinus, setDisableMinus] = useState(false);
    
    const [newBooking, setNewBooking] = useState<IPostBooking>({    
        restaurantId: restaurantId,
        date: "2022-01-01",
        time: "21:00",
        numberOfGuests: 0,
        customer: {
            name: "",
            lastname: "",
            email: "",
            phone: ""
        }  
    });

    //Sätter användarens värden, från förmuläret, in i newBooking.customer objektet
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let name = event.target.name;
        setNewBooking({...newBooking, [name]: event.target.value});              
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


    return(
        <div>
            <p>Booking</p>
            <CheckAvailability></CheckAvailability>

            <div>
                <p>Antal gäster: {numberOfGuests}</p>
                <button onClick = {() => setNumberOfGuests(numberOfGuests +1)} disabled={disablePlus}>+</button>
                <button onClick = {() => setNumberOfGuests(numberOfGuests -1)} disabled={disableMinus}>-</button>
            </div>

            <form>
                <label htmlFor="name"> Namn: </label>
                <input type="text" name="name" value={newBooking.customer.name} onChange={handleChange} id="name" />
                <br/>
                
                <label htmlFor="lastname"> Efternamn: </label>
                <input type="text" name="lastname" value={newBooking.customer.lastname} onChange={handleChange} id="lastname"/>
                <br/>

                <label htmlFor="email"> E-post: </label>
                <input type="text" name="email" value={newBooking.customer.email} onChange={handleChange} id="email"/>
                <br/>

                <label htmlFor="phone"> Telefon nr: </label>
                <input type="text" name="phone" value={newBooking.customer.phone} onChange={handleChange} id="phone"/>
                <br/>
            </form>
            <button onClick={submitBooking}>Boka bord</button>
        </div>
    );
};