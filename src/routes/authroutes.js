const express = require("express")

const router = express.Router();

const { signup,login } = require("../controllers/authController");
const   signupValidator  = require("../validators/authValidator");
const  validate  = require("../middlewares/validateMiddleware");

router.post("/signup",signupValidator,validate,signup)
router.post("/login", login)
module.exports = router;