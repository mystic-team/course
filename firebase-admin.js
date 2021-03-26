const admin = require("firebase-admin");
const serviceKey = require("./sk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceKey),
});
const db = admin.firestore();
const storage = admin.storage();
module.exports = { db, storage };
