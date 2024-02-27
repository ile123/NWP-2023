const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authenticationRouter = require("./Routes/AuthenticationRouter");
const manufactuerRouter = require("./Routes/ManufactuerRouter");
const productRouter = require("./Routes/ProductRouter");

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:5500/seminar")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", authenticationRouter());
app.use("/api", manufactuerRouter());
app.use("/api", productRouter());

app.listen(port, () => {
  console.log("Running on port: " + port);
});