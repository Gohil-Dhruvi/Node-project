const express = require("express");
const port = 8000;
const path = require("path");
const dbconnect = require("./config/dbconnection");
const movieRoutes = require("./routes/movie.routes");

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

dbconnect();
app.use("/", movieRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
