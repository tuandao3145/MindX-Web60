// libraries
import React, { useContext } from "react";
import { List } from "antd";

// context
import { ProductsContext } from "../contexts/ProductsContext";
import { ProductCard } from "./ProductCard";

// products list component
export const ProductsList = () => {
	// using context
	const { productList, isLoading } = useContext(ProductsContext);

	// render
	return (
		<>
			{isLoading && <h1>Loading Data ...</h1>}
			<h1>ProductList</h1>
			{!isLoading && (
				<List
					grid={{ gutter: 16, column: 3 }}
					dataSource={productList}
					renderItem={(item) => (
						<List.Item>
							<ProductCard product={item} />
						</List.Item>
					)}
				/>
			)}
		</>
	);
};
