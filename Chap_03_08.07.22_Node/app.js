// ex1
// const mySort = (numList) => {
// 	let result = [];
// 	numList.map((num) => {
// 		if (num % 2 === 0 && !result.includes(num)) {
// 			result.push(num);
// 		}
// 	});
// 	console.log(result);
// };

// let a = [1, 2, 2, 3, 4, 4, 5, 6, 7, 8, 8, 9, 9];

// mySort(a);

// ex2

// let data = { name: "tuananh", children: ["com", "ngo"], age: "31" };
// const querystring = require("node:querystring");
// let result = querystring.stringify(data);
// console.log(result);

// ex3
// const bd = require("./birthday");

// let date = "1996/08/21";

// console.log(bd.getBirthday(date).toLocaleDateString());

// ex4
const http = require("http");

const server = http.createServer((req, res) => {
	if (req.url === "/") {
		res.end("Welcome to homepage");
	} else if (res.url === "/about") {
		res.end("Here is About page");
	} else {
		res.end("Not found");
	}
});

server.listen(5001);
