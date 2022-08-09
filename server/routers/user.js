import express from "express";
const Router = express.Router();

import {
	getUsers,
	createUser,
	deleteAllUsers,
	login,
	signup,
	googleSignupOrLogin,
	logout,
} from "../controllers/user.js";

Router.get("/", getUsers);
Router.post("/", createUser);
Router.delete("/", deleteAllUsers);

Router.post("/login", login);
Router.post("/signup", signup);
Router.post("/google-signup-or-login", googleSignupOrLogin);
Router.post("/logout", logout);

export default Router;
