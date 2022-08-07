import React, { useState } from "react";
import {
	TextField,
	InputAdornment,
	IconButton,
	Button,
	Box,
	Paper,
	Typography,
	Link,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
const Auth = () => {
	const [showPassword, setShowPassword] = useState(false);
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
			}}
		>
			<Typography variant="h4" sx={{ fontWeight: "bold" }}>
				Login
			</Typography>

			<TextField
				margin="normal"
				label="Email"
				helperText=""
				variant="standard"
			/>
			<TextField
				margin="normal"
				label="Password"
				type="password"
				variant="standard"
				inputProps={{}}
			/>
			<Typography sx={{ textAlign: "left", fontSize: "12px", mt: 2 }}>
				<Link>Forgot Password?</Link>
			</Typography>
			<Button variant="contained" sx={{ mt: 3, borderRadius: 5 }}>
				Login
			</Button>
			<Typography sx={{ mt: 3, fontSize: "15px" }}>
				Not a member? <Link>Signup</Link>
			</Typography>
		</Paper>
	);
};

export default Auth;
