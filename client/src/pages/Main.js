import { Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../contexts/authContext";

const Main = () => {
	const { logout, isLoggedIn, user, setUser } = useAuth();
	return (
		<Typography variant="h3">
			{isLoggedIn ? "Logged In" : "not Logged in"}
		</Typography>
	);
};

export default Main;
