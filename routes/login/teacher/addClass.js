const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = require("./../../../storage");
const papaparse = require("papaparse");
const fs = require("fs");
const admin = require("firebase-admin");
const { error } = require("console");
const db = admin.firestore();

router.post("/", (req, res) => {
  let sheets;
  let uploadCsv = multer({
    storage: storage,
  }).single("class");
  uploadCsv(req, res, async (err) => {
    const { email, className, sem } = req.body;
    const file = req.file;
    const fileName = file.filename;
    let errors = [];
    let emails = [];
    let flag = false;
    const csv = fs.readFileSync(`./uploads/${fileName}`, "utf-8");
    papaparse.parse(csv, {
      complete: (sheet) => {
        sheets = sheet.data;
      },
    });
    sheets.shift();
    sheets.pop();
    sheets.forEach((c) => {
      emails.push(c[0]);
    });
    await db
      .doc(`teacher/${email}/class/${className}`)
      .update({
        sem: parseInt(sem),
        className: className,
        students: emails,
      })
      .then(() => {
        errors.push({ msg: "Class created successfully" });
        res.render("login/teacher/dashboard", {
          errors,
          userStatus: "teacher",
        });
        fs.unlinkSync(`./uploads/${file.filename}`);
      })
      .catch(() => {
        errors.push({ msg: "Something went wrong" });
        res.render("login/teacher/dashboard", {
          errors,
          userStatus: "teacher",
        });
      });
    emails.forEach(async (c) => {
      let classLink = [];
      let studentEmail = c;
      await db
        .collection("user")
        .get()
        .then((user) => {
          user.docs.forEach((c) => {
            if (c.id == studentEmail) {
              if (c.data().classLink) {
                classLink = c.data().classLink;
                classLink.push(`teacher/${email}/class/${className}`);
              } else {
                classLink.push(`teacher/${email}/class/${className}`);
              }
              flag = true;
            }
          });
        });
      if (flag) {
        console.log(classLink);
        db.doc(`user/${studentEmail}`).update({
          classLink: classLink,
        });
      } else {
        classLink.push(`teacher/${email}/class/${className}`);
        db.doc(`user/${studentEmail}`).update({
          classLink: classLink,
        });
      }
    });
  });
});
module.exports = router;
