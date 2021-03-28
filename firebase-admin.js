const admin = require("firebase-admin");
const serviceKey = JSON.parse(process.env.sk);
const dotenv = require("dotenv").config();
admin.initializeApp({
  storageBucket: process.env.bucket,
  credential: admin.credential.cert(serviceKey),
});
module.exports = admin;
