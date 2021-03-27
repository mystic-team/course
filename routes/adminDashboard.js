const express = require("express");
const router = express.Router();

const admin = require("./../firebase-admin");
const db = admin.firestore();

router.post("/", async (req, res) => {
  const { tAdd, tDelete, uAdd, uDelete } = req.body;
  let errors = [];
  let flag = false;
  if (tAdd) {
    await db
      .collection("teacher")
      .get()
      .then((user) => {
        user.docs.forEach((c) => {
          if (c.id == tAdd) {
            flag = true;
          }
        });
      });
    if (!flag) {
      db.doc(`teacher/${tAdd}`).set({});
      errors.push({ msg: "Teacher added" });
      res.render("login/admin/dashboard", { errors, userStatus: "admin" });
    } else {
      errors.push({ msg: "Teacher already exist" });
      res.render("login/admin/dashboard", { errors, userStatus: "admin" });
    }
  } else if (uAdd) {
    await db
      .collection("user")
      .get()
      .then((user) => {
        user.docs.forEach((c) => {
          if (c.id == uAdd) {
            flag = true;
          }
        });
      });
    if (!flag) {
      db.doc(`user/${uAdd}`).set({});
      errors.push({ msg: "Student added" });
      res.render("login/admin/dashboard", { errors, userStatus: "admin" });
    } else {
      errors.push({ msg: "User already exist" });
      res.render("login/admin/dashboard", { errors, userStatus: "admin" });
    }
  } else if (tDelete) {
    db.collection("teacher").doc(tDelete).delete();
    errors.push({ msg: "Teacher removed successfully" });
    res.render("login/admin/dashboard", { errors, userStatus: "admin" });
  } else if (uDelete) {
    db.collection("user").doc(uDelete).delete();
    errors.push({ msg: "Student removed successfully" });
    res.render("login/admin/dashboard", { errors, userStatus: "admin" });
  } else {
    errors.push({ msg: "Please enter data" });
    res.render("login/admin/dashboard", { errors, userStatus: "admin" });
  }
});
module.exports = router;
