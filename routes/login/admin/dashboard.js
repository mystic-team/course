const express = require("express");
const router = express.Router();

const admin = require("firebase-admin");
const db = admin.firestore();
router.get("/", async (req, res) => {
  res.render("login/admin/dashboard", { userStatus: "admin" });
});
module.exports = router;
