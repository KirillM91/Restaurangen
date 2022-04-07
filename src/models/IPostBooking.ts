import { IPostCustomer } from "./IPostCustomer";

export interface IPostBooking {    
    restaurantId: string,
    date: string,
    time: string,
    numberOfGuests: number,
    customer: IPostCustomer
};