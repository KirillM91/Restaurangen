import React, { ChangeEvent, useEffect, useState } from "react";
import { GetBooking } from "../../models/GetBooking";
import { GetBookingsService } from "../../services/GetBookingsService";
import { ChoosenTimeButton, TimeButton } from "../styled-components/Buttons";
import { CheckAvailabilityDiv, TimeDiv } from "../styled-components/Divs";
import { Input } from "../styled-components/Forms";

interface IChildToParentProps {
    childToParentDate(newBookingDate: string): void;
    childToParentTime(newBookingTime: string): void;
    childToParentTables18(newTables18: number): void;
    childToParentTables21(newTables21: number): void;
    resetNumberOfGuests(newValue: number): void;
}

export function CheckAvailability(props: IChildToParentProps) {

    const [pickedDate, setPickedDate] = useState("");
    const [bookings, setBookings] = useState<GetBooking[]>([]);
    const [timeTaken18, setTimeTaken18] = useState(true);
    const [timeTaken21, setTimeTaken21] = useState(true);
    const [pickedTime, setPickedTime] = useState("");
    const [minDate, setMinDate] = useState<string>();
    const [picked18, setPicked18] = useState(false);
    const [picked21, setPicked21] = useState(false);

    let timeList18: number[] = [];
    let timeList21: number[] = [];

    let numberOfTables18 = []
    let numberOfTables21 = []
 
    let sumOfTables18: number = 0;
    let sumOfTables21: number = 0;


    // Sätter rätt datum för att passerade datum inte ska kunna väljas i bokningen
    useEffect(() => {
        if (new Date().getMonth() < 9 && new Date().getDate() < 10) {
            setMinDate(
                new Date().getFullYear() +
                "-" +
                "0" + (Number(new Date().getMonth()) + 1) +
                "-" +
                "0" + (Number(new Date().getDate()))
            )
        } else if (new Date().getMonth() < 9 && new Date().getDate() > 10) {
            setMinDate(
                new Date().getFullYear() +
                "-" +
                "0" + (Number(new Date().getMonth()) + 1) +
                "-" +
                new Date().getDate()
            )
        } else if (new Date().getMonth() > 9 && new Date().getDate() < 10) {
            setMinDate(
                new Date().getFullYear() +
                "-" +
                (Number(new Date().getMonth()) + 1) +
                "-" +
                "0" + (Number(new Date().getDate()))
            )
        } else {
            setMinDate(
                new Date().getFullYear() +
                "-" + 
                (Number(new Date().getMonth()) + 1) +
                "-" + 
                new Date().getDate()
            )
        }
    }, []);

    // Funktion som körs när inputfältet för datum ändras
    function handleChange(e: ChangeEvent<HTMLInputElement>) {

        props.childToParentDate(e.target.value);        
        setPickedDate(e.target.value);

        props.resetNumberOfGuests(1)

        timeList18 = [];
        timeList21 = [];

        let service = new GetBookingsService();

        service.getBookings()
        .then((bookingsResponse) => {
            // let bookingsFromApi: GetBooking[] = []
            let bookingsFromApi = bookingsResponse.map((booking: GetBooking) => {

                return new GetBooking (
                    booking._id,
                    booking.customerId,
                    booking.date,
                    booking.time,
                    booking.numberOfGuests,
                    booking.restaurantId,
                )
            })
        setBookings(bookingsFromApi);
        
        //Om bookingsFromApi är helt tom enablas tid knappar
        if (bookingsFromApi.length <= 0) {
            setTimeTaken18(false)
            setTimeTaken21(false)
        } else {

            //bookingsFromApi ej tom
            for (let booking in bookingsFromApi) { 

                //Kollar om det finns bokningar samma dag som vald datum
                //Om inte enablas tidknappar
                if (bookingsFromApi[booking].date === e.target.value) {
                    
                    //Kollar om det finns bokningar kl 18:00 samma dag som vald datum (Likadant för kl 21)
                    //Om inte enablas tidknappar
                    if (bookingsFromApi[booking].time === "18:00") {
                        
                        //Skickar in nummer av numberOfGuests till timeList array
                        timeList18.push(bookingsFromApi[booking].numberOfGuests)
                      
                        //Omvandlar varje numberOfGuests till antal bord som behövs för det antalet gäster, 
                        //genom att dela varje nummer med 6 och runda upp till heltal
                        numberOfTables18 = timeList18.map(x => Math.ceil(+x/6) )
                        //Summerar alla nummer i numberOfTables array för att få den totala summan av bokade bord                           
                        sumOfTables18 = numberOfTables18.reduce((a, b) => {
                            return a + b;
                        }, 0);

                        //Skickar antalet bord till Booking
                        props.childToParentTables18(sumOfTables18);                        
                        console.log("tables18", sumOfTables18)
                        
                        if (sumOfTables18 >= 15) {
                            setTimeTaken18(true)                           
                        } else {
                            setTimeTaken18(false)
                        }
                    } else {
                        setTimeTaken18(false)           
                    }
                    
                    //KL 21
                    if (bookingsFromApi[booking].time === "21:00"){ 
                        
                        timeList21.push(bookingsFromApi[booking].numberOfGuests);

                        numberOfTables21 = timeList21.map(x => Math.ceil(+x/6) )
                        sumOfTables21 = numberOfTables21.reduce((a, b) => {
                            return a + b;
                        }, 0);

                        props.childToParentTables21(sumOfTables21);

                        if (sumOfTables21 >= 15) {
                            setTimeTaken21(true)  
                        } else {
                            setTimeTaken21(false)
                        }

                    } else {
                        setTimeTaken21(false)                        
                    } 

                //Kollar om det finns bokningar och om datumet är en tom sträng, isf disableas tidsknappar                    
                } else if (bookingsFromApi && e.target.value === "") {                    
                        setTimeTaken18(true)
                        setTimeTaken21(true)
                    
                } else {
                    setTimeTaken18(false)
                    setTimeTaken21(false)   
                    
                    props.childToParentTables18(sumOfTables18);   
                    props.childToParentTables21(sumOfTables21); 
                }
            }
        };

        })
        // Fånga eventuellt error
        .catch((error: any) => {
            console.log("Error:", error)
        });
    }

    // När klickat på kl. 18
    function chooseTime18() {

        props.childToParentTime("18:00");
        setPickedTime("18:00");

        props.resetNumberOfGuests(1)  

        setPicked18(true);
        setPicked21(false);
    }

    // När klickat på kl. 21
    function chooseTime21() {

        props.childToParentTime("21:00");
        setPickedTime("21:00");

        props.resetNumberOfGuests(1)   

        setPicked21(true);
        setPicked18(false);
    }

    return(
        <CheckAvailabilityDiv> 
            <label htmlFor="date"> Välj datum: </label>
            <Input type="date" min={minDate} onChange={handleChange} value={pickedDate} name="date"></Input>
            
            <TimeDiv> 
                {!picked18 && <TimeButton onClick={chooseTime18} disabled={timeTaken18}>Kl. 18</TimeButton>}   
                {picked18 && <ChoosenTimeButton onClick={chooseTime18} disabled={timeTaken18}>Kl. 18</ChoosenTimeButton>}              
                {!picked21 && <TimeButton onClick={chooseTime21} disabled={timeTaken21}>Kl. 21</TimeButton>}
                {picked21 && <ChoosenTimeButton onClick={chooseTime21} disabled={timeTaken21}>Kl. 21</ChoosenTimeButton>}
            </TimeDiv>
        </CheckAvailabilityDiv>
    );
};