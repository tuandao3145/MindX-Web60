//Libraries

// css
import "./css/App.css";

// contexts
import { ProductsProvider } from "./contexts/ProductsContext";

// components
import { ProductsList } from "./components/ProductsList";
import { Cart } from "./components/Cart";
import { Col, Row } from "antd";

// main app
function App() {
	return (
		<div style={{ width: "90%", margin: "auto" }}>
			<ProductsProvider>
				<Row>
					<Col span={23}>
						<ProductsList />
					</Col>
					<Col span={1}>
						<Cart />
					</Col>
				</Row>
			</ProductsProvider>
		</div>
	);
}

export default App;
