const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    status: {
      type: String,
      enum: ["Registered", "In Progress", "Completed"],
      default: "Registered",
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    registrationDate: {
      type: Date,
      default: Date.now,
    },
    learningMode: {
      type: String,
      enum: ["Online", "Physical", "Hybrid"],
      default: "",
    },
    batch: {
      type: String,
      enum: ["Morning", "Afternoon", "Evening", "Weekend"],
      default: "",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    goal: { type: String, default: "" },

    completionDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent a student from registering for the same course twice
registrationSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Registration", registrationSchema);
