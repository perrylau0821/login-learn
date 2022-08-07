import express from "express";
const Router = express.Router();

import {
	getUsers,
	createUser,
	deleteAllUsers,
	login,
	signup,
} from "../controllers/user.js";

Router.get("/", getUsers);
Router.post("/", createUser);
Router.delete("/", deleteAllUsers);
Router.post("/login", login);
Router.post("/signup", signup);

export default Router;
