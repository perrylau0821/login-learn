import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<AuthProvider>
			<App />
		</AuthProvider>
	</Router>
);

var vh = window.innerHeight
var marginTop = 45
document.documentElement.style.setProperty('--vh', vh + 'px');
document.documentElement.style.setProperty('--mt', marginTop + 'px');
document.documentElement.style.setProperty('--standaloneMt', marginTop*2 + 'px');