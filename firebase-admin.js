const admin = require("firebase-admin");
const serviceKey = require("./sk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceKey),
});
module.exports = admin;
