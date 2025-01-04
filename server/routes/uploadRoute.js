const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { uploadFile } = require("../controllers/uploadController");

router.post(
  "/upload",
  upload.fields([{ name: "front" }, { name: "back" }, { name: "back1" }]),
  uploadFile
);

module.exports = router;
