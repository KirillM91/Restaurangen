import React, { ChangeEvent, useEffect, useState } from "react";
// import { DateAndTime } from "../../models/DateAndTime";
import { GetBooking } from "../../models/GetBooking";
// import { IGetBooking } from "../../models/IGetBooking";
// import { IPostBooking } from "../../models/IPostBooking";
import { GetBookingsService } from "../../services/GetBookingsService";
import { TimeButton } from "../styled-components/Buttons";
import { TransparentDiv } from "../styled-components/Divs";

interface IChildToParentProps {
    childToParentDate(newBookingDate: string): void;
    childToParentTime(newBookingTime: string): void;
}

export function CheckAvailability(props: IChildToParentProps) {

    const [pickedDate, setPickedDate] = useState("");
    const [bookings, setBookings] = useState<GetBooking[]>([]);

    const [timeTaken18, setTimeTaken18] = useState(true);
    const [timeTaken21, setTimeTaken21] = useState(true);
    const [pickedTime, setPickedTime] = useState("");

    let timeList18: GetBooking[] = [];
    let timeList21: GetBooking[] = [];

    // Funktion som körs när inputfältet för datum ändras
    function handleChange(e: ChangeEvent<HTMLInputElement>) {

        props.childToParentDate(e.target.value);
        setPickedDate(e.target.value);

        timeList18 = [];
        timeList21 = [];

        console.log(pickedDate)

        let service = new GetBookingsService();

        service.getBookings()
        .then((bookingsResponse) => {

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

        if (bookingsFromApi <= 0) {
            setTimeTaken18(false)
            setTimeTaken21(false)
        } else {

            for (var booking in bookingsFromApi) {
                    
                if (bookingsFromApi[booking].date === pickedDate) {

                    for (var time in bookingsFromApi[booking]) {

                        if (bookingsFromApi[booking][time] === "18:00"){
                            console.log("18:00");

                            timeList18.push(bookingsFromApi[booking][time]);

                            if (timeList18.length >= 15) {
                                console.log("Det är fullbokat kl. 18 idag")
                                setTimeTaken18(true)
                                // return
                            } else {
                                console.log("Det går att boka kl. 18 idag")
                                setTimeTaken18(false)
                            }
                        }
                        if (bookingsFromApi[booking][time] === "21:00"){
                            console.log("21:00")
                                
                            timeList21.push(bookingsFromApi[booking][time]);

                            if (timeList21.length >= 15) {
                                console.log("Det är fullbokat kl. 21 idag")
                                setTimeTaken21(true)
                                // return
                            } else {
                                console.log("Det går att boka kl. 21 idag")
                                setTimeTaken21(false)
                            }
                        }
                    }
                } else {
                    console.log("Det finns ingen bokning idag. Du kan boka")
                    setTimeTaken18(false)
                    setTimeTaken21(false)
                    return
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
        console.log("Valt kl. 18");

        props.childToParentTime("18:00");
        setPickedTime("18:00");
    }

    // När klickat på kl. 21
    function chooseTime21() {
        console.log("Valt kl. 21");

        props.childToParentTime("21:00");
        setPickedTime("21:00");
    }

    return(
        <div>
            {/* <p>CheckAvailability</p> */}
            <label htmlFor="date"> Välj datum: </label>
            <input type="date" onChange={handleChange} value={pickedDate} name="date"></input>
            {/* <button onClick={checkDate} >Se tillgänglighet</button> */}
            <TransparentDiv>
                {!timeTaken18 && <TimeButton onClick={chooseTime18}>Kl. 18</TimeButton>}
                {!timeTaken21 && <TimeButton onClick={chooseTime21}>Kl. 21</TimeButton>}
                {timeTaken18 && <button disabled>Kl. 18</button>}
                {timeTaken21 && <button disabled>Kl. 21</button>}
            </TransparentDiv>
        </div>
    );
};