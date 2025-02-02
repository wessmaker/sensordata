const express = require("express");
const cors = require("cors");
const testjson = require("./json/testtopics.json");
const app = express();
const port = 3002;

app.use(cors());

app.listen(port, () => {
	console.log("Server is listening on port: " + port);
});

console.log(testjson.topics);
app.get("/topics", (request, response) => {
	console.log(request.headers);
	response.send(testjson);
});
