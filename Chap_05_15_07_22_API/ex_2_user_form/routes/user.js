// this is the USER middleware
const express = require("express");
const router = express.Router();
const Joi = require("joi");

let err_data = {
	firstNameErr: "",
	lastNameErr: "",
	birthdayErr: "",
	genderErr: "",
	phoneErr: "",
	emailErr: "",
};

router.post("/", (req, res) => {
	// validate before post
	const { error } = validateUser(req.body);

	// get error
	if (error) {
		let err_msg = error.details[0].message;
		// let failedField = err_msg.match(/"([^"]+)"/)[1];
		// switch (failedField) {
		// 	case firstName:
		// 		data.firstNameErr = err_msg;
		// 	case lastName:
		// 		data.lastNameErr = err_msg;
		// 	case birthday:
		// 		data.birthdayErr = err_msg;
		// 	case gender:
		// 		data.genderErr = err_msg;
		// 	case phone:
		// 		data.phoneErr = err_msg;
		// 	case email:
		// 		data.emailErr = err_msg;
		// }
		return res.status(422).send(err_msg);
	} else {
		// if all validations pass
		const { body } = req;
		return res.render("userInfo", { body });
	}
});

// validate user info
const validateUser = (user) => {
	const schema = Joi.object({
		firstName: Joi.string().pattern(/^[a-zA-Z]+$/),
		lastName: Joi.string().pattern(/^[a-zA-Z]+$/),
		birthday: Joi.number(),
		gender: Joi.string().valid("male", "female").insensitive().required(),
		phone: Joi.string().pattern(/^[0-9]{10,12}$/),
		email: Joi.string().email(),
	});
	return schema.validate(user);
};

// export router
module.exports = router;
