const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const transactionRoutes=require("./routes/transactionRoutes")
const budgetRoutes = require("./routes/budgetRoutes");
const authRoutes = require("./routes/authRoutes");
const app=express();


const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
// Safe preflight handler — respond to OPTIONS without using a route pattern
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", corsOptions.origin);
    res.header("Access-Control-Allow-Methods", corsOptions.methods.join(","));
    res.header("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(","));
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});

app.use("/api/transactions", transactionRoutes);

app.use("/api/budgets", budgetRoutes);

app.use("/api/auth", authRoutes);
// Error handler to log unexpected server errors
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Server error' : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});
module.exports=app;