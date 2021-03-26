const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/main/index"));
app.use("/register", require("./routes/signup/register"));
app.use("/dashboard/admin", require("./routes/login/admin/dashboard"));
app.use("/dashboard/teacher", require("./routes/login/teacher/dashboard"));
app.use("/dashboard/user", require("./routes/login/user/dashboard"));
app.use("/login", require("./routes/login/login"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`On Port ${PORT}`));
