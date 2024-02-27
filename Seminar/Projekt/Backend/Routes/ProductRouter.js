const express = require("express");
const Product = require("../Models/ProductModel");
const Manufactuer = require("../Models/ManufactuerModel");
const Wishlist = require("../Models/WishlistModel");
const { verifyJwt } = require("../Routes/JWTHandler");

const myRouter = () => {
  const productRouter = express.Router();

  productRouter
    .route("/products")
    .get(verifyJwt, async (req, res) => {
      try {
        const response = await Product
          .find()
          .sort('manufactuer')
          .exec();
        res.status(200).json(response);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    })
    .post(verifyJwt, async (req, res) => {
      try {
        if (req.headers.role !== process.env.ADMIN)
          return res.status(401).json({ message: "Operation not allowed!" });
        const manufactuer = await Manufactuer.findById(req.body.manufactuer);
        if (!manufactuer)
          return res.status(404).send({ message: "Manufactuer not found" });
        const product = new Product(req.body);
        product.manufactuer = manufactuer;
        await product.save();
        res.status(210).send({ message: "Product created successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });

  productRouter
    .route("/products/:id")
    .get(verifyJwt, async (req, res) => {
      try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product)
          return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
      }
    })
    .put(verifyJwt, async (req, res) => {
      try {
        if (req.headers.role !== process.env.ADMIN)
          return res.status(401).json({ message: "Operation not allowed!" });
        const manufactuer = await Manufactuer.findById(
          req.body.manufactuer
        ).exec();
        const productToUpdate = await Product.findById(req.params.id).exec();
        productToUpdate.name = req.body.name;
        productToUpdate.price = req.body.price;
        productToUpdate.percentageOfAlcohol = req.body.percentageOfAlcohol;
        productToUpdate.color = req.body.color;
        productToUpdate.type = req.body.type;
        productToUpdate.shortDescription = req.body.shortDescription;
        productToUpdate.imageUrl = req.body.imageUrl;
        productToUpdate.manufactuer = manufactuer;
        await productToUpdate.save();
        res.status(200).json({ message: "Product updated successfully!" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    })
    .delete(verifyJwt, async (req, res) => {
      try {
        if (req.headers.role !== process.env.ADMIN)
          return res.status(401).json({ message: "Operation not allowed!" });
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product)
          return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
      }
    });
  
    productRouter
      .route("/products/type/:type")
      .get(verifyJwt, async (req, res) => {
        try {
          const response = await Product.find({ type: req.params.type });
          console.log(response);
          res.status(200).json(response);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Server error" });
        }
      });

  productRouter.route("/wishlist").post(verifyJwt, async (req, res) => {
    try {
      const existingWishlist = await Wishlist.findOne({
        user: req.body.user,
        product: req.body.product,
      }).exec();

      if (existingWishlist) {
        const deletedWishlist = await Wishlist.findByIdAndDelete(
          existingWishlist._id
        );

        if (!deletedWishlist)
          return res.status(404).json({ message: "Wishlist not found" });

        res.status(200).json({ message: "Wishlist removed successfully!" });
      } else {
        const wishlist = new Wishlist(req.body);
        await wishlist.save();
        res.status(200).json({ message: "Wishlist created successfully!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  productRouter
    .route("/wishlist/:id")
    .get(verifyJwt, async (req, res) => {
      try {
        const wishlists = await Wishlist.find({ user: req.params.id });
        res.status(200).json(wishlists);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    })
    .delete(verifyJwt, async (req, res) => {
      try {
        if (req.headers.role !== process.env.ADMIN)
          return res.status(401).json({ message: "Operation not allowed!" });
        const wishlist = await Wishlist.findByIdAndDelete(req.params.id);
        if (!wishlist)
          return res.status(400).json({ message: "Wishlist does not exist!" });
        res.status(200).json({ message: "Wishlist deleted!" });
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    });

    productRouter.route("/products/:manufactuer/:type")
    .get(verifyJwt, async(req, res) => {
      try {
        const response = await Product.find({
          manufacturer: req.params.manufacturer,
          type: req.params.type
        });
        res.status(200).json(response);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });

  return productRouter;
};

module.exports = myRouter;
