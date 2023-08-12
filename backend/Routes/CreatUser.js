const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');

const jwtSecret = "HaHa"
// var foodItems= require(
router.post(
  "/signup",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let securePass = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: securePass,
        email: req.body.email,
        location: req.body.location,
      }).then((user) => {
        success = true;
        res.json({ success });
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post('/loginuser', [
  body('email', "Enter a Valid Email").isEmail(),
  body('password', "Password cannot be blank").exists(),
], async (req, res) => {
  let success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body;
  try {
      let user = await User.findOne({ email });  //{email:email} === {email}
      if (!user) {
          return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
      }

      const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
      if (!pwdCompare) {
          return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
      }
      const data = {
          user: {
              id: user.id
          }
      }
       const authToken = jwt.sign(data, jwtSecret);
            success = true
            res.json({ success, authToken })

  } catch (error) {
      console.error(error.message)
      res.send("Server Error")
  }
})



module.exports = router;
