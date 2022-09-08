// libraries
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// data api url
const API_URL = "https://6318c896f6b281877c7675cc.mockapi.io/products";

// define context
export const ProductsContext = createContext();

// main component
export const ProductsProvider = ({ children }) => {
	// handle user list
	const [productList, setProductList] = useState();

	// loading ?
	const [isLoading, setIsLoading] = useState(true);

	// cart
	const [cart, setCart] = useState({
		items: [],
		total: 0,
		price: 0,
	});

	// add to cart
	const addToCart = (product) => {
		// create new cart
		let newCart = {
			items: cart.items,
			total: 0,
			price: 0,
		};

		// get item's id list
		let itemIdList = newCart.items.map((item) => item.info.id);
		console.log("ids: ", itemIdList);

		// check exist
		let exist = itemIdList.includes(product.id);

		if (!exist) {
			newCart.items.push({
				info: product,
				qty: 1,
			});
		} else {
			for (let item of newCart.items) {
				if (item.info.id === product.id) {
					item.qty += 1;
				}
			}
		}

		for (let item of newCart.items) {
			newCart.total += item.qty;
			newCart.price += item.info.price * item.qty;
		}

		// set new cart state
		setCart(newCart);
		console.log("final: ", cart);
	};

	// remove an item in cart
	const removeFromCart = (product) => {
		// create new cart
		let newCart = {
			items: cart.items,
			total: 0,
			price: 0,
		};

		for (let item of newCart.items) {
			if (item.info.id === product.id) {
				item.qty -= 1;
			}
			if (item.qty === 0) {
				newCart.items.filter((item) => item.info.id !== product.id);
			}
		}

		for (let item of newCart.items) {
			newCart.total += item.qty;
			newCart.price += item.info.price * item.qty;
		}

		setCart(newCart);
		console.log("cart: ", cart);
	};

	// call API
	const getProducts = async () => {
		setIsLoading(true);
		const res = await axios({
			method: "get",
			url: API_URL,
			type: "json",
		});

		if (res.status === 200) {
			setProductList(res.data);
		}
		console.log("products: ", res.data);
		setIsLoading(false);
	};

	// fetch data
	useEffect(() => {
		getProducts();
	}, []);

	return (
		<ProductsContext.Provider
			value={{ productList, isLoading, cart, addToCart, removeFromCart }}
		>
			{children}
		</ProductsContext.Provider>
	);
};
