// libraries
import React, { useState } from "react";
import { List, Row, Col, Popconfirm, notification, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

// component
import { AddMemberForm } from "./AddMemberForm";
import { SearchBar } from "./SearchBar";

// data
import { data } from "../data/members";

// manager member
export const ManagerMember = () => {
	// states
	const [members, setMembers] = useState(data);
	const [visible, setVisible] = useState(false);

	// show modal
	const showModal = () => {
		setVisible(true);
	};

	// hide modal
	const hideModal = () => {
		setVisible(false);
	};

	// delete all members
	const confirmDelete = () => {
		setMembers([]);
		notification["success"]({
			message: "All members have been deleted successfully!",
			duration: 2,
		});
	};

	// close popup delete all members
	const cancelDelete = () => {
		return;
	};

	// delete a single member
	const removeMember = (id) => {
		const newPeople = members.filter((member) => member.id !== id);
		setMembers(newPeople);
		notification["success"]({
			message: "Delete member successfully!",
			duration: 1.5,
		});
	};

	// add a member
	const handleAddMember = (values) => {
		const newMember = {
			id: members.length + 1,
			first_name: values.firstName,
			last_name: values.lastName,
			age: values.age,
			gender: values.gender,
			hometown: values.hometown,
			phone: values.phone,
			hobbies: values.hobbies,
			intro: values.intro,
		};
		console.log(values);
		setMembers([newMember, ...members]);
		hideModal();
	};

	// search member
	const handleSearch = (keyword) => {
		console.log(keyword);
		const filter = members.filter((item) =>
			`${item.first_name} ${item.last_name}`
				.toLowerCase()
				.includes(keyword.toLowerCase())
		);
		setMembers(filter);
		if (keyword === "") {
			setMembers(data);
		}
	};

	return (
		<>
			<Row>
				<SearchBar
					style={({ float: "left" }, { margin: "15px" })}
					onSearch={handleSearch}
				/>
			</Row>
			<Row>
				<Col span={8}>
					<h2 style={({ float: "left" }, { margin: "15px" })}>
						Total {members.length} members
					</h2>
				</Col>
				<Col span={8}>
					<Popconfirm
						title="Are you sure to delete all members?"
						onConfirm={confirmDelete}
						onCancel={cancelDelete}
						okText="Yes"
						cancelText="No"
					>
						<Button style={({ float: "left" }, { margin: "15px" })}>
							Delete All
						</Button>
					</Popconfirm>
				</Col>
				<Col span={8}>
					<Button
						style={({ float: "left" }, { margin: "15px" })}
						type="primary"
						onClick={showModal}
					>
						Add New
					</Button>
					<AddMemberForm
						visible={visible}
						onCreate={handleAddMember}
						onCancel={hideModal}
					/>
				</Col>
			</Row>
			<div>
				<List
					itemLayout="horizontal"
					dataSource={members}
					renderItem={(item) => (
						<List.Item style={{ textAlign: "left" }}>
							<List.Item.Meta
								title={<a href="https://ant.design">{`${item.first_name}`}</a>}
								description={
									<div>
										<Row>
											<Col span={6}>Full Name: </Col>
											<Col>{`${item.first_name} ${item.last_name}`}</Col>
										</Row>
										<Row>
											<Col span={6}>Age: </Col>
											<Col>{item.age}</Col>
										</Row>
										<Row>
											<Col span={6}>Gender: </Col>
											<Col>{item.gender}</Col>
										</Row>
										<Row>
											<Col span={6}>Hometown: </Col>
											<Col>{item.hometown}</Col>
										</Row>
									</div>
								}
							/>
							<div style={{ margin: "20px" }}>
								<DeleteOutlined onClick={() => removeMember(item.id)} />
							</div>
						</List.Item>
					)}
				/>
			</div>
		</>
	);
};
