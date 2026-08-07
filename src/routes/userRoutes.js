const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, deleteAccount, changePasswordHandler } = require("../controllers/Usercontroller");
const authMiddleware = require("../middlewares/authMiddleware"); // your existing middleware
router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);
router.delete("/", authMiddleware, deleteAccount);
router.put("/change-password",authMiddleware,changePasswordHandler)
module.exports = router;