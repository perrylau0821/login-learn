import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	signupDate: { type: Date, required: true, default: new Date() },
	lastActiveAt: { type: Date, required: true, default: new Date() },
	lastLogout: { type: Date, required: true, default: new Date() },
	name: { type: String, required: false, default: null },
	imageUrl: { type: String, required: false, default: null },
	googleId: {
		type: String,
		required: false,
		default: null,
		required: function () {
			return this.email === null && this.username === null;
		},
	},
	username: {
		type: String,
		required: false,
		default: null,
		required: function () {
			return this.googleId === null && this.email === null;
		},
	},
	email: {
		type: String,
		required: function () {
			return this.googleId === null && this.username === null;
		},
		default: null,
	},
	password: {
		type: String,
		required: function () {
			return this.googleId === null;
		},
	},
});

const User = mongoose.model("User", userSchema);

export default User;
