import axios from "axios";
import { ChangeEvent, useState } from "react";
import { IGetBooking } from "../../models/IGetBooking";

export function CheckAvailability() {

    const [pickedDate, setPickedDate] = useState("");
    const [dateTaken, setdateTaken] = useState<Boolean>(true);


    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setPickedDate(e.target.value);
        console.log(pickedDate)
    }


    // Funktion för att se vad valt datum returnerar
    function checkDate() {
        console.log("Klick på knapp")

        axios
        .get<IGetBooking>("https://school-restaurant-api.azurewebsites.net/booking/restaurant/624aa9f0df8a9fb11c3ea8aa")
        .then((response) => {

            console.log(response.data)

            setPickedDate(pickedDate);

            console.log(pickedDate);

            if (response.data === undefined) {
                console.log("Ingen data");
            } else {
                // Behöver kollas om det finns någon bokning den dagen
                // if (response.data.date === pickedDate) {
                //     console.log("Finns bokning med dagens datum");
                // }
            }
        })
        // Fånga eventuellt error
        .catch((error) => {
            console.log("Error:", error)
            setdateTaken(false);
        })
    };

    return(
        <div>
            <p>CheckAvailability</p>
            <input type="date" onChange={handleChange}></input>
            <button onClick={checkDate}>Se tillgänglighet</button>
            {!dateTaken && <p>Datum är tillgängligt</p>}
        </div>
    );
};