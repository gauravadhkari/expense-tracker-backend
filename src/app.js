const express = require("express")
const cors = require("cors")
const morgan  = require("morgan")
const app = express()

app.use(cors({
  origin : "http://localhost:5173",
  credentials:true
})
);
app.use(morgan("dev"));
app.use(express.json());
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const errorHandler = require("./middlewares/errorHandler");
app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionRoutes)
app.use(errorHandler)
app.get('/' , (req,res) => {
  res.status(200).json({
    success : true,
    message : "Expense Tracker API is running..."
  });
});

module.exports = app;