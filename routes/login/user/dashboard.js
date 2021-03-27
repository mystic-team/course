const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login/user/dashboard", { userStatus: "user" });
});
module.exports = router;
