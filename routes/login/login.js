const express = require("express");
const router = express.Router();

const admin = require("./../../firebase-admin");
const db = admin.firestore();

db.settings({ timestampsInSnapshots: true });
router.get("/", (req, res) => {
  res.render("login/login");
});
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  let adminFlag = false;
  let teacherFlag = false;
  let userFlag = false;
  let errors = [];
  await db
    .collection("admin")
    .get()
    .then((user) => {
      user.docs.forEach((c) => {
        if (c.data().password == password && c.data().email == email) {
          adminFlag = true;
        }
      });
    });
  if (adminFlag) {
    res.render("login/admin/dashboard");
  } else {
    await db
      .collection("teacher")
      .get()
      .then((user) => {
        user.docs.forEach((c) => {
          if (c.data().password == password && c.data().email == email) {
            teacherFlag = true;
          }
        });
      });
    if (teacherFlag) {
      res.render("login/teacher/dashboard");
    } else {
      await db
        .collection("user")
        .get()
        .then((user) => {
          user.docs.forEach((c) => {
            if (c.data().password == password && c.data().email == email) {
              userFlag = true;
            }
          });
        });
      if (userFlag) {
        res.render("login/user/dashboard");
      }
    }
  }
  if (!(userFlag || teacherFlag || adminFlag)) {
    errors.push({ msg: "Incorrect Detail" });
    res.render("login/login", { errors });
  }
});
module.exports = router;
