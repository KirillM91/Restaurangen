import axios from "axios";
import { IGetBooking } from "../models/IGetBooking";

export class GetBookingsService {

    async getBookings() {
        let response = await axios
        .get("https://school-restaurant-api.azurewebsites.net/booking/restaurant/624aa9f0df8a9fb11c3ea8aa")
        
        let bookings: IGetBooking[] = response.data;
        return bookings;
    }
}