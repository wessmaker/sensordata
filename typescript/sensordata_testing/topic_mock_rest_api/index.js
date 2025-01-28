const express = require("express");
const testjson = require("./json/testtopics.json");
const app = express();
const port = 3002;

app.listen(port, () => {
	console.log("Server is listening on port: " + port);
});

console.log(testjson.topics[1]);

app.get("/topics", (request, response) => {
	response.send(testjson);
});
