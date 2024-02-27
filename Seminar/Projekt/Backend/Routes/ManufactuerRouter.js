const express = require("express");
const mongoose = require('mongoose');
const Manufactuer = require("../Models/ManufactuerModel");
const Product = require("../Models/ProductModel");
const { verifyJwt } = require("../Routes/JWTHandler");

const myRouter = () => {
    const manufactuerRouter = express.Router();

    manufactuerRouter
        .route("/manufactuers")
        .get(verifyJwt, async(req, res) => {
            try {
                const response = await Manufactuer.find();
                res.status(200).json(response);
            } catch(error) {
                console.error(error);
                res.status(500).json({ message: "Server error" });
            }
        })
        .post(verifyJwt, async(req, res) => {
            try {
                if(req.headers.role !== process.env.ADMIN) return res.status(401).json({ message: "Operation not allowed!" });
                const manufactuer = new Manufactuer(req.body);
                await manufactuer.save();
                res.status(210).json({ message: "Manufactuer created successfully" });
            } catch(error) {
                console.log(error);
                res.status(500).json({ message: "Server error" });
            }
        }
    );

    manufactuerRouter
    .route("/manufactuers/:id")
    .get(verifyJwt, async(req, res) => {
        try {
            const manufactuer = await Manufactuer.findById(req.params.id);
            if(!manufactuer) return res.status(404).json({ message: "Manufactuer not found" });
            res.status(200).json(manufactuer);
        } catch(error) {
            console.log(error);
            res.status(500).json({ message: "Server error" });
        }
    })
    .put(verifyJwt, async(req, res) => {
        try {
            if(req.headers.role !== process.env.ADMIN) return res.status(401).json({ message: "Operation not allowed!" });
            const manufactuer = await Manufactuer.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                  new: true,
                }
            );
            if(!manufactuer) return res.status(404).json({ message: "Manufactuer not found" });
            res.status(200).json({ message: "Manufactuer changed successfully" });
        } catch(error) {
            console.log(error);
            res.status(500).json({ message: "Server error" });
        }
    })
    .delete(verifyJwt, async(req, res) => {
        try {
            if(req.headers.role !== process.env.ADMIN) return res.status(401).json({ message: "Operation not allowed!" });
            const products = await Product.find({ manufactuer: req.params.id });
            if (products.length > 0) {
                res.status(400).json({ message: "There are products with this manufacturer" });
            } else {
                const manufactuer = await Manufactuer.findByIdAndDelete(req.params.id);
                if (!manufactuer) return res.status(404).json({ message: "Manufacturer not found" });
                return res.status(200).json({ message: "Manufacturer deleted successfully" });
            }
        } catch(error) {
            console.log(error);
            res.status(500).json({ message: "Server error" });
        }
    });

    return manufactuerRouter;
};

module.exports = myRouter;