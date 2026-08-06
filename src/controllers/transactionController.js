const Transaction = require("../models/Transaction");
const mongoose = require("mongoose")
const asyncHandler = require("../utils/asyncHandler")
const addTransaction = asyncHandler(async (req,res) => {
  const {title , amount , type , category} = req.body;

  if(!title || !amount || !type || !category){
    return res.status(404);
    throw new Error("All fields are required !")
  }

  const transaction = await Transaction.create({
    title,
    amount,
    type,
    category,
    user : req.user.id
  })
   res.status(201).json({
    success : true,
    message : "Transaction added Successfully !",
    transaction
   })
});

const getTransaction = asyncHandler(async (req,res) => {
    const { page , limit, sort, category,type , search } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    let sortOption = {}
    if(sort === "latest"){
      sortOption = { createdAt : -1};
    }
    else if(sort === "oldest"){
      sortOption = {createdAt : 1};
    }
    else if(sort === "highest"){
      sortOption = { amount : -1 };
    }
    else if(sort === "lowest"){
      sortOptin = { amount : 1};
    }
    //////////////////////////////////////
    const query = {
      user : req.user.id
    }
    if(category){
      query.category = category
    }
    if(type){
      query.type = type
    }
    if(search){
      query.title = {
        $regex : search,
        $option : "i"
      };
    }
   
    ///////////////////////////////////////////
    const transactions = await Transaction.find(query).sort(sortOption).skip(skip).limit(limitNumber);
    //////////////////////////////
    res.status(200).json({
      success : true,
      count : transactions.length,
      transactions
    })
});

const deleteTransaction = asyncHandler(async (req,res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      res.status(400);
      throw new Error("Invalid Transaction ID");
    }
    const { id } = req.params;
    const transaction = await Transaction.findOne({
      _id : id,
      user : req.user.id
    })
    if(!transaction){
      return res.status(401);
      throw new Error("Transaction Not Found!")
    }
    await transaction.deleteOne();
    res.status(201).json({
      success : true,
      message : "Transaction deleted successfully!"
    })
});
const updateTransaction = asyncHandler(async (req,res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      res.status(400);
      throw new Error("Invalid Transaction ID");
    }
    const { id } = req.params;
    const {title , amount , type , category } = req.body;
    const transaction = await Transaction.findOne({
      _id : id,
      user : req.user.id
    })
    if(!transaction){
      return res.status(401);
      throw new Error("Transaction Not Found!")
    }
    transaction.title = title || transaction.title;
    transaction.amount = amount || transaction.amount;
    transaction.type = type || transaction.type;
    transaction.category = category || transaction.category;
    await transaction.save();
    res.status(201).json({
      success : true,
      message : "Transaction Updated successfully!",
      transaction
    })
});

const getSummary = asyncHandler(async (req,res) => {
    const transactions = await Transaction.find({
      user : req.user.id
    });

    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((transaction) => {
      if(transaction.type === "income"){
        totalIncome += transaction.amount;
      }else {
        totalExpense += transaction.amount;
      }
    });
    const balance = totalIncome - totalExpense;
    res.status(200).json({
      success : true,
      summary : {
        totalIncome,
        totalExpense,
        balance
      }
    });
});
const getTransactionById = asyncHandler(async(req,res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      res.status(400);
      throw new Error("Invalid Transaction ID");
    }
  const { id } = req.params
  const transaction = await Transaction.findOne({
    _id : id,
    user : req.user.id
  })

  if(!transaction) {
     res.status(404);
     throw new Error("Transaction not Found !");
  }
  res.status(200).json({
    success:true,
    message:"Transaction found successfully!",
    transaction
  })
});

const filterByType = asyncHandler(async (req,res) => {
    const { type } = req.query;
    const transactions = await Transaction.find({
      user:req.user.id,
      type
    })
    if(transactions.length === 0){
      res.status(404);
      throw new Error("Not Found Any Transaction!")
    }
    res.status(200).json({
      success:true,
      count : transactions.length,
      transactions
    })
});

const searchTransactions = asyncHandler(async (req,res) => {
    const { search } = req.query;
    const transactions = await Transaction.find({
     title : { $regex: search , $options: 'i' },
     user : req.user.id
    });
    if(transactions.length === 0){
      return res.status(404);
      throw new Error("Not Found Any Transaction!")
    }
    res.status(200).json({
      success : true,
      count : transactions.length,
      transactions
    })
});
module.exports = {
  addTransaction,
  getTransaction,
  deleteTransaction,
  updateTransaction,
  getSummary,
  getTransactionById,
  filterByType,
  searchTransactions
};