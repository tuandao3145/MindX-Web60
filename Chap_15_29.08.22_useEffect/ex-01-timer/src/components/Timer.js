// libraries
import React, { useState, useEffect } from "react";
import { Button, Row } from "antd";

// timer
export const Timer = () => {
	// handle time
	const [sec, setSec] = useState(0);

	// handle start
	const [isStart, setIsStart] = useState(false);

	// handle start
	const onStart = () => {
		setIsStart(true);
		setSec(sec + 1);
		console.log("started");
	};

	// handle pause
	const onPause = () => {
		setIsStart(false);
		console.log("paused");
	};

	// handle stop
	const onStop = () => {
		setSec(0);
		setIsStart(false);
		console.log("stopped");
	};

	useEffect(() => {
		if (isStart) {
			const interval = setInterval(() => setSec(sec + 1), 1000);
			return () => {
				clearInterval(interval);
			};
		}
	}, [isStart, sec]);

	// style
	const rowStyle = {
		margin: "20px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	const buttonStyle = {
		width: "100px",
	};

	const startBtnStyle = {
		...buttonStyle,
		backgroundColor: "#52c41a",
	};

	const pauseBtnStyle = {
		...buttonStyle,
		backgroundColor: "#ffec3d",
	};

	// render
	return (
		<>
			<Row style={rowStyle}>
				<div>Seconds: {sec} s</div>
			</Row>
			<Row style={rowStyle}>
				{!isStart && sec === 0 && (
					<Button onClick={onStart} style={startBtnStyle}>
						Start
					</Button>
				)}
				{isStart && sec > 0 && (
					<Button onClick={onPause} style={pauseBtnStyle}>
						Pause
					</Button>
				)}
				{!isStart && sec > 0 && (
					<Button type="primary" onClick={onStart} style={buttonStyle}>
						Continue
					</Button>
				)}
			</Row>

			{!isStart && sec > 0 && (
				<Row style={rowStyle}>
					<Button type="danger" onClick={onStop} style={buttonStyle}>
						Reset
					</Button>
				</Row>
			)}
		</>
	);
};
