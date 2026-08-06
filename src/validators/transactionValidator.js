const { body } = require("express-validator")

const validateTransaction = [
  body("title").notEmpty().withMessage("Title is required").isLength({min : 3}).withMessage("Title must be atleast 3 Characters!"),
   body("amount").notEmpty().withMessage("Amount is required").isNumeric().withMessage("Amount must be a number!"),
   body("type").isIn(["income","expense"]).withMessage("Type must be a income or expense!"),
   body("category").notEmpty().withMessage("Category is required!"),
   body("date").optional().isISO8601().withMessage("Invalid Date Format!"), 
];

module.exports = validateTransaction