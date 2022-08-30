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
		sorter: (a, b) => {
			let aName = `${a.name.title}${a.name.first}${a.name.last}`;
			let bName = `${b.name.title}${b.name.first}${b.name.last}`;
			return aName.localeCompare(bName);
		},
		sortDirections: ["ascend"],
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "Gender",
		dataIndex: "gender",
		filters: [
			{
				text: "Male",
				value: "male",
			},
			{
				text: "Female",
				value: "female",
			},
		],
		onFilter: (value, record) => record.gender.indexOf(value) === 0,
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
	const onChangeTable = (pagination, filters, sorter, extra) => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 500);

		console.log("params", pagination, filters, sorter, extra);
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
