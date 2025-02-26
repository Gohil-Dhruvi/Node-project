const express = require("express");

const app = express();
const port = 9000;

app.use(express.urlencoded());
app.set("view engine", "ejs");

let tasks = [
    { id: "1", title: "Learn Node.js", status: "Pending", deadline: "2025-03-01T10:00" },
    { id: "2", title: "Practice DSA", status: "Completed", deadline: "2025-03-02T14:00" }
];

app.get("/", (req, res) => {
    res.render("index", { tasks });
});

app.post("/addtask", (req, res) => {
    const { id, title, status, deadline } = req.body;
    tasks.push({ id, title, status, deadline });
    console.log("Task Added:", req.body);
    res.redirect("/");
});

app.get("/deletetask/:id", (req, res) => {
    const taskId = req.params.id;
    tasks = tasks.filter(task => task.id !== taskId);
    console.log("Task Deleted:", taskId);
    res.redirect("/");
});

app.get("/edittask/:id", (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).send("Task not found");
    }
    res.render("edit", { task });
});

app.post("/updatetask/:id", (req, res) => {
    const taskId = req.params.id;
    const { title, status, deadline } = req.body;

    tasks = tasks.map(task =>
        task.id === taskId ? { id: taskId, title, status, deadline } : task
    );

    console.log("Task Updated:", taskId);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
