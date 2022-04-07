import axios from "axios";

export function deleteBooking (bookingID: string) {
    axios.delete("https://school-restaurant-api.azurewebsites.net/booking/delete/"+bookingID)
    .then(response => {
        console.log("delete response: ", response)
        console.log("delete response data: ", response.data)
    })
}