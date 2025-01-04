const express = require("express");
const app = express();
const cors = require("cors");

const uploadRoute = require("./routes/uploadRoute");
app.use(cors());
app.use(express.json());

app.use("/", uploadRoute);

app.listen(5000, () => {
  console.log("server running");
});
