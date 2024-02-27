const mongoose = require("mongoose");

const manufactuerModal = new mongoose.Schema({
    name: { type: String, unique: true, dropDups: true, required: true },
    yearOfEstablishment: { type: String, required: true},
    country: { type: String, required: true },
    shortDescription: { type: String, required: true},
    imageUrl: { type: String, required: true }
});

const Manufactuer = mongoose.model("Manufactuer", manufactuerModal, "manufactuers");

module.exports = Manufactuer;