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
    const { email, className } = req.body;
    const file = req.file;
    const fileName = file.filename;
    let errors = [];
    let emails = [];
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
      .set({
        className: className,
        students: emails,
      })
      .then(() => {
        errors.push({ msg: "Class created successfully" });
        res.render("login/teacher/dashboard", { errors });
      })
      .catch(() => {
        errors.push({ msg: "Something went wrong" });
        res.render("login/teacher/dashboard", { errors });
      });
  });
});
module.exports = router;
