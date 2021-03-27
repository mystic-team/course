const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = require("./../../../storage");
const admin = require("firebase-admin");
const db = admin.firestore();
router.get("/", (req, res) => {
  res.render("login/teacher/class");
});
router.post("/", (req, res) => {
  let file;
  let errors = [];
  let uploadPost = multer({
    storage: storage,
  }).single("post");
  uploadPost(req, res, () => {
    const { email, className, postDetail } = req.body;
    file = req.file;
    console.log(file);
    const defaultStorage = admin.storage();
    const bucket = defaultStorage.bucket();
    bucket.upload(`./uploads/${file.filename}`).then(async () => {
      let links = [];
      let postDetails = [];
      console.log("Got it");
      await db
        .collection(`teacher`)
        .doc(`${email}`)
        .collection("class")
        .doc(`${className}`)
        .get()
        .then((user) => {
          if (user.data().links) {
            links = user.data().links;
            let fileName = file.filename;
            fileName = fileName.replace(/ /g, "%20");
            links.push(
              `https://firebasestorage.googleapis.com/v0/b/reference-101.appspot.com/o/${fileName}?alt=media`
            );
            postDetails = user.data().postDetails;
            postDetails.push(postDetail);
          }
        });
      if (links.length == 0) {
        let fileName = file.filename;
        fileName = fileName.replace(/ /g, "%20");
        links.push(
          `https://firebasestorage.googleapis.com/v0/b/reference-101.appspot.com/o/${fileName}?alt=media`
        );
        postDetails.push(postDetail);
      }
      db.doc(`teacher/${email}/class/${className}`).update({
        links: links,
        postDetails: postDetails,
      });
      errors.push({ msg: "Post uploaded successfully" });
      res.render("login/teacher/class", { errors });
    });
  });
});
module.exports = router;
