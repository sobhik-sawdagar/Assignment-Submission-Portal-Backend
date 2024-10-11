const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({ //This is the schema that is used to create the data structure of the assignment.
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  task: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  remarks : {
    type : String,
    default : "No remarks",
  },
});

const Assignment = mongoose.model('Assignment', assignmentSchema); 

module.exports = Assignment;
