import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/bms/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
