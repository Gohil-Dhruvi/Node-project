const mongoose = require("mongoose");

const dbconnect = () => {
    mongoose.connect("mongodb://localhost:27017/MovieDB")
        .then(() => console.log("Database connected successfully..."))
        .catch(err => console.error("Database Connection Error:", err));
};

module.exports = dbconnect;