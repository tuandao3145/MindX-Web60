const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const port = 5002;

// middle ware

// settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middleware
app.use(express.static("public"));

// render
app.get("/", (req, res) => {
	res.render("index");
});

// listen
app.listen(port, () => {
	console.log("Server is running on port ", port);
});
