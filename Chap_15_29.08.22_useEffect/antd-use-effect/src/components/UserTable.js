// libraries
import React, { useState, useEffect } from "react";
import { Table } from "antd/";
const axios = require("axios").default;

// url
const API_URL = "https://randomuser.me/api?results=100";

// schema
const columnUsers = [
	{
		title: "Name",
		dataIndex: "name",
		render: (name) => `${name.title} ${name.first} ${name.last}`,
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "Gender",
		dataIndex: "gender",
	},
	{
		title: "Phone",
		dataIndex: "phone",
	},
];

// user table
export const UserTable = () => {
	// handle user list
	const [userList, setUserList] = useState();

	// loading ?
	const [isLoading, setIsLoading] = useState(true);

	// call API
	const callAPI = async () => {
		setIsLoading(true);
		const res = await axios({
			method: "get",
			url: API_URL,
			type: "json",
		});

		if (res.status === 200) {
			setUserList(res.data.results);
		}

		console.log("User Data: ", res.data.results);
		setIsLoading(false);
	};

	// fetch data
	useEffect(() => {
		callAPI();
	}, []);

	// pagination loading
	const onChangeTable = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	};

	return (
		<>
			{isLoading && <h1>Loading Data ...</h1>}
			<h2>User Table</h2>
			<Table
				columns={columnUsers}
				dataSource={userList}
				rowKey={"email"}
				loading={isLoading}
				onChange={onChangeTable}
			/>
		</>
	);
};
