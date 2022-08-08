const shortID = require("shortid");
const express = require("express");
const userRouter = express.Router();
const Joi = require("joi");

// create demo user list
const userList = [
	{
		id: 1,
		name: "Tuan Dao",
		phone: "0123456789",
		email: "tuandao@yopmail.com",
		gender: "male",
		age: 26,
	},
	{
		id: 2,
		name: "Kim Lyn",
		phone: "123412341234",
		email: "lyn0210@yopmail.com",
		gender: "female",
		age: 26,
	},
	{
		id: 3,
		name: "Diana",
		phone: "012345678901",
		email: "targon.mooon.diana@yopmail.com",
		gender: "unidentified",
		age: 150,
	},
	{
		id: 4,
		name: "William Butcher",
		phone: "1231231231",
		email: "butcher123@yopmail.com",
		gender: "male",
		age: 35,
	},
];

// get all user
userRouter.get("/get", (req, res) => {
	res.send(userList);
});

// add new user
userRouter.post("/post", (req, res) => {
	// validate before post
	const { error } = validateUser(req.body);
	console.log("error: ", error);
	if (error) {
		// return status 400 and send message in details of the first error
		return res.status(400).send(error.details[0].message);
	}

	const newUser = {
		id: shortID.generate(),
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		gender: req.body.gender,
		age: req.body.age,
	};

	userList.push(newUser);
	res.send(userList);
});

// validate new user
const validateUser = (user) => {
	const schema = Joi.object({
		name: Joi.string()
			.min(5)
			.required()
			.pattern(/^[a-zA-Z]+$/),
		phone: Joi.string().pattern(/^[0-9]{10,12}$/),
		email: Joi.string().email(),
		gender: Joi.string().valid("male", "female", "unidentified").insensitive(),
		age: Joi.number().max(199),
	});
	return schema.validate(user);
};

// update name of a user
userRouter.put("/put", (req, res) => {
	userList.map((user) => {
		if (user.id == req.query.id) {
			user.name = req.body.name;
		}
	});
	console.log(req.query.id);
	res.send(userList);
});

// delete a user
userRouter.delete("/delete", (req, res) => {
	const selected_id = userList.findIndex((user) => {
		return user.id == req.query.id;
	});

	userList.splice(selected_id, 1);

	res.send(userList);
});

// export as modules
module.exports = userRouter;
