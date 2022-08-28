import React from "react";
import {
	Modal,
	Form,
	Input,
	Select,
	InputNumber,
	Checkbox,
	Col,
	Row,
} from "antd";

// component

const { Option } = Select;

// modal add
export const AddMemberForm = ({ visible, onCreate, onCancel }) => {
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
					name="age"
					label="Age"
					rules={[
						{
							type: "number",
							required: true,
							message: "Please input your phone!",
						},
					]}
				>
					<InputNumber style={{ width: "100%" }} min="1" max="99" />
				</Form.Item>

				<Form.Item
					label="Gender"
					name="gender"
					rules={[
						{
							required: true,
							message: "Please select your gender!",
						},
					]}
				>
					<Select initialValue="Male">
						<Option value="Male">Male</Option>
						<Option value="Female">Female</Option>
					</Select>
				</Form.Item>

				<Form.Item
					name="hometown"
					label="Hometown"
					rules={[
						{
							required: true,
							message: "Please input your home town!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="phone"
					label="Phone"
					rules={[
						{
							type: "number",
							required: false,
							message: "Please input your phone!",
						},
					]}
				>
					<InputNumber
						style={{ width: "100%" }}
						min="1000000000"
						max="9999999999"
					/>
				</Form.Item>

				<Form.Item name="hobbies" label="Hobbies">
					<Checkbox.Group>
						<Row>
							<Col span={6}>
								<Checkbox
									value="football"
									style={{
										lineHeight: "32px",
									}}
								>
									Football
								</Checkbox>
							</Col>
							<Col span={6}>
								<Checkbox
									value="volleyball"
									style={{
										lineHeight: "32px",
									}}
								>
									Volleyball
								</Checkbox>
							</Col>
							<Col span={6}>
								<Checkbox
									value="esport"
									style={{
										lineHeight: "32px",
									}}
								>
									E-sport
								</Checkbox>
							</Col>
							<Col span={6}>
								<Checkbox
									value="reading"
									style={{
										lineHeight: "32px",
									}}
								>
									Reading
								</Checkbox>
							</Col>
						</Row>
					</Checkbox.Group>
				</Form.Item>
				<Form.Item name="intro" label="Introduction">
					<Input.TextArea />
				</Form.Item>
			</Form>
		</Modal>
	);
};
