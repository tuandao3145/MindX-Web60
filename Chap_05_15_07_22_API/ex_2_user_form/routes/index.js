const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("index", { title: "Lớp WebFullStack60" });
});

module.exports = router;
