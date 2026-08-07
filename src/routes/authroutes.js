const express = require("express")

const router = express.Router();

const { signup,login } = require("../controllers/authController");
const   signupValidator  = require("../validators/authValidator");
const  validate  = require("../middlewares/validateMiddleware");
const authMiddleware = require("../middlewares/authMiddleware"); 
router.post("/signup",signupValidator,validate,signup)
router.post("/login", login)
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;