const express = require("express");
const mongoose = require("mongoose");
const todo = require("./router/Todo");

const app = express();
app.use(express.json());
mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb+srv://vijeeth:VijeethLooperex@cluster0.jukwq5v.mongodb.net/?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on("error", (err) => console.log("Error", err));
db.once("open", () => console.log("mongoose Atlas connected successfully"));

app.listen(4000, console.log("server is running"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/todo", todo);
