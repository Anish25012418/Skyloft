import axios from "axios";

const api = axios.create({
  baseURL: "https://sky-scrapper.p.rapidapi.com/api",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_API_ACCESS_KEY,
    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com"
  }
});

export default api;