// libraries
import React, { useEffect, useState } from "react";

// user url
const userUrl = "https://api.github.com/users/tuandao3145";

// get info component
export const GetGitHubInfo = () => {
	// handle user
	const [user, setUser] = useState({});
	// err ?
	const [isErr, setIsErr] = useState(false);

	// loading ?
	const [isLoading, setIsLoading] = useState(true);

	// call API to update for the FIRST time using useEffect
	useEffect(() => {
		// like componentDidMount

		fetch(userUrl)
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				} else {
					setIsLoading(false);
					setIsErr(true);
					throw new Error(res.statusText);
				}
			})
			.then((data) => {
				console.log("User GitHub info", data);
				setIsLoading(false);
				setUser(data);
			})
			.catch((err) => {
				setIsLoading(false);
				setIsErr(true);
			});
	}, []);

	// display, using condition rendering
	return (
		<>
			{isLoading && <h1>Loading data, please wait ...</h1>}

			{!isErr && !isLoading && user && (
				<>
					<p>Account: {user.login}</p>
					<p>Link: {user.url}</p>
					<p>Number of repo: {user.public_repos}</p>
					<p>Number of followers: {user.followers}</p>
				</>
			)}

			{isErr && <h1>Error happened, please try again!</h1>}
		</>
	);
};
