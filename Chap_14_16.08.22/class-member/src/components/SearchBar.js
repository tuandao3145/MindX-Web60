import React from "react";
import { Input } from "antd";

const { Search } = Input;

// search bar
export const SearchBar = ({ onSearch }) => {
	return (
		<>
			<Search
				placeholder="search member"
				allowClear
				onChange={(e) => onSearch(e.target.value)}
				style={{ width: 200 }}
			/>
		</>
	);
};
