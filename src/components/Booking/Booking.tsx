import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IError } from "../../models/IError";
import { IPostBooking } from "../../models/IPostBooking";
import { IPostCustomer } from "../../models/IPostCustomer";
import { Itouched } from "../../models/ITouched";
import { PostNewBooking } from "../../services/PostNewBooking";
import { PlusMinusButton, SubmitButton } from "../styled-components/Buttons";
import { BorderDiv, PaddingDiv, TransparentDiv, WrongInputDiv } from "../styled-components/Divs";
import { FormInput } from "../styled-components/Forms";
import { H3, H4 } from "../styled-components/Headings";
import { SmallText, WordBreakOK } from "../styled-components/Paragraf";
import { CheckAvailability } from "./CheckAvailability";

export function Booking() {

    const restaurantId = "624aa9f0df8a9fb11c3ea8aa"
    const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
    const [disablePlus, setDisablePlus] = useState(false);
    const [disableMinus, setDisableMinus] = useState(false);
    const [disableInput, setDisableInput] = useState(true);
    const [bookingOk, setBookingOk] = useState(false);
    const [confirmGDPR, setConfirmGDPR] = useState(false);
    const [disableSubmitInput, setDisableSubmitInput] = useState(true);
    const [confirmation, setConfirmation] = useState(false);
    const [pickedDate, setPickedDate] = useState(false);
    const [numberOfTables18, setNumberOfTables18] = useState(0)
    const [numberOfTables21, setNumberOfTables21] = useState(0)


    //Används för att kolla om användaren har varit inne i fältet 
    //och ger ett felmeddelande först när användaren har lämnat fältet
    const [touched, setTouched] = useState<Itouched>({
        fname: false,
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
    const [error, setError] = useState<IError>({
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

    //Kollar om alla fält är korrekt ifyllda och att GDPR boxen är intryckt, innan användaren kan skicka bokningen
    useEffect(() => {
        if(
            newBooking.date !== "" &&            
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

    //Kör valideringen och sätter nya värden i bokningen när fälten (customer) ändras
    useEffect(() => {
        validation();
        setNewBooking({...newBooking, customer: customer});        
    }, [customer]);

    //Uppdaterar renderingen av antalet gäster samt uppdaterar numberOfGuests i newBooking
    useEffect(() => {
        let remainingTables18 = 15-numberOfTables18
        let remainingTables21 = 15-numberOfTables21

        if(newBooking.time === "18:00") {
            if(numberOfGuests === 6*remainingTables18 || numberOfGuests >=90) {
                setDisablePlus(true);    
            } else {
                setDisablePlus(false);
            };

        } 
        else if(newBooking.time === "21:00") {
            if(numberOfGuests === 6*remainingTables21 || numberOfGuests >=90) {
                setDisablePlus(true);    
            } else {
                setDisablePlus(false);
            };
        }

        if (numberOfGuests <= 1) {
            setDisableMinus(true);
        } else {
            setDisableMinus(false);
        };

        setNewBooking({...newBooking, numberOfGuests: numberOfGuests});
        console.log(numberOfTables18, newBooking.time, disablePlus)
        

    }, [numberOfGuests]);

    //Validerar input fälten och ger meddelanden beroende på felet
    function validation() {               

        //förnamn
        // trim() tar bort alla mellanslag i värdet
        if(!customer.name.trim()) {
            error.nameError.name = "Vänligen fyll i ditt förnamn"
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
            error.emailError.email = "Vänligen fyll i din e-post"
            error.emailError.approved = false
        } else if (!customer.email.match(/^\S+@\S+\.\S+$/)) {
            error.emailError.email = "Vänligen fyll i en korrekt e-post-adress"
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
            error.phoneError.phone = "Vänligen fyll i ditt telefonnummer"
            error.phoneError.approved = false
        } else if (!customer.phone.match(/^07\d{8}$/)) {
            error.phoneError.phone = "Vänligen fyll i ett korrekt telefonnummer (07[8 siffror])"
            error.phoneError.approved = false
        } else {
            error.phoneError.phone = ""
            error.phoneError.approved = true
        }
        setError(error);        
    };

    //Sätter användarens värden, från formuläret, in i newBooking.customer objektet
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        
        let name = event.target.name;        
        
        setCustomer({...customer, [name]: event.target.value});
    };

    //Skapar en post request med en ny bokning
    function submitBooking(){
     
        PostNewBooking(newBooking);
        
        setBookingOk(true);     
        setConfirmation(true);   
    };

    // Tar emot värde från CheckAvailability
    function childToParentDate(childDataDate: string) {
        // console.log("asd", childDataDate);
        setNewBooking({...newBooking, date: childDataDate});
    };

    function childToParentTime(childDataTime: string) {

        setNewBooking({...newBooking, time: childDataTime});

        setDisableInput(false);
        setPickedDate(true);
    };

    function childToParentTables18(childDataTables18: number) {

        setNumberOfTables18(childDataTables18);
    }

    function childToParentTables21(childDataTables21: number) {

        setNumberOfTables21(childDataTables21);
    }

    function resetNumberOfGuests(childData: number) {
        setNumberOfGuests(childData)
    }

    // Om kunden valt datum och tid ska kunden kunna välja antal gäster, 
    // fylla i uppgifter om sig själv, godkänna GDPR och bekräfta bokning
    let showInputUser =
    <></>
    if (pickedDate) {
        showInputUser = 
        <div>
            <div>
                {newBooking.time === "18:00" && <WordBreakOK>Det finns {15 - numberOfTables18} lediga bord {newBooking.date} kl. {newBooking.time}</WordBreakOK>}
                {newBooking.time === "21:00" && <WordBreakOK>Det finns {15 - numberOfTables21} lediga bord {newBooking.date} kl. {newBooking.time}</WordBreakOK>}
                <SmallText>Varje bord har upp till 6 sittplatser.</SmallText>
            </div>

            <BorderDiv>
                <p>Antal gäster: {numberOfGuests} </p>                
                <PlusMinusButton onClick = {() => setNumberOfGuests(numberOfGuests -1)} disabled={disableMinus || disableInput}>-</PlusMinusButton>
                <PlusMinusButton onClick = {() => setNumberOfGuests(numberOfGuests +1)} disabled={disablePlus || disableInput}>+</PlusMinusButton>
            </BorderDiv>

            <form>
            <label htmlFor="name"> Förnamn: </label>
            <FormInput
                approved={error.nameError.approved}
                touched={touched.fname!}                    
                disabled={disableInput} 
                type="text" 
                name="name" 
                onChange={handleChange} 
                value={customer.name} 
                id="name"
                onBlur={() => setTouched({...touched, fname: true})}                 
            /> 
            <br/>

            <label htmlFor="lastname"> Efternamn: </label>
            <FormInput 
                approved={error.lastnameError.approved} 
                touched={touched.lastname!}
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
            <FormInput
                approved={error.emailError.approved}
                touched={touched.email!}
                disabled={disableInput} 
                type="text" 
                name="email" 
                onChange={handleChange} 
                value={customer.email} 
                id="email"
                onBlur={() => setTouched({...touched, email: true})} 
                placeholder="epost@mail.se"
            />
            <br/>

            <label htmlFor="phone"> Telefonnr: </label>
            <FormInput
                approved={error.phoneError.approved}
                touched={touched.phone!}
                disabled={disableInput} 
                type="text" 
                name="phone" 
                onChange={handleChange} 
                value={customer.phone} 
                id="phone"
                onBlur={() => setTouched({...touched, phone: true})} 
                placeholder="07xxxxxxxx"
            />
            <br/><br/>
            <BorderDiv>
            <input 
                type="checkbox"
                id="GDPRcheckbox"                    
                onClick={() => setConfirmGDPR(!confirmGDPR)}
            />
            <label id="labelGDPRcheckbox" htmlFor="GDPRcheckbox">Jag godkänner Kitchen on Fires-villkor för personuppgiftshantering (GDPR)</label>
            </BorderDiv>
            <br/>

            </form>

            <SubmitButton disabled={disableSubmitInput} onClick={submitBooking}>Boka bord</SubmitButton>
        </div>
    }

    // Kunden ska kunna välja datum och tid för bokningen och se tillgängligheten
    let makeBooking = 
        <></>
    if (!confirmation) {
        makeBooking = 
        <div>      
            <PaddingDiv>
                <CheckAvailability 
                    resetNumberOfGuests={resetNumberOfGuests}
                    childToParentDate={childToParentDate} 
                    childToParentTime={childToParentTime}
                    childToParentTables18={childToParentTables18}
                    childToParentTables21={childToParentTables21}
                ></CheckAvailability>
            </PaddingDiv>  
                
            {showInputUser}  

            <WrongInputDiv>
                {touched.fname && <p>{error.nameError.name}</p>}
                {touched.lastname && <p>{error.lastnameError.lastname}</p>}
                {touched.email && <p>{error.emailError.email}</p>}
                {touched.phone && <p>{error.phoneError.phone}</p>}
            </WrongInputDiv>
        </div>
    } 

    // Om bokning är genomförd ska bekräftelse visas
    let bookingDone = 
    <></>
    if (confirmation) {
        bookingDone =
        <TransparentDiv>
            <H3>Din bokning har nu genomförts.</H3>
            <br/>
            <H3>Vi ser fram emot ditt besök den {newBooking.date} kl. {newBooking.time}!</H3>
            <br/>
            <H3>En bekräftelse har sänts via mail.</H3>
            <br/>
            <H4><Link to="/"> Gå till förstasidan</Link></H4>
        </TransparentDiv>
    };

    return(
        <>
            {makeBooking}
            {bookingDone}
        </>
    );
};