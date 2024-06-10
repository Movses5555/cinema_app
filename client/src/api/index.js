import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_BASE_URL;
const apiUrl = `${baseURL}/api`;

const client = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
