// using express to create a server
const express = require("express");
const app = express();
const port = 5001;

// routers
const mangaRouter = require("./router/mangaRouter");

// use APIs
app.use(express.json());
app.use("/api/manga", mangaRouter);

// listen
app.listen(port, () => {
	console.log("Server is running on port ", port);
});
