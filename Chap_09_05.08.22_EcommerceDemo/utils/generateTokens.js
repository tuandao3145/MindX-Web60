const jwt = require("jsonwebtoken");

const generateToken = (id) => {
	return jwt.sign({ id }, "Abc@1234", { expiresIn: "1d" });
};

module.exports = generateToken;
