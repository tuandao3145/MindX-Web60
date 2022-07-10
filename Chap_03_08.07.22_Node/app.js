// ex 1
let data = require("./students.json");
let student = JSON.stringify(data);

// log as query string
const querystring = require("node:querystring");
let queryStringResult = querystring.stringify(data);
console.log(queryStringResult);

// log as object
console.log(data);

// log as string
console.log(student);

// ex 2

// server
const http = require("http");

const port = 5001;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");

	if (req.url === "/index") {
		res.end(`<h1>đây là trang chủ</h1>`);
	} else if (req.url === "/about") {
		res.end(`<h1>${student}</h1>`);
	} else {
		res.end(`<h1>Đường dẫn này không tồn tại</h1>`);
	}
});

server.listen(port, () => {
	console.log(`Server running at port ${port}`);
});
