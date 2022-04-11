import { ChangeEvent, useEffect, useState } from "react";
import { IPostBooking } from "../../models/IPostBooking";
import { IPostCustomer } from "../../models/IPostCustomer";
import { PostNewBooking } from "../../services/PostNewBooking";
import { PlusMinusButton } from "../styled-components/Buttons";
import { BorderDiv, PaddingDiv, WrongInputDiv } from "../styled-components/Divs";
import { CheckAvailability } from "./CheckAvailability";

export function Booking() {

    const restaurantId = "624aa9f0df8a9fb11c3ea8aa"
    const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
    const [disablePlus, setDisablePlus] = useState(false);
    const [disableMinus, setDisableMinus] = useState(false);
    const [disableInput, setDisableInput] = useState(true);
    const [bookingOk, setBookingOk] = useState(false);
    const [confirmGDPR, setConfirmGDPR] = useState(false);
    const [disableSubmitInput, setDisableSubmitInput] = useState(true)

    //Används för att kolla om användaren har varit inne i fältet 
    //och ger ett felmedelande först när användaren har lämnat fältet
    const [touched, setTouched] = useState({
        name: false,
        lastname: false,
        email: false,
        phone: false
    });

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

    //Approved, för att kolla om fältet är korrekt ifyllt andvänds sen som en condition för att enable'a submit knappen
    const [error, setError] = useState({
        nameError: {
            name: "",
            approved: false
        },
        lastnameError: {
            lastname: "",
            approved: false
        },
        emailError: {
            email: "",
            approved: false
        },
        phoneError: {
            phone: "",
            approved: false
        }
    });

    //Validerar input fälten och ger medelanden beroende på felet
    //Borde nog flyttas till en egen komponent
    function validation() {               

        //namn
        // trim() tar bort alla mellanslag i värdet
        if(!customer.name.trim()) {
            error.nameError.name = "Vänligen fyll i ditt namn"
            error.nameError.approved = false
        } else {
            error.nameError.name = ""
            error.nameError.approved = true
        }

        //efternamn
        if(!customer.lastname.trim()) {
            error.lastnameError.lastname = "Vänligen fyll i ditt efternamn"
            error.lastnameError.approved = false
        } else {
            error.lastnameError.lastname = ""
            error.lastnameError.approved = true
        }

        //email
        // ^ = Början på strängen, $ = Strängens slut
        // \S = Alla karaktärer utom mellanslag
        // + Tillåter oändligt många av föregående karaktär (bara \S skulle bara tillåta en karaktär) 
        // @ = @
        // \. = Punkt        
        if(!customer.email.trim()) {
            error.emailError.email = "Vänligen fyll i din email adress"
            error.emailError.approved = false
        } else if (!customer.email.match(/^\S+@\S+\.\S+$/)) {
            error.emailError.email = "Vänligen fyll i en korrekt email adress"
            error.emailError.approved = false
        } else {
            error.emailError.email = ""
            error.emailError.approved = true
        }

        //telefon
        // 07 = 07
        // \d = Bara siffror 0-9 tillåtna
        // {8} = Hur många \d karaktärer måste finnas (8 i det här fallet) 
        if(!customer.phone.trim()) {
            error.phoneError.phone = "Vänligen fyll i ditt nummer"
            error.phoneError.approved = false
        } else if (!customer.phone.match(/^07\d{8}$/)) {
            error.phoneError.phone = "Vänligen fyll i korrekt ett korrekt nummer (07[8 siffror])"
            error.phoneError.approved = false
        } else {
            error.phoneError.phone = ""
            error.phoneError.approved = true
        }
        
        setError(error);        
    };

    //Sätter användarens värden, från förmuläret, in i newBooking.customer objektet
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let name = event.target.name;        
        setCustomer({...customer, [name]: event.target.value});
    };

    //Skapar en post request med en ny bokning
    function submitBooking(){
        PostNewBooking(newBooking);
        setBookingOk(true);        
    };

    //Kollar om alla fält är korrekt ifyllda och att GDPR boxen är intryckt, innan användaren kan skicka bokningen
    useEffect(() => {
        if(
            confirmGDPR === true && 
            error.nameError.approved === true &&
            error.lastnameError.approved === true &&
            error.emailError.approved === true &&
            error.phoneError.approved === true 
        ) {
            setDisableSubmitInput(false);
        } else {
            setDisableSubmitInput(true);
        }
    });

    //Kör valideringen och sätter nya värden i bokningen när fälten(customer) ändras
    useEffect(() => {
        validation();
        setNewBooking({...newBooking, customer: customer});        
    }, [customer]);

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
        console.log(childDataDate);
        setNewBooking({...newBooking, date: childDataDate});
    };

    function childToParentTime(childDataTime: string) {
        console.log(childDataTime);
        setNewBooking({...newBooking, time: childDataTime});
        setDisableInput(false);
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
            <PaddingDiv>
                <CheckAvailability childToParentDate={childToParentDate} childToParentTime={childToParentTime}></CheckAvailability>
            </PaddingDiv>  

            <BorderDiv>
                <p>Antal gäster: {numberOfGuests}</p>
                <PlusMinusButton onClick = {() => setNumberOfGuests(numberOfGuests +1)} disabled={disablePlus}>+</PlusMinusButton>
                <PlusMinusButton onClick = {() => setNumberOfGuests(numberOfGuests -1)} disabled={disableMinus}>-</PlusMinusButton>
            </BorderDiv>

            <form>
                <label htmlFor="name"> Namn: </label>
                <input 
                    disabled={disableInput} 
                    type="text" 
                    name="name" 
                    onChange={handleChange} 
                    value={customer.name} 
                    id="name"
                    onBlur={() => setTouched({...touched, name: true})}                 
                />
                <br/>
                
                <label htmlFor="lastname"> Efternamn: </label>
                <input 
                    disabled={disableInput} 
                    type="text" 
                    name="lastname" 
                    onChange={handleChange} 
                    value={customer.lastname} 
                    id="lastname"
                    onBlur={() => setTouched({...touched, lastname: true})} 
                />
                <br/>

                <label htmlFor="email"> E-post: </label>
                <input 
                    disabled={disableInput} 
                    type="text" 
                    name="email" 
                    onChange={handleChange} 
                    value={customer.email} 
                    id="email"
                    onBlur={() => setTouched({...touched, email: true})} 
                />
                <br/>

                <label htmlFor="phone"> Telefon nr: </label>
                <input 
                    disabled={disableInput} 
                    type="text" 
                    name="phone" 
                    onChange={handleChange} 
                    value={customer.phone} 
                    id="phone"
                    onBlur={() => setTouched({...touched, phone: true})} 
                />
                <br/>
                
                <input 
                    type="checkbox"
                    id="GDPRcheckbox"                    
                    onClick={() => setConfirmGDPR(!confirmGDPR)}
                />
                <label id="labelGDPRcheckbox" htmlFor="GDPRcheckbox">Jag godkänner Kitchen on Fires-villkor för personuppgiftshantering (GDPR)</label>
                <br/>
                
            </form>

            <WrongInputDiv>
                {touched.name && <p>{error.nameError.name}</p>}
                {touched.lastname && <p>{error.lastnameError.lastname}</p>}
                {touched.email && <p>{error.emailError.email}</p>}
                {touched.phone && <p>{error.phoneError.phone}</p>}
            </WrongInputDiv>

            <button disabled={disableSubmitInput} onClick={submitBooking}>Boka bord</button>
            
            {bookingDone}
        </div>
    );
};