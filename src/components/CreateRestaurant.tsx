import axios from "axios";

export function CreateRestaurant() {
    function createRestaurant(){
    axios.post("https://school-restaurant-api.azurewebsites.net/restaurant/create",
    {
        name: "Kitchen On Fire",
        address: {
          street: "Fakegatan 2",
          zip: "543 21",
          city: "Stockholm"
        }
      })
      .then(response => {console.log(response.data)})
      .catch(error => {console.log(error)});
    } 
    return(
        
     <div>
         <button onClick={createRestaurant}>Skapa</button>
     </div>
    );
};