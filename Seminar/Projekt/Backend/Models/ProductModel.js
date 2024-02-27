const mongoose = require("mongoose");

const productModel = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    percentageOfAlcohol: { type: Number, required: true },
    color: { type: String, required: true },
    type: { type: String, required: true },
    shortDescription: { type: String, required: true},
    imageUrl: { type: String, required: true },
    manufactuer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manufactuer',
    }
});

const Product = mongoose.model("Product", productModel, "products");

module.exports = Product;