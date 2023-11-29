const { Router } = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = require("../../models/user/userModel");
const { varifyToken } = require("../../middlewares/varifyToken");

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const data = req.body;
  if (!data?.email || !data?.password) {
    return res.status(404).send({ message: "please provide all fields !" });
  }
  const isExists = await User.findOne({ email: data?.email });
  if (isExists) {
    return res.status(404).send({ message: "email already exists !" });
  }
  // password hash using bycrypt
  const hashPassword = await bcrypt.hash(data?.password, 10);
  data.password = hashPassword;
  try {
    const newUser = new User(data);
    const result = await newUser.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

authRouter.post("/login", async (req, res) => {
  const data = req.body;
  if (!data?.email || !data?.password) {
    return res.send({ message: "please provide all fields !" });
  }
  const user = await User.findOne({ email: data?.email });
  if (!user) {
    return res.status(404).send({ message: "wrong email address !" });
  }
  // match password
  const isValidPassword = await bcrypt.compare(data.password, user.password);
  if (!isValidPassword) {
    return res.status(404).send({ message: "wrong password !" });
  }
  // generate token
  const access = jwt.sign(
    { _id: user._id, email: user.email, is_owner: user.is_owner },
    process.env.SECRET,
    { expiresIn: "72h" }
  );
  res.send({ access });
});

authRouter.get("/users/me", varifyToken, async (req, res) => {
  const _id = req.user._id;
  try {
    const result = await User.findById(_id).select(["-password"]);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

module.exports = authRouter;
