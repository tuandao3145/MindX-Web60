// const
const url = "https://api.github.com/users/";

async function getData(user) {
	let users_data_url = url + user;
	let data = fetch(users_data_url)
		.then((response) => response.json())
		.then((data) => data)
		.catch(() => console.log("User not found"));
	return data;
}

const showData = (data) => {
	let $userInfo = document.getElementById("userInfo");

	if (data.message) {
		let errorMsg = document.createElement("h1");
		errorMsg.innerHTML = data.message;
		$userInfo.innerHTML = "";
		$userInfo.appendChild(errorMsg);
	} else {
		let $ava = document.createElement("img");
		let $name = document.createElement("div");
		let $email = document.createElement("div");
		let $company = document.createElement("div");
		let $followers = document.createElement("div");

		let userInfo = {
			avaUrl: data.avatar_url,
			name: data.name,
			email: data.email,
			company: data.company,
			followers: data.followers,
		};

		$ava.src = userInfo.avaUrl;
		$ava.height = 200;
		$ava.weight = 200;
		$name.innerHTML = `Name: ${userInfo.name}`;
		$email.innerHTML = `Email: ${userInfo.email}`;
		$company.innerHTML = `Company: ${userInfo.company}`;
		$followers.innerHTML = `Followers: ${userInfo.followers}`;

		$userInfo.innerHTML = "";
		$userInfo.appendChild($ava);
		$userInfo.appendChild($name);
		$userInfo.appendChild($email);
		$userInfo.appendChild($company);
		$userInfo.appendChild($followers);
	}
};

function main() {
	let $userForm = document.getElementById("userForm");

	$userForm.addEventListener("submit", async function (e) {
		e.preventDefault();

		let user = $userForm.userName.value;
		let userData = await getData(user);
		$userForm.userName.value = "";

		showData(userData);
	});
}

main();
