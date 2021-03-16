const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const GoalSchema = new Schema({
  goal: {
    type: String,
    required: true
  },
  isComplete: {
    type: Boolean,
    required: true
  },
  isEdit: {
    type: Boolean,
    required: false
  },
  createTime: {
    type: Date,
    required: false
  },
  completeTime: {
    type: Date,
    default: Date.now
  },
  week: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  }
});

module.exports = Goal = mongoose.model("goals", GoalSchema);