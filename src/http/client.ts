import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    withCredentials: true, // eta na dile amader cookie jeta server theke ashbe seta browser e save hobe na and request er sathe cookie server e jabe na 
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json", // client json data accept korbe
    }

})