// using express to create a server
const express = require("express");
const app = express();
const port = 5002;

// routers
const userRouter = require("./router/userRouter");

// use APIs
app.use(express.json());
app.use("/api/user", userRouter);

// listen
app.listen(port, () => {
	console.log("Server is running on port ", port);
});
