const { body } = require("express-validator");

const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Enter a valid email!"),
  body("password").isLength({min : 6}).withMessage("Password must be at least 6 Characters!")
];
module.exports = signupValidator 