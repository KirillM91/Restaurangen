import axios from "axios";
import { IGetCustomer } from "../models/IGetCustomer";

export class GetCustomerService {

    async getCustomers(customerId: string) {
        let response = await axios
        .get("https://school-restaurant-api.azurewebsites.net/customer/"+customerId)

        let customers = response.data;
        return customers;
    };
};