import axios from "axios";
import { useAuthStore } from "../store";

// axios instance create
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true, // eta na dile amader cookie jeta server theke ashbe seta browser e save hobe na and request er sathe cookie server e jabe na
  headers: {
    "Content-Type": "application/json", // server e json data jabe
    Accept: "application/json", // client json data accept korbe
  },
});



const refreshToken = async () => {
  await axios.post(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
}; // alada vabe kora hoise karon infinite loop theke bachar jonno 

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      try {
        const headers = { ...originalRequest.headers };
        await refreshToken();
        return api.request({ ...originalRequest, headers });
      } catch (error) {
        console.warn("Error while getting Refresh our Access Token!");
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  }
);



// Bekkha 
// api.interceptors.response.use(
//   successFunction,    // Response success হলে
//   errorFunction       // Response error হলে
// )

// Success Case : (response) => response,
// Error Case : async (error) => {.....} 

// error.config এ original request এর সব info থাকে (URL, headers, method etc.)

// if (error.response.status === 401) {...} ---  401 মানে "Unauthorized" - access token expire হয়ে গেছে

// try {
//   const headers = { ...originalRequest.headers };
//   await refreshToken();
//   return api.request({ ...originalRequest, headers });
// } 
// এখানে কি হচ্ছে:
// Original headers copy করা
// refreshToken() call করে নতুন access token পাওয়া
// Same original request আবার send করা (নতুন token সহ) mane holo jei request er response status 401 sei request ta ekhan thekei abar kora

// Refresh Failed case : 
// catch (error) {
//   console.warn("Error while getting Refresh our Access Token!");
//   useAuthStore.getState().logout();
//   return Promise.reject(error);
// } Refresh token ও expire হলে user কে logout করে দেওয়া

// jodi others kono error ashe tahole pass kore deya 
// return Promise.reject(error);

// Promise.reject(error) ----- etar dara error ta jekhan theke api call kora hoise sekhane pass kora hoyeche . tar mane next step amader code e pass kora hocche jekhane call kora hoise . karon tar pore interceptor e kono code nai 