const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDirPath = path.resolve(__dirname, "..", "./uploads");
    if (!fs.existsSync(uploadDirPath)) {
      fs.mkdirSync(uploadDirPath, { recursive: true });
    }

    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(
      null,
      `${file.fieldname}-${Date.now()}-${file.originalname.replace(
        "png",
        "jpg"
      )}`
    );
  },
});

//const upload = multer({ dest: "uploads/" });
const upload = multer({ storage });

module.exports = upload;
