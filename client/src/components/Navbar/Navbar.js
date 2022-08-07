import { Menu } from "@mui/icons-material";
import {
	AppBar,
	IconButton,
	Toolbar,
	Typography,
	Link,
	Avatar,
	Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const Navbar = () => {
	const { logout, isLoggedIn, user, setUser, setIsSignup, isGoogleUser } =
		useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const token = user?.token;

		// JWT...
		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	const routeSignup = () => {
		navigate("/auth");
		setIsSignup(true);
	};

	const routeLogin = () => {
		navigate("/auth");
		setIsSignup(false);
	};

	return (
		<AppBar position="sticky">
			<Toolbar
				variant="dense"
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<>
					<IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
						<Menu />
					</IconButton>
				</>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: 4,
					}}
				>
					{isLoggedIn ? (
						<>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									gap: 1.5,
								}}
							>
								<Avatar
									sx={{ width: 24, height: 24 }}
									src={user.result.imageUrl}
								></Avatar>
								<Typography variant="body1">
									{isGoogleUser
										? `${user.result.givenName} ${user.result.familyName}`
										: user.result.username}
								</Typography>
							</Box>
							<Link
								component="button"
								color="inherit"
								variant="body"
								underline="none"
								onClick={logout}
							>
								Logout
							</Link>
						</>
					) : (
						<>
							<Link
								component="button"
								color="inherit"
								variant="body"
								underline="none"
								onClick={routeLogin}
							>
								Login
							</Link>
							<Link
								component="button"
								color="inherit"
								variant="body"
								underline="none"
								onClick={routeSignup}
							>
								Sign Up
							</Link>
						</>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
