const express = require("express");
const router = express.Router();

const storage = require("./../storage");
const multer = require("multer");

router.post("/", (req, res) => {
  let uploadTCsv = multer({
    storage: storage,
  }).single("tFile");
  uploadTCsv(req, res, async (err) => {
    const file = req.file;
    //   fileName = file.filename;
    console.log(file);
  });
});
module.exports = router;
