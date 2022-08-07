import { Google } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React from "react";
import GoogleLogin from "react-google-login";
import { useAuth } from "../contexts/authContext";

const Main = () => {
	const { isLoggedIn } = useAuth();
	return (
		<>
			<Typography variant="h3">
				{isLoggedIn ? "Logged In" : "not Logged in"}
			</Typography>
		</>
	);
};

export default Main;
