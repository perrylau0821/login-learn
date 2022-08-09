import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();
const app = express();

//Other Imports
import { userRoutes } from "./routers/index.js";

// Middleware
app.use(
	cors({
		origin: "*",
	})
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB
mongoose
	.connect(process.env.MONGO_DB_URI, () => {
		console.log("connected to mongoose database");
	})
	.catch((err) => console.log(err));

// Router
app.use("/users", userRoutes);

// Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log("listening on port " + PORT);
});
