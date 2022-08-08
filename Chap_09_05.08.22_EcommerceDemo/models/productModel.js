const mongoose = require("mongoose");

//
const reviewSchema = mongoose.Schema({
	name: { type: String, required: true },
	rating: { type: Number, required: true },
	comment: { type: String, required: true },
	user: {
		type: mongoose.Schema.Types.Types.ObjectID,
		required: true,
		ref: "User",
	},
});

//
const productSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.Types.ObjectID,
		required: true,
		ref: "User",
	},

	name: {
		type: String,
		required: true,
	},
	reviews: [reviewSchema],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
