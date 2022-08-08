// Viết các hàm xử lý logic
// Gọi đến model - để tương tác với DB
// Được route gọi đến - để định tuyến người dùng đến controller nào

//
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateTokens");
const bcrypt = require("bcryptjs");

//
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, isAdmin } = req.body;

	// check exist
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User already existed");
	}

	// save to DB
	const newUser = await User.create({ name, email, password, isAdmin });

	if (newUser) {
		res.status(200).json({
			_id: newUser._id,
			name: newUser.name,
			email: newUser.email,
			password: newUser.password,
			token: generateToken({ id: newUser._id }),
		});
	} else {
		res.status(400);
		throw new Error("Cannot create user");
	}
});

// login user
const authLogin = asyncHandler(async (req, res) => {
	// handle login here
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

const getUserProfile = asyncHandler(async (req, res) => {
	// check user exist
	const user = await User.findById(req.user._id);
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(401);
		throw new Error("User info not found");
	}
});

const updateUserProfile = asyncHandler(async (req, res) => {
	// check user exist
	const user = await User.findById(req.user._id);
	if (user) {
		(user.name = req.body.name || user.name),
			(user.email = req.body.email || user.email);
		if (req.body.password) {
			// no need to hash pass here
			user.password = req.body.password;
		}
		const updateUser = await user.save();
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(401);
		throw new Error("User info not found");
	}
});

const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
	const deleteUser = await User.findById(req.params.id);
	if (deleteUser) {
		await deleteUser.remove();
		res.json({ message: "Delete success" });
	} else {
		res.status(401);
		throw new Error("Cannot delete user");
	}
});

const getUserByID = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select("-password");
	if (user) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(401);
		throw new Error("User not found");
	}
});

const updateUserByID = asyncHandler(async (req, res) => {
	// check user exist
	const user = await User.findById(req.params.id);
	if (user) {
		try {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;
			if (req.body.password) {
				// no need to hash pass here
				user.password = req.body.password;
			}
			const updateUser = await user.save();
			res.json({
				_id: user.id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		} catch (error) {
			console.log("Error while update user", error);
		}
	} else {
		res.status(401);
		throw new Error("User not found");
	}
});

// export
module.exports = {
	registerUser,
	authLogin,
	getUserProfile,
	updateUserProfile,
	getAllUsers,
	deleteUser,
	getUserByID,
	updateUserByID,
};
