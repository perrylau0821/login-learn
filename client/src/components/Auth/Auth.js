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
	FormHelperText,
} from "@mui/material";
import { VisibilityOff, Visibility, Google } from "@mui/icons-material";
import { GoogleLogin } from "react-google-login";

import { gapi } from "gapi-script";
import { useAuth } from "../../contexts/authContext";

const Auth = () => {
	const {
		login,
		signup,
		isSignup,
		setIsSignup,
		googleSuccess,
		googleFailure,
		errorMsg,
		setErrorMsg,
	} = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [loginWithEmail, setLoginWithEmail] = useState(true);
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

	const handleLoginWith = (e) => {
		setLoginWithEmail((prev) => !prev);
		const field = loginWithEmail ? "email" : "username";
		setInput({ ...input, [field]: "" });
	};

	const handleSetIsSignup = (bool) => (e) => {
		setIsSignup(bool);
		setErrorMsg({});
	};

	useEffect(() => {
		function start() {
			gapi.auth2.init({
				client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
				scope: "email",
			});
		}
		gapi.load("auth2", start);
	}, []);

	return (
		<Box
			sx={{
				width: "100vw",
				height: "inherit",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
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
						error={errorMsg.username !== undefined}
						label="Username"
						helperText={errorMsg.username !== undefined}
						variant="standard"
						value={input.username}
						onChange={handleInput("username")}
					/>
				) : null}

				<FormControl variant="standard">
					<InputLabel
						error={
							!loginWithEmail && !isSignup
								? errorMsg.username !== undefined
								: errorMsg.email !== undefined
						}
					>
						{!loginWithEmail && !isSignup ? "Username" : "Email"}
					</InputLabel>
					<Input
						error={
							!loginWithEmail && !isSignup
								? errorMsg.username !== undefined
								: errorMsg.email !== undefined
						}
						variant="standard"
						value={!loginWithEmail && !isSignup ? input.username : input.email}
						onChange={
							!loginWithEmail && !isSignup
								? handleInput("username")
								: handleInput("email")
						}
						endAdornment={
							isSignup ? null : (
								<InputAdornment position="end">
									<InputLabel
										sx={{
											color: "#efefef",
											transition: "color .1s",
											"&:hover": { color: "#dddddd" },
											cursor: "pointer",
											zIndex: "0",
										}}
										onClick={handleLoginWith}
									>
										{loginWithEmail
											? "Login with Username"
											: "Login with Email"}
									</InputLabel>
								</InputAdornment>
							)
						}
					/>
					<FormHelperText
						error={
							!loginWithEmail && !isSignup
								? errorMsg.username !== undefined
								: errorMsg.email !== undefined
						}
					>
						{!loginWithEmail && !isSignup ? errorMsg.username : errorMsg.email}
					</FormHelperText>
				</FormControl>
				<FormControl variant="standard">
					<InputLabel error={errorMsg.password !== undefined}>
						Password
					</InputLabel>
					<Input
						error={errorMsg?.password !== undefined}
						type={showPassword ? null : "password"}
						variant="standard"
						value={input.password}
						onChange={handleInput("password")}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									tabIndex={-1}
									// onMouseDown={handleMouseDownPassword}
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
					<FormHelperText error={errorMsg.password !== undefined}>
						{errorMsg?.password}
					</FormHelperText>
				</FormControl>
				{isSignup ? (
					<FormControl variant="standard">
						<InputLabel error={errorMsg.confirmPassword !== undefined}>
							Confirm Password
						</InputLabel>
						<Input
							error={errorMsg.confirmPassword !== undefined}
							type={showPassword ? null : "password"}
							variant="standard"
							value={input.confirmPassword}
							onChange={handleInput("confirmPassword")}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										tabIndex={-1}
										// onMouseDown={handleMouseDownPassword}
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
						<FormHelperText error={errorMsg.confirmPassword !== undefined}>
							{errorMsg?.confirmPassword}
						</FormHelperText>
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
								onClick={handleSetIsSignup(false)}
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
								onClick={handleSetIsSignup(true)}
							>
								Sign Up
							</Link>
						</>
					)}
				</Typography>
			</Paper>
		</Box>
	);
};

export default Auth;
