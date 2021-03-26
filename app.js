const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/main/index"));
app.use("/register", require("./routes/signup/register"));
app.use("/dashboard", require("./routes/login/user/dashboard"));
app.use("/dashboard", require("./routes/login/admin/dashboard"));
app.use("/dashboard", require("./routes/login/teacher/dashboard"));
app.use("/login", require("./routes/login/login"));
app.use("/adminDashbaord", require("./routes/adminDashboard"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`On Port ${PORT}`));
