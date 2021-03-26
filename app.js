const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

app.set("view engine", "ejs");

app.set(express.static("static"));

app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`On Port ${PORT}`));
