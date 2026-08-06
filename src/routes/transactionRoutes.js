const express = require("express")

const router = express.Router();
const   validateTransaction  = require("../validators/transactionValidator");
const  validate  = require("../middlewares/validateMiddleware");
const   authMiddleware  = require("../middlewares/authMiddleware")
const { addTransaction, getTransaction, deleteTransaction, updateTransaction, getSummary, getTransactionById, filterByType, searchTransactions } = require("../controllers/transactionController");

router.post("/", authMiddleware,validateTransaction,validate,addTransaction);
router.get("/", authMiddleware,getTransaction);
router.get("/summary", authMiddleware,getSummary)
router.get("/filter",authMiddleware, filterByType);
router.get("/search", authMiddleware, searchTransactions)
router.get("/:id",authMiddleware, getTransactionById)
router.delete("/:id",authMiddleware , deleteTransaction);
router.put("/:id",authMiddleware, validateTransaction,validate,updateTransaction);
module.exports = router; 