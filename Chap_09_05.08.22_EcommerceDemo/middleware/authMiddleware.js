const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// 1. Kiểm tra token có hợp lệ hay không
// có gửi token lên không?

const protect = asyncHandler(async (req, res, next) => {
	// check token exist
	const authorization = req.headers.authorization;
	if (authorization && authorization.startsWith("Bearer")) {
		// check token valid
		try {
			const token = authorization.split(" ")[1];
			const userVerify = jwt.verify(token, "Abc@1234");
			req.user = await User.findById(userVerify.id).select("-password");
			next();
		} catch (error) {
			res.status(401);
			throw new Error("Invalid token");
		}
	} else {
		res.status(401);
		throw new Error("Not authorized or no valid token");
	}
});

const checkIsAdmin = asyncHandler(async (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error("Access denied");
	}
});

module.exports = {
	protect,
	checkIsAdmin,
};
