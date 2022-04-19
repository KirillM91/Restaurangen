import React, { ChangeEvent, useEffect, useState } from "react";
// import { DateAndTime } from "../../models/DateAndTime";
import { GetBooking } from "../../models/GetBooking";
// import { IGetBooking } from "../../models/IGetBooking";
// import { IPostBooking } from "../../models/IPostBooking";
import { GetBookingsService } from "../../services/GetBookingsService";
import { TimeButton } from "../styled-components/Buttons";
import { TimeDiv, TransparentDiv } from "../styled-components/Divs";
import Calendar from "react-calendar";
import DatePicker from 'sassy-datepicker';

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
    // const [valueDate, setValueDate] = useState(new Date());
    // const [pickedTime, setPickedTime] = useState(new Date().toString())


    let timeList18: GetBooking[] = [];
    let timeList21: GetBooking[] = [];

    let numberOfTables18 = []
    let numberOfTables21 = []
 
    let sumOfTables18: number;
    let sumOfTables21: number;

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
        console.log(bookingsFromApi);


        
        //Om bookingsFromApi är helt tom enablas tid knappar
        if (bookingsFromApi.length <= 0) {
            setTimeTaken18(false)
            setTimeTaken21(false)
        } else {

            //bookingsFromApi ej tom
            for (var booking in bookingsFromApi) { 


                //Kollar om det finns bokningar samma dag som vald datum
                //Om inte enablas tid knappar
                if (bookingsFromApi[booking].date === e.target.value) { 
                    
                    //Kollar om det finns bokningar kl 18:00 samma dag som vald datum (Likadant för kl 21)
                    //Om inte enablas tid knappar
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

                        //SKickar antalet bor till Booking
                        props.childToParentTables18(sumOfTables18);
                        
                        console.log("tables18", sumOfTables18)
                        
                        if (sumOfTables18 >= 15) {
                            // console.log("Det är fullbokat kl. 18 idag")
                            setTimeTaken18(true)
                            console.log("timeTaken18", timeTaken18);                            
                            
                        } else {
                            // console.log("Det går att boka kl. 18 idag")
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
                        
                        console.log("tables21", sumOfTables21)

                        if (sumOfTables21 >= 15) {
                            // console.log("Det är fullbokat kl. 21 idag")
                            setTimeTaken21(true)
                            console.log("timeTaken21", timeTaken21);
                            
                        } else {
                            // console.log("Det går att boka kl. 21 idag")
                            setTimeTaken21(false)
                        }

                    } else {
                        setTimeTaken21(false)
                    } 

                    //Kollar om det finns bokningar och om datumet är en tom sträng, isf disableas tids knappar                    
                } else if (bookingsFromApi && e.target.value === "") {                    
                        setTimeTaken18(true)
                        setTimeTaken21(true)
                    
                } else {
                    // console.log("Det finns ingen bokning idag. Du kan boka")
                    setTimeTaken18(false)
                    setTimeTaken21(false)                    
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
        // console.log("Valt kl. 18");

        props.childToParentTime("18:00");
        setPickedTime("18:00");

        props.resetNumberOfGuests(1)  
    }

    // När klickat på kl. 21
    function chooseTime21() {
        // console.log("Valt kl. 21");

        props.childToParentTime("21:00");
        setPickedTime("21:00");

        props.resetNumberOfGuests(1)   
    }

    return(
        <div> 
            {/* <p>CheckAvailability</p> */}
            <label htmlFor="date"> Välj datum: </label>
            <input type="date" min={"2022-04-19"} onChange={handleChange} value={pickedDate} name="date"></input>
            {/* <Calendar onChange={setValueDate} value={valueDate} /> */}
            {/* <button onClick={checkDate} >Se tillgänglighet</button> */}
            {/* <DatePicker onChange={handleChange} value={pickedDate}></DatePicker> */}
            <TimeDiv>
                {!timeTaken18 && <TimeButton onClick={chooseTime18}>Kl. 18</TimeButton>}
                {timeTaken18 && <button disabled>Kl. 18</button>}
                {!timeTaken21 && <TimeButton onClick={chooseTime21}>Kl. 21</TimeButton>}
                {timeTaken21 && <button disabled>Kl. 21</button>}
            </TimeDiv>
        </div>
    );
};

// https://www.npmjs.com/package/react-calendar
// om vi vill läsa mer om calender i React (är installerat)
// https://reactjsexample.com/beautiful-minimal-and-accessible-date-picker-for-react/