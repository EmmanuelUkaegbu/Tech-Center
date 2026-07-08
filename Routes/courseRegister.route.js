const express = require("express");
const router = express.Router();
const { protect } = require("../middlewire/auth.js");

const {
  registerCourse,

  getAllRegistrations,
  getRegistration,
  getRegistrationByStudent,
  deleteRegistration,
  getRegistrationStats,
  updateRegistration,
} = require("../controllers/courseRegister.controller.js");

// Student
router.post("/", protect, registerCourse);
router.get("/student/:id", getRegistrationByStudent);
// Admin
router.get("/get", getAllRegistrations);
router.get("/stats", getRegistrationStats);

// Shared
router.put("/:id", updateRegistration);
router.get("/:id", getRegistration);
router.delete("/:id", deleteRegistration);

module.exports = router;
