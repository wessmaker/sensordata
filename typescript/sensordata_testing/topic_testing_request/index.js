const axios = require("axios");

const client = axios.create({
	baseURL: "localhost",
});

const getTopicsFromServer = async () => {
	const response = await client.get("http://localhost:3002/topics", {
		headers: {
			Accept: "application/json",
		},
	});

	console.log(response.data.topics);
};
getTopicsFromServer();
