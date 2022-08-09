import axios from "axios";

const API = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const login = (formData) => API.post("/users/login", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignupOrLogin = (formData) =>
	API.post("/users/google-signup-or-login", formData);
export const logout = (user) => API.post("/users/logout", user);
