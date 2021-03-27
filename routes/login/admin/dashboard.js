const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login/admin/dashboard", { userStatus: "admin" });
});
module.exports = router;
