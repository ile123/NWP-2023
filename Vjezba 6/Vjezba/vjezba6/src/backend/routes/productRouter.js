const express = require('express');
const Product = require('../models/ProductModel');

const myRouter = () => {
  const productRouter = express.Router();

  productRouter.get("/", (req, res) => {
    res.send("Welcome to my API");
  });

  productRouter.get("/products", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  productRouter
    .route("/products/id/:id")
    .get(async (req, res) => {
      try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product)
          return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    })
    .put(async (req, res) => {
      try {
        const productId = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          req.body,
          {
            new: true,
          }
        );
        if (!updatedProduct)
          return res.status(404).json({ message: "Product not found" });
        res.status(200).json(updatedProduct);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    })
    .delete(async (req, res) => {
      try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct)
          return res.status(404).json({ message: "Product not found" });
        res.status(200).json(deletedProduct);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });

  productRouter.get("/products/name/:name", async (req, res) => {
    try {
      const productName = req.params.name;
      const product = await Product.findOne({
        name: { $regex: new RegExp(productName, "i") },
      });
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  productRouter.get("/products/link/:link", async (req, res) => {
    try {
      const productLink = req.params.name;
      const product = await Product.findOne({
        link: { $regex: new RegExp(productLink, "i") },
      });
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  productRouter.post("/products", async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      return res.status(201).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  productRouter.post("/products/storeDummyData", async (req, res) => {
    try {
      const existingProducts = await Product.find();
      if (existingProducts.length > 0) {
        return res.status(500).json({ message: "Data already exists" });
      }
      const data = [
        {
          name: "T-shirt",
          link: "t-shirt",
          category: "Clothing",
          price: 15.99,
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.xtees.com%2Fuploads%2Fproducts%2Fimages%2Fprimary%2Fgrey-melange-plain-round-neck-t-shirt_1532191247.jpg&f=1&nofb=1&ipt=a10ab71eb7b6d272a8f1711b502365dca4143bb2f9d7bcd914b33e8df32bdd1c&ipo=images",
        },
        {
          name: "Backpack",
          link: "backpack",
          category: "Accessories",
          price: 29.99,
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bhphotovideo.com%2Fimages%2Fimages2500x2500%2Fsamsonite_126037_1221_classic_leather_backpack_cognac_1509326.jpg&f=1&nofb=1&ipt=273fd654309a26225cf5174e8badafb2bf9bb1a73ef80b720433500e31f9d5bf&ipo=images",
        },
        {
          name: "Coffee Mug",
          link: "coffee-mug",
          category: "Kitchenware",
          price: 9.99,
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-na.ssl-images-amazon.com%2Fimages%2FI%2F81M4SP-cXjL.jpg&f=1&nofb=1&ipt=a8b5b5e0c0f7274a9bb8570b64838c0e2a89eec3f608e4201a5ed18cc7a5d0a9&ipo=images",
        },
        {
          name: "Running Shoes",
          link: "running-shoes",
          category: "Footwear",
          price: 79.99,
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhips.hearstapps.com%2Fvader-prod.s3.amazonaws.com%2F1545163738-1544814212-765dfd69-66c6-4362-b548-815b9bbfe43e-1545163708.jpg%3Fcrop%3D1xw%3A1xh%3Bcenter%2Ctop&f=1&nofb=1&ipt=5d1a54ec4b7b915aee806f1acf487c99d5831aafeb8fc7bf1fc4d888800e6e5d&ipo=images",
        },
      ];
      await Product.insertMany(data);
      res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  productRouter.put("/products/changeMany", async (req, res) => {
    try {
      const { name } = req.body;
      const updatedProducts = await Product.updateMany(
        { name },
        { name: "Changed Value With Put Many" }
      );
      res.json(updatedProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  productRouter.delete("/products/deleteMany", async (req, res) => {
    try {
      await Product.deleteMany();
      res.status(200).json({ message: "All products deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  return productRouter;
};

module.exports = myRouter;