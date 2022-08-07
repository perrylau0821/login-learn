import React, { useEffect, useState } from "react";
import {
	TextField,
	InputAdornment,
	IconButton,
	Button,
	Box,
	Paper,
	Typography,
	Link,
	FormControl,
	OutlinedInput,
	FilledInput,
	Input,
	InputLabel,
	Divider,
	Icon,
} from "@mui/material";
import { VisibilityOff, Visibility, Google } from "@mui/icons-material";
import { GoogleLogin } from "react-google-login";

import { gapi } from "gapi-script";
import { useAuth } from "../../contexts/authContext";

const Auth = () => {
	const { login, signup, isSignup, setIsSignup, googleSuccess, googleFailure } =
		useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [input, setInput] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleInput = (field) => (e) => {
		setInput({ ...input, [field]: e.target.value });
	};

	const handleClickShowPassword = (e) => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	useEffect(() => {
		function start() {
			gapi.client.init({
				clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
				scope: "email",
			});
		}
		gapi.load("client:auth2", start);
	}, []);

	return (
		<Paper
			elevation={5}
			sx={{
				width: "300px",
				p: 5,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				textAlign: "center",
				borderRadius: 5,
				gap: 3,
			}}
		>
			<Typography variant="h4" sx={{ fontWeight: "bold" }}>
				{isSignup ? "Sign Up" : "Login"}
			</Typography>
			{isSignup ? (
				<TextField
					label="Username"
					helperText=""
					variant="standard"
					value={input.username}
					onChange={handleInput("username")}
				/>
			) : null}

			<TextField
				label="Email"
				helperText=""
				variant="standard"
				value={input.email}
				onChange={handleInput("email")}
			/>
			<FormControl variant="standard">
				<InputLabel>Password</InputLabel>
				<Input
					type={showPassword ? null : "password"}
					variant="standard"
					value={input.password}
					onChange={handleInput("password")}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								// onMouseDown={handleMouseDownPassword}
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			{isSignup ? (
				<FormControl variant="standard">
					<InputLabel>Confirm Password</InputLabel>
					<Input
						type={showPassword ? null : "password"}
						variant="standard"
						value={input.confirmPassword}
						onChange={handleInput("confirmPassword")}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									// onMouseDown={handleMouseDownPassword}
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
			) : null}

			<Link component="button" variant="caption" sx={{ textAlign: "left" }}>
				Forgot Password?
			</Link>
			<Button
				variant="contained"
				sx={{ borderRadius: 5 }}
				onClick={isSignup ? () => signup(input) : () => login(input)}
			>
				{isSignup ? "Sign Up" : "Login"}
			</Button>
			{/* <Divider variant="fullWidth" sx={{ m: 1, fontSize: 12 }}></Divider> */}

			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
				onSuccess={googleSuccess}
				onFailure={googleFailure}
				cookiePolicy="single_host_origin"
				render={(renderProps) => (
					<Button
						variant="contained"
						color="error"
						onClick={renderProps.onClick}
						// disabled={renderProps.disabled}
						startIcon={<Google sx={{ mr: 1 }} />}
						sx={{
							borderRadius: 5,
						}}
					>
						{/* <Google fontSize="small" sx={{ mr: 2 }} /> */}
						<Typography variant="body">
							{isSignup ? "Sign Up" : "Login"} with Google
						</Typography>
					</Button>
				)}
			/>
			<Typography sx={{ fontSize: "15px" }}>
				{isSignup ? (
					<>
						Already a member?{" "}
						<Link
							component="button"
							variant="body"
							onClick={(e) => setIsSignup(false)}
						>
							Login
						</Link>
					</>
				) : (
					<>
						Not a member?{" "}
						<Link
							component="button"
							variant="body"
							onClick={(e) => setIsSignup(true)}
						>
							Sign Up
						</Link>
					</>
				)}
			</Typography>
		</Paper>
	);
};

export default Auth;
