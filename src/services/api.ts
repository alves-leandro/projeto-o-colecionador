import axios from "axios";

export const apiBase = axios.create({
  baseURL: "https://fakeapigrupo3.onrender.com",

  timeout: 3000,
});
