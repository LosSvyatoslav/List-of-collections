import axios from "axios";

export const questionsApi = axios.create({
  baseURL: "https://api.yeatwork.ru/questions/public-questions",
});