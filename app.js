const express = require("express");
const app = express();
const path = require("path");

// middleware
app.use(express.static(path.join(__dirname, "./public")));

// configuration line - overriding default engine
app.set("view engine", "ejs");

// array of meat objects
const inventory = [
    { name: "sirloin", type: "beef", amount: 25 }, 
    { name: "ribs", type: "pork", amount: 0 },
    { name: "wings", type: "chicken", amount: 10 },
    { name: "breast", type: "chicken", amount: 5 },
    { name: "cod", type: "fish", amount: 22 },
    { name: "haddock", type: "fish", amount: 2 },
    { name: "chops", type: "pork", amount: 0 },
];

app.get("/", (req, res) => {
    // usually check if user is logged in or not
    let username = "Ben";
    res.render("landing", {data : username, stock : inventory});
});

app.get("/playlist", (req, res) => {
    res.send("my playlist");
});

// template route for playlist - do not build different routes for different playlists
app.get("/playlist/:playId", (req, res) => {
    let id = req.params.playId;
    res.send(`SELECT * FROM playlists where ID = ${id}`);
});

app.get("/products", (req, res) => {
    let queryp = req.query.q;
    res.send(`SELECT * FROM products WHERE name LIKE ${queryp}`);
});

const server = app.listen(3000, (err) => {
    if (err) throw err;
    console.log(`listening on port 3000`);
});