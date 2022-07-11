const express = require("express");
const mangaRouter = express.Router();

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
	const newManga = {
		id: mangaList.length + 1,
		name: req.body.name,
	};

	mangaList.push(newManga);
	res.send(mangaList);
});

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
