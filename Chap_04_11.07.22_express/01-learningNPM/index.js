const jsonexport = require("jsonexport");

const contact = {
	name: "tuandao",
	age: 26,
	courseName: "web60",
};

jsonexport(contact, (e, csvContact) => {
	e ? console.log(e) : console.log("your CSV: ", csvContact);
});

const dateConvert = require("@sineverba/date-convert");

const rawDate = "20220323";

console.log(dateConvert.fromIsoToHuman(rawDate));
