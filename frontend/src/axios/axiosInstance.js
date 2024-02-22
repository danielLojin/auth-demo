import axios from "axios";

const axiosFetch = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  credentials: "include",
});

export default axiosFetch;
