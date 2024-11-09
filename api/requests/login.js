const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWTSECRET;

const LoginRequest = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);

  try {
    const userdoc = await User.findOne({ email });
    
    if (!userdoc) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const passOk = bcrypt.compareSync(password, userdoc.password);
    
    if (passOk) {
      jwt.sign(
        { email: userdoc.email, id: userdoc._id, name: userdoc.name },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userdoc);
        }
        );
      } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = LoginRequest;
