const express = require('express');
const newEmpRoutes = require('./src/newEmployee/routes');
const session = require('express-session');

const app = express();
const pool = require("./src/newEmployee/controller");

app.use(express.json()); //=> req.body

app.get("/", (req,res) => {
    res.send("Hello!");
});

app.use("/api/v1", newEmpRoutes);

app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
    session({
        secret: '262ggsdsh2436342rygryrwyw', // Use a strong secret in production
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 }, // Session expiry
    })
);

app.listen(5051, () => {
    console.log('Server listening on port 5051')
});