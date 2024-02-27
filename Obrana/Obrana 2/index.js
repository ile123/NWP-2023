const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Korisnik = require("./Models/Korisnik")

const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:5500/obrana")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("Running on port: " + port);
});

app.get("/", async (req, res) => {
  try {
    const korisnici = await Korisnik.find();
    res.status(200).json(korisnici);
  } catch(exception) {
    res.status(500).json({ message: exception})
  }
});

app.post("/", async(req, res) => {
  const korisnik = new Korisnik(req.body);
  await korisnik.save();
  res.status(201).json(korisnik);
});