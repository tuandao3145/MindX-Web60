// libraries
import React, { useContext } from "react";
import { Card, Button } from "antd";

import { ProductsContext } from "../contexts/ProductsContext";

// define meta of card
const { Meta } = Card;

export const ProductCard = ({ product }) => {
	// use cart variable
	const { addToCart } = useContext(ProductsContext);

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<Card
				hoverable
				style={{
					width: 200,
					height: 300,
					border: "1px solid black",
					borderRadius: "10px",
				}}
				cover={
					<img
						alt="example"
						src={product.img}
						style={{
							width: 200,
							height: 100,
							border: "1px solid black",
							borderRadius: "10px",
						}}
					/>
				}
			>
				<Meta title={product.name} />
				<Meta
					title={product.price + " $"}
					description={product.desc.substring(0, 40) + "..."}
				/>
			</Card>
			<Button
				type="primary"
				size="middle"
				shape="round"
				style={{
					width: 150,
					display: "sticky",
					bottom: "50px",
					right: "-25px",
				}}
				onClick={() => addToCart(product)}
			>
				Add to Cart
			</Button>
		</div>
	);
};
