const shortID = require("shortid");
const express = require("express");
const userRouter = express.Router();

// create demo user list
const userList = [
	{ id: 1, name: "Tuan Dao" },
	{ id: 2, name: "Kim Lyn" },
	{ id: 3, name: "Diana" },
	{ id: 4, name: "William Butcher" },
];

// get all user
userRouter.get("/get", (req, res) => {
	res.send(userList);
});

// add new user
userRouter.post("/post", (req, res) => {
	const newUser = {
		id: shortID.generate(),
		name: req.body.name,
	};

	userList.push(newUser);
	res.send(userList);
});

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
