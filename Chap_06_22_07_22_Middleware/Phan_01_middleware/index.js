const express = require("express");
const app = express();
const port = 5001;

// middle ware
const checkRequestMiddleware = (req, res, next) => {
	if (req.url === "/admin") {
		res.send("Ban ko co quyen truy cap vao trang nay");
	} else {
		next();
	}
};

app.use(checkRequestMiddleware);

// routers
app.get("/", (req, res) => {
	res.send("Truy cap homepage thanh cong");
});

app.get("/shopping-cart", (req, res) => {
	res.send("Truy cap gio hang thanh cong");
});

app.get("/admin", (req, res) => {
	res.send("Truy cap admin thanh cong");
});

// listen
app.listen(port, () => {
	console.log("Server is running on port ", port);
});
