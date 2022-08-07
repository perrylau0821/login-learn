import "./App.css";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import Main from "./pages/Main";
import { Routes, Route, Link } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/auth" element={<Auth />} />
			</Routes>
		</div>
	);
}

export default App;
