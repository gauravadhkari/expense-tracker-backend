const { validationResult } = require("express-validator")

const validate = async (req,res,next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.status(400).json({
      success:false,
      errors:errors.array()
    })
  }
  next();
}
module.exports = validate