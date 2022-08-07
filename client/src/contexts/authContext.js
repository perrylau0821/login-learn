import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api/index";

export const authContext = createContext();

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const isLoggedIn = user === null ? false : true;
	const [isSignup, setIsSignup] = useState(false);
	const navigate = useNavigate();
	const isGoogleUser = user?.token.length > 500;

	const googleSuccess = (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;
		try {
			login({ result, token });
		} catch (error) {
			console.log(error);
		}
	};

	const googleFailure = (error) => {
		console.log("Google Sign In was unsuccessful. Try Again Later");
	};

	const login = async (formData) => {
		try {
			let authData;

			if (Object.keys(formData).includes("token") === false) {
				console.log("not google login");
				const { data } = await api.login(formData);
				authData = data;
			} else {
				console.log("is google login");
				authData = formData;
			}
			console.log(formData);

			localStorage.setItem("profile", JSON.stringify(authData));
			setUser(authData);

			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const logout = () => {
		localStorage.clear();
		setUser(null);
		navigate("/");
	};

	const signup = async (formData) => {
		try {
			const { data } = await api.signUp(formData);
			localStorage.setItem("profile", JSON.stringify(data));
			setUser(data);

			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<authContext.Provider
			value={{
				login: login,
				signup: signup,
				logout: logout,
				isLoggedIn: isLoggedIn,
				user: user,
				setUser: setUser,
				isSignup: isSignup,
				setIsSignup: setIsSignup,
				isGoogleUser: isGoogleUser,

				googleFailure: googleFailure,
				googleSuccess: googleSuccess,
			}}
		>
			{children}
		</authContext.Provider>
	);
};
