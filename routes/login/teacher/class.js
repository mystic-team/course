const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = require("./../../../storage");
const admin = require("firebase-admin");
router.get("/", (req, res) => {
  res.render("login/teacher/class");
});
router.post("/", (req, res) => {
  const { email, className, postDetails } = req.body;
  let file;
  let uploadPost = multer({
    storage: storage,
  }).single("post");
  uploadPost(req, res, () => {
    file = req.file;
    console.log(file);
    const defaultStorage = admin.storage();
    const bucket = defaultStorage.bucket();
    bucket.upload(`./uploads/${file.filename}`).then(() => {
      console.log("Got it");
    });
  });
});
module.exports = router;
