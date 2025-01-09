import axios from "axios";

// Create an Axios instance
const axiosDefault = axios.create({
  baseURL: "https://crm-backend-b0bv.onrender.com/api/",
});

export default axiosDefault;