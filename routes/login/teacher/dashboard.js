const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login/teacher/dashboard", { userStatus: "teacher" });
});
module.exports = router;
