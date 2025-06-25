import axios from "axios";

const api = axios.create({
  baseURL: "https://sky-scrapper.p.rapidapi.com/api/v1",
  headers: {
    "x-rapidapi-key": "3bd62d74femsh6fea6a3f6edf3e8p1bfceajsn69b468b6967c",
    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com"
  }
});

export default api;