import axios from "axios";
import { IPostBooking } from "../models/IPostBooking";

export function PostNewBooking(newBooking: IPostBooking){
        
    axios.post("https://school-restaurant-api.azurewebsites.net/booking/create", 
    newBooking,
    {headers: {"content-type": "application/json"}}
    )
    .then(response => {console.log(response.data)})
    .catch(error => {console.log(error)});

    console.log(newBooking);

    // setBookingOk(true);
    
}