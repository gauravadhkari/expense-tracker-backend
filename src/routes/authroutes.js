const express = require("express")

const router = express.Router();

const { signup,login, changePasswordHandler } = require("../controllers/authController");
const   signupValidator  = require("../validators/authValidator");
const  validate  = require("../middlewares/validateMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup",signupValidator,validate,signup)
router.post("/login", login)
router.post("/change-password",authMiddleware,changePasswordHandler)

module.exports = router;