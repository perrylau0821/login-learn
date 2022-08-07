import axios from "axios";

const API = axios.create({
	baseURL: "https://login-learn-backend.herokuapp.com/",
});

export const login = (formData) => API.post("/users/login", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
