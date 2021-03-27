const express = require("express");
const router = express.Router();

const admin = require("./../../firebase-admin");
const db = admin.firestore();
router.get("/", (req, res) => {
  res.render("signup/register");
});
router.post("/", async (req, res) => {
  let errors = [];
  let flag = false;
  const { name, email, password, cpassword } = req.body;
  if (password != cpassword) {
    errors.push({ msg: "Password didnt match" });
    res.render("signup/register", { errors });
  } else {
    await db
      .collection("teacher")
      .get()
      .then((user) => {
        user.docs.forEach((c) => {
          if (c.id == email) {
            if (!c.data().password) {
              db.doc(`teacher/${email}`).set({
                name: name,
                email: email,
                password: password,
              });
              flag = true;
              errors.push({ msg: "Registered successful" });
              res.render("main/index", { errors });
            } else {
              flag = true;
              errors.push({ msg: "You have already registered" });
              res.render("signup/register", { errors });
            }
          }
        });
      });
    if (!flag) {
      await db
        .collection("user")
        .get()
        .then((user) => {
          user.docs.forEach((c) => {
            if (c.id == email) {
              if (!c.data().password) {
                db.doc(`user/${email}`).update({
                  name: name,
                  email: email,
                  password: password,
                });
                flag = true;
                errors.push({ msg: "Registered successful" });
                res.render("main/index", { errors });
              } else {
                flag = true;
                errors.push({ msg: "You have already registered" });
                res.render("signup/register", { errors });
              }
            }
          });
        });
    }
    if (!flag) {
      errors.push({ msg: "Incorrect Email ID" });
      res.render("signup/register", { errors });
    }
  }
});
module.exports = router;
