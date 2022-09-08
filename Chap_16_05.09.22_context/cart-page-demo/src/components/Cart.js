// libraries
import React, { useState, useContext } from "react";
import { Button, Drawer, Row, Col } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

// context
import { ProductsContext } from "../contexts/ProductsContext";

// cart component
export const Cart = () => {
	// cart from context
	const { cart, addToCart, removeFromCart } = useContext(ProductsContext);

	// handle open/close var
	const [open, setOpen] = useState(false);

	// open cart
	const showCart = () => {
		setOpen(true);
	};

	// close cart
	const closeCart = () => {
		setOpen(false);
	};

	return (
		<>
			<Button type="primary" style={{ margin: "10px 0 0" }} onClick={showCart}>
				Cart
			</Button>
			<Drawer
				title="Your Shopping Cart"
				placement="right"
				onClose={closeCart}
				open={open}
			>
				{cart.total === 0 ? (
					<h3>Nothing in your cart!!!</h3>
				) : (
					<>
						<Row>
							{cart.items.map((item, index) => {
								if (item.qty !== 0) {
									return (
										<Row style={{ width: "100%" }} key={index}>
											<Col span={16}>{item.info.name}</Col>
											<Col span={8}>
												{item.info.price}$&nbsp;&nbsp;x&nbsp;&nbsp;
												<PlusCircleOutlined
													onClick={() => addToCart(item.info)}
												/>
												&nbsp;
												{item.qty}
												&nbsp;
												<MinusCircleOutlined
													onClick={() => removeFromCart(item.info)}
												/>
											</Col>
										</Row>
									);
								}
							})}
						</Row>
						<Row style={{ justifyContent: "end", margin: "20px 0" }}>
							<Col span={12}></Col>
							<Col span={12}>Total items: {cart.total} item(s)</Col>
						</Row>
						<Row style={{ justifyContent: "end", margin: "20px 0" }}>
							<Col span={12}></Col>
							<Col span={12}>Total price: {cart.price}$</Col>
						</Row>
					</>
				)}
			</Drawer>
		</>
	);
};
