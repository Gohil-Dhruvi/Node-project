const express = require('express');
const port = 8000;
const path = require('path');

const server = express();

server.use(express.urlencoded());
server.set("view engine","ejs");

server.use("/",express.static(path.join(__dirname,"public")));

server.get('/', (req, res) => {
    res.render('index');
});

server.get('/calender', (req, res) => {
    res.render('calender');
});

server.get('/form', (req, res) => {
    res.render('form');
});

server.get('/icons', (req, res) => {
    res.render('icons');
});

server.get('/login', (req, res) => {
    res.render('login');
});

server.get('/profile', (req, res) => {
    res.render('profile');
});

server.get('/register', (req, res) => {
    res.render('register');
});

server.get('/reset', (req, res) => {
    res.render('reset');
});

server.get('/table', (req, res) => {
    res.render('table');
});

server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});