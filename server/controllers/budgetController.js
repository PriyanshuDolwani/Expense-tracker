const Budget = require("../models/Budget");

const setBudget = async (req, res) => {
  try {
    const { amount, month, year } = req.body;

    let budget = await Budget.findOne({
      month,
      year,
      user:req.user
    });

    if (budget) {
      budget.amount = amount;
      await budget.save();
    } else {
      budget = await Budget.create({
        amount,
        month,
        year,
        user:req.user
      });
    }

    res.status(200).json({
      success: true,
      data: budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBudget = async (req, res) => {
  try {
    const month = Number(req.query.month);
    const year = Number(req.query.year);
    const budget = await Budget.findOne({
      month,
      year,
      user:req.user
    });

    res.status(200).json({
      success: true,
      data: budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  setBudget,
  getBudget,
};