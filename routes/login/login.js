const { render } = require("ejs");
const express = require("express");
const router = express.Router();

const admin = require("./../../firebase-admin");
const db = admin.firestore();

db.settings({ timestampsInSnapshots: true });
router.get("/", (req, res) => {
  res.render("login/login");
});
const getSort = (sem, className, students, links, postDetails) => {
  let allUsers = [];
  for (let i = 0; i < sem.length; i++) {
    let current = {};
    current.sem = sem[i];
    current.className = className[i];
    current.students = students[i];
    current.links = links[i];
    current.postDetails = postDetails[i];
    allUsers.push(current);
  }
  allUsers = allUsers.sort((a, b) => a.sem - b.sem);
  return allUsers;
};
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  let adminFlag = false;
  let teacherFlag = false;
  let userFlag = false;
  let userDetails = {
    className: [],
    students: [],
    sem: [],
    sorted: [],
    links: [],
    postDetails: [],
  };
  let teachers = [];
  let students = [];
  let errors = [];
  await db
    .collection("admin")
    .get()
    .then((user) => {
      user.docs.forEach(async (c) => {
        if (c.data().password == password && c.data().email == email) {
          userDetails = c.data();
          adminFlag = true;
        }
      });
    });
  if (adminFlag) {
    await db
      .collection("teacher")
      .get()
      .then((user) => {
        user.docs.forEach((c) => {
          teachers.push(c.id);
        });
      });
    await db
      .collection("user")
      .get()
      .then((user) => {
        user.docs.forEach((c) => {
          students.push(c.id);
        });
      });
    res.render("login/admin/dashboard", {
      userStatus: "admin",
      userDetails: JSON.stringify(userDetails),
      teachers: JSON.stringify(teachers),
      students: JSON.stringify(students),
    });
  } else {
    await db
      .collection("teacher")
      .get()
      .then((user) => {
        user.docs.forEach((c) => {
          if (c.data().password == password && c.data().email == email) {
            userDetails = c.data();
            teacherFlag = true;
          }
        });
      });
    if (teacherFlag) {
      await db
        .doc(`teacher/${email}`)
        .collection("class")
        .get()
        .then((user) => {
          let className = [];
          let students = [];
          let links = [];
          let postDetails = [];
          let sem = [];
          user.docs.forEach((c) => {
            sem.push(c.data().sem);
            className.push(c.data().className);
            students.push(c.data().students);
            links.push(c.data().links);
            postDetails.push(c.data().postDetails);
          });
          userDetails.sorted = getSort(
            sem,
            className,
            students,
            links,
            postDetails
          );
        });
      res.render("login/teacher/dashboard", {
        userStatus: "teacher",
        userDetails: JSON.stringify(userDetails),
      });
    } else {
      await db
        .collection("user")
        .get()
        .then((user) => {
          user.docs.forEach((c) => {
            if (c.data().password == password && c.data().email == email) {
              userDetails = c.data();
              userFlag = true;
            }
          });
        });
      if (userFlag) {
        let allUsers = [];
        let count = 0;
        renderDashboard = () => {
          res.render("login/user/dashboard", {
            userStatus: "user",
            userDetails: JSON.stringify(allUsers),
          });
        };
        await userDetails.classLink.forEach(async (c, index, array) => {
          let newUser = {};
          await db
            .doc(`${c}`)
            .get()
            .then(async (user) => {
              newUser.sem = user.data().sem;
              newUser.className = user.data().className;
              newUser.links = user.data().links;
              newUser.postDetails = user.data().postDetails;
              newUser.format = user.data().format;
              allUsers.push(newUser);
              count++;
            });
          if (count == array.length) {
            renderDashboard();
          }
        });
      }
    }
  }
  if (!(userFlag || teacherFlag || adminFlag)) {
    errors.push({ msg: "Incorrect Detail" });
    res.render("login/login", { errors });
  }
});
module.exports = router;
