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
	const [errorMsg, setErrorMsg] = useState({});

	const googleSuccess = (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;
		try {
			googleLogin({ result, token });
			setErrorMsg({});
		} catch (error) {
			console.log(error);
		}
	};

	const googleFailure = (error) => {
		console.log("Google Sign In was unsuccessful. Try Again Later");
		setErrorMsg({});
	};

	const googleLogin = async (formData) => {
		try {
			localStorage.setItem("profile", JSON.stringify(formData));
			setUser(formData);

			api.googleSignupOrLogin(formData.result);

			navigate("/");
			setErrorMsg({});
		} catch (error) {
			console.log(error);
		}
	};

	const login = async (formData) => {
		try {
			const { data } = await api.login(formData);

			localStorage.setItem("profile", JSON.stringify(data));
			setUser(data);

			navigate("/");
			setErrorMsg({});
		} catch (error) {
			let newErrorMsg;
			for (let i = 0; i < error.response.data.length; i++) {
				const { field, message } = error.response.data[i];
				for (let j = 0; j < field.length; j++) {
					newErrorMsg = { ...newErrorMsg, [field[j]]: message };
				}
			}
			setErrorMsg(newErrorMsg);
		}
	};

	const logout = () => {
		localStorage.clear();
		api.logout(user);
		setUser(null);
		navigate("/");
		setErrorMsg({});
	};

	const signup = async (formData) => {
		try {
			const { data } = await api.signUp(formData);
			localStorage.setItem("profile", JSON.stringify(data));
			setUser(data);

			navigate("/");
			setErrorMsg({});
		} catch (error) {
			let newErrorMsg;
			for (let i = 0; i < error.response.data.length; i++) {
				const { field, message } = error.response.data[i];
				for (let j = 0; j < field.length; j++) {
					newErrorMsg = { ...newErrorMsg, [field[j]]: message };
				}
			}
			setErrorMsg(newErrorMsg);
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
				errorMsg: errorMsg,
				setErrorMsg: setErrorMsg,
			}}
		>
			{children}
		</authContext.Provider>
	);
};
