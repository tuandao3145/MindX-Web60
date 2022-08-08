const express = require("express");
const mangaRouter = express.Router();
const Joi = require("joi");

// create demo manga list
const mangaList = [
	{ id: 1, name: "One Punch Man" },
	{ id: 2, name: "Doraemon" },
	{ id: 3, name: "Conan" },
	{ id: 4, name: "Dragon Balls" },
];

// get all manga
mangaRouter.get("/get", (req, res) => {
	res.send(mangaList);
});

// add new manga
mangaRouter.post("/post", (req, res) => {
	// validate before post
	const { error } = validateManga(req.body);
	console.log("error: ", error);
	if (error) {
		// return status 400 and send message in details of the first error
		return res.status(400).send(error.details[0].message);
	}

	const newManga = {
		id: mangaList.length + 1,
		name: req.body.name,
	};

	mangaList.push(newManga);
	res.send(mangaList);
});

// validate manga name
const validateManga = (manga) => {
	const schema = Joi.object({
		name: Joi.string().min(5).required(),
	});
	return schema.validate(manga);
};

// update name of a manga
mangaRouter.put("/put", (req, res) => {
	mangaList.map((manga) => {
		if (manga.id == req.query.id) {
			manga.name = req.body.name;
		}
	});

	res.send(mangaList);
});

// delete a manga
mangaRouter.delete("/delete", (req, res) => {
	const selected_id = mangaList.findIndex((manga) => {
		return manga.id == req.query.id;
	});

	mangaList.splice(selected_id, 1);
	res.send(mangaList);
});

// export as modules
module.exports = mangaRouter;
