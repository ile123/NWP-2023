const mongoose = require("mongoose");

const wishlistModel = mongoose.Schema({
    user: { type: String, required: true },
    product: { type: String, required: true }
});

const Wishlist = mongoose.model("Wishlist", wishlistModel, "wishlists");

module.exports = Wishlist;