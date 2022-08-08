import "./App.css";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import Main from "./pages/Main";
import { Routes, Route, Link } from "react-router-dom";

function App() {


	return (
		<div>
			<Navbar />
			
			<body className="main">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/auth" element={<Auth />} />
				</Routes>
			</body>
		</div>
	);
}

export default App;
