const express = require("express")
const cors = require("cors")
const morgan  = require("morgan")
const app = express()

app.use(cors({
  origin : ["http://localhost:5173",
  "https://expense-tracker-frontend-nine-theta.vercel.app"
  ],
  credentials:true
})
);
app.use(morgan("dev"));
app.use(express.json());
const userRoutes = require("./routes/userRoutes"); // new
const authRoutes = require("./routes/authroutes");
const transactionRoutes = require("./routes/transactionRoutes");
const errorHandler = require("./middlewares/errorHandler");
app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionRoutes)
app.use("/user", userRoutes); // <-- new
app.use(errorHandler)
app.get('/' , (req,res) => {
  res.status(200).json({
    success : true,
    message : "Expense Tracker API is running..."
  });
});

module.exports = app;