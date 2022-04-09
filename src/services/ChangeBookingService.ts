import axios from "axios"
import { ChangeBooking } from "../models/ChangeBooking"

export function updateBooking (bookingID: string, changeBookingInfo: ChangeBooking, customerId: string) {
    axios.put("https://school-restaurant-api.azurewebsites.net/booking/update/"+bookingID, 
    {
        id: bookingID,
        restaurantId: "624aa9f0df8a9fb11c3ea8aa",
        date: changeBookingInfo.date,
        time: changeBookingInfo.time,
        numberOfGuests: changeBookingInfo.numberOfGuests,
        customerId: customerId
    })
}