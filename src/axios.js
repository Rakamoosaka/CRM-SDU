import axios from "axios";

const instance = axios.create({
  baseURL: "https://crm-backend-b0bv.onrender.com/api/",
});

export default instance;
