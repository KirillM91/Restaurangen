import { ChangeEvent, useEffect, useState } from "react";
import { IPostBooking } from "../../models/IPostBooking";
import { IPostCustomer } from "../../models/IPostCustomer";
import { CheckAvailability } from "./CheckAvailability";

export function Booking() {

    const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
    const [disablePlus, setDisablePlus] = useState(false);
    const [disableMinus, setDisableMinus] = useState(false);
    
    const [newCustomer, setNewCustomer] = useState<IPostCustomer>({
        name: "",
        lastname: "",
        email: "",
        phone: ""
    });
    
    const [newBooking, setNewBooking] = useState<IPostBooking>({    
        restaurantId: "624aa9f0df8a9fb11c3ea8aa",
        date: "",
        time: "",
        numberOfGuests: numberOfGuests,
        customer: newCustomer      
    });

    //Sätter användarens värden, från förmuläret, in i newCustomer objektet
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let name = event.target.name;
        setNewCustomer({...newCustomer, [name]: event.target.value})        
    };

    //(I framtiden) Skapar en post request med en ny bokning
    function submtBooking(){
        console.log("kund:", newCustomer);
        console.log("bokning:", newBooking);
        
    }

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

    });


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
                <input type="text" name="name" value={newCustomer.name} onChange={handleChange} id="name" />
                <br/>
                
                <label htmlFor="lastname"> Efternamn: </label>
                <input type="text" name="lastname" value={newCustomer.lastname} onChange={handleChange} id="lastname"/>
                <br/>

                <label htmlFor="email"> E-post: </label>
                <input type="text" name="email" value={newCustomer.email} onChange={handleChange} id="email"/>
                <br/>

                <label htmlFor="phone"> Telefon nr: </label>
                <input type="text" name="phone" value={newCustomer.phone} onChange={handleChange} id="phone"/>
                <br/>
            </form>
            <button onClick={submtBooking}>Boka bord</button>
        </div>
    );
};