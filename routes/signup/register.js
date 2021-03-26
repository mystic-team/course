const express = require("express");
const router = express.Router();

const admin = require("./../../firebase-admin");
const db = admin.firestore();
router.get("/", (req, res) => {
  res.render("signup/register");
});
router.post("/", async (req, res) => {
  let errors = [];
  const { name, email, password, cpassword } = req.body;
  if (password != cpassword) {
    errors.push({ msg: "Password didnt match" });
    res.render("signup/register", { errors });
  } else {
    await db
      .collection("user")
      .get()
      .then((user) => {
        user.docs.forEach((c) => {
          if (c == email) {
            db.doc(`teacher/${email}`).add({
              name: name,
              email: email,
              password: password,
            });
          }
        });
      });
    errors.push({ msg: "Registered successful" });
    res.render("main/index", { errors });
  }
});
module.exports = router;
