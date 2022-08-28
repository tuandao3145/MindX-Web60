// libraries
import React, { useState } from "react";
import {
	Avatar,
	List,
	Row,
	Col,
	Popconfirm,
	notification,
	Button,
	Modal,
	Form,
	Input,
	Select,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

// component

// data
import { data } from "../data/people";

const { Option } = Select;

// modal add
const AddMemberForm = ({ visible, onCreate, onCancel }) => {
	const [form] = Form.useForm();
	return (
		<Modal
			visible={visible}
			title="Add New Member"
			okText="Add"
			cancelText="Cancel"
			onCancel={onCancel}
			onOk={() => {
				form
					.validateFields()
					.then((values) => {
						form.resetFields();
						onCreate(values);
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
		>
			<Form form={form} layout="vertical">
				<Form.Item
					label="First Name"
					name="firstName"
					rules={[
						{
							required: true,
							message: "Please input your first name!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Last Name"
					name="lastName"
					rules={[
						{
							required: true,
							message: "Please input your last name!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="email"
					label="E-mail"
					rules={[
						{
							type: "email",
							message: "The input is not valid E-mail!",
						},
						{
							required: true,
							message: "Please input your E-mail!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Gender"
					name="gender"
					rules={[
						{
							required: false,
							message: "Please input your gender!",
						},
					]}
				>
					<Select initialValue="Male">
						<Option value="Male">Male</Option>
						<Option value="Female">Female</Option>
					</Select>
				</Form.Item>
				<Form.Item
					label="Address"
					name="address"
					rules={[
						{
							required: false,
							message: "Please input your address!",
						},
					]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};

// manager member
export const ManagerMember = () => {
	// states
	const [people, setPeople] = useState(data);
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
		setPeople([]);
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
		const newPeople = people.filter((member) => member.id !== id);
		setPeople(newPeople);
		notification["success"]({
			message: "Delete member successfully!",
			duration: 2,
		});
	};

	// add a member
	const handleAddMember = (values) => {
		const newMember = {
			id: people.length + 1,
			first_name: values.firstName,
			last_name: values.lastName,
			email: values.email,
			gender: values.gender,
			avatar:
				"https://robohash.org/consecteturvoluptatesmagnam.png?size=50x50&set=set1",
			address: values.address,
		};
		console.log(values);
		setPeople([newMember, ...people]);
		hideModal();
	};

	return (
		<>
			<Row>
				<Col span={8}>
					<h2 style={({ float: "left" }, { margin: "15px" })}>
						Total member: {people.length} members
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
					dataSource={people}
					renderItem={(item) => (
						<List.Item style={{ textAlign: "left" }}>
							<List.Item.Meta
								avatar={<Avatar src={item.avatar} />}
								title={
									<a href="https://ant.design">{`${item.first_name} ${item.last_name}`}</a>
								}
								description={
									<div>
										<Row>
											<Col span={6}>Email: </Col>
											<Col>{item.email}</Col>
										</Row>
										<Row>
											<Col span={6}>Gender: </Col>
											<Col>{item.gender}</Col>
										</Row>
										<Row>
											<Col span={6}>Address: </Col>
											<Col>{item.address}</Col>
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
