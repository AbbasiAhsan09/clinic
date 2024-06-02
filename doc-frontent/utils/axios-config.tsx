import axios from "axios";
import { getCookie } from "cookies-next";
const instance = axios.create({
    baseURL : 'http://localhost:4200'
});
instance.interceptors.request.use(
  
    config => {
      const token = getCookie("x-auth-token");

      // Set the token in the request header
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
        return config;
    }
)

instance.interceptors.response.use(

    response => {
      // You can modify the response data here
      return response;
    },
    error => {
      // Handle response error
      return Promise.reject(error);
    }
  );

  export default instance;