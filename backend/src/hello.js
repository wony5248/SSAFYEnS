const express = require("express")
const app = express()

app.get("/hi", (req, res) => {
    console.log("hi")
res.send("hello")
})

app.listen(8080, () => {
	console.log("welecome to nodejs server");
})
