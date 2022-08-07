import Users from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		if (username === "" && email === "") {
			return res.status(400).json({ message: "No username or email" });
		}

		const existingUser = await Users.findOne(
			email !== "" ? { email: email } : { username: username }
		);
		if (!existingUser)
			return res.status(404).json({ message: "User doesn't exist" });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!isPasswordCorrect)
			return res.status(400).json({ message: "Invalid password" });

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			process.env.JWT_SECRET_KEY,
			{ expiresIn: "1h" }
		);

		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: "something went wrong" });
	}
};

export const signup = async (req, res) => {
	const { username, email, password, confirmPassword } = req.body;
	try {
		const existingEmail = await Users.findOne({ email: email });
		if (existingEmail)
			return res.status(400).json({ message: "Email already registered" });

		const existingUsername = await Users.findOne({ username: username });
		if (existingUsername)
			return res.status(400).json({ message: "Username already used" });

		if (password !== confirmPassword)
			return res.status(400).json({ message: "Passwords don't match" });

		const hashedPassword = await bcrypt.hash(password, 10);

		const result = await Users.create({
			username,
			email,
			password: hashedPassword,
		});

		const token = jwt.sign(
			{ email: result.email, id: result._id },
			process.env.JWT_SECRET_KEY,
			{ expiresIn: "1h" }
		);

		res.status(200).json({ result: result, token });
	} catch (error) {}
};

export const getUsers = async (req, res) => {
	try {
		const data = await Users.find();
		res.json(data);
	} catch (error) {
		console.log(error);
	}
};

export const createUser = async (req, res) => {
	const user = {
		...req.body,
		password: bcrypt.hashSync(req.body.password, 10),
	};

	try {
		await Users.create(user);
		res.status(201).json({ message: "successfully create a user" });
	} catch (error) {
		console.log(error);
	}
};

export const deleteAllUsers = async (req, res) => {
	try {
		await Users.deleteMany();
		res.status(200).json({ message: "successfully delete all users" });
	} catch (error) {
		console.log(error);
	}
};
