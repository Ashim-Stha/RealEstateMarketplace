const express = require("express");
const app = express();

const interactSmartContractRoute = require("./routes/smartContractRoute");
const uploadRoute = require("./routes/uploadRoute");
//app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", interactSmartContractRoute);
app.use("/", uploadRoute);

app.listen(3000, () => {
  console.log("server running");
});
