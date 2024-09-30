const express = require('express');
const newClientRoutes = require('./src/newClient/routes');

const app = express();
const pool = require("./src/newClient/controller");

app.use(express.json()); //=> req.body

app.get("/", (req,res) => {
    res.send("Hello!");
});

app.use("/api/v1", newClientRoutes);

app.listen(5050, () => {
    console.log('Server listening on port 5050')
});