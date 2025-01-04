const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { uploadFile } = require("../controllers/uploadController");

router.post("/upload", upload.fields([{ name: "front" }]), uploadFile);

module.exports = router;
