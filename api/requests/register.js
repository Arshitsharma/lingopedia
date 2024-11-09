// const bcrypt = require("bcryptjs");
// const User = require("../models/user");

// const bcryptsalt = bcrypt.genSaltSync(10); //to ensure it takes time for the attacker to  decrypt the password

// const RegisterRequest = async (req, res) => {
//   const { name, email, password } = req.body;
//   //sending to the database by creating the user
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400);
//     }
//     const userdoc = await User.create({
//       name,
//       email,
//       password: bcrypt.hashSync(password, bcryptsalt),
//     });
//     res.json(userdoc);
//   } catch (error) {
//     res.status(422).json(error);
//   }
// };

// module.exports = RegisterRequest;

const bcrypt = require("bcryptjs");
const User = require("../models/user");

const bcryptsalt = bcrypt.genSaltSync(10); // to ensure it takes time for the attacker to decrypt the password

const RegisterRequest = async (req, res) => {
  const { name, email, password ,userType} = req.body;
  // sending to the database by creating the user
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." }); // Return custom message for existing email
    }
    const userdoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptsalt),
      userType
    });
    res.json(userdoc);
  } catch (error) {
    res.status(422).json(error);
  }
};

module.exports = RegisterRequest;
