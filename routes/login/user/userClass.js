const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("login/user/userClass",{userStatus: "user"});
});
module.exports = router;
