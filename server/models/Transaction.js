const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Travel",
        "Education",
        "Bills",
        "Entertainment",
        "Job",
        "Income"
      ],
    },

    type: {
      type: String,
      required: true,
      enum: ["Income", "Expense"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model(
  "Transaction",
  transactionSchema
);

module.exports = Transaction;