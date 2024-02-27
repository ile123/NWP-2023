const { signJwt } = require("./JWTHandler");
const express = require("express");
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");

const myRouter = () => {
  const authenticationRouter = express.Router();

  authenticationRouter.route("/login").post(async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email }).exec();
      if (!user) {
        return res.status(400).send("ERROR: User with given email does not exist!");
      }
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!passwordMatch) {
        return res.status(400).send("Wrong password");
      }
      const token = signJwt(user._id);
      return res.status(200).json({ token: token, user: user.email, role: user.role });
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  });
  

  authenticationRouter.route("/register").post(async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email }).exec();
      if (existingUser !== null)
        return res
          .status(400)
          .send("ERROR: User with given email already exists!");
      const newUser = new User({
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, 10),
        email: req.body.email,
        role: req.body.role
      });
      newUser.save();
      return res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  });

  return authenticationRouter;
};

module.exports = myRouter;
