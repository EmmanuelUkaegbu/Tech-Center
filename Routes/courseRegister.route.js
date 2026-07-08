const express = require("express");
const router = express.Router();
const { protect } = require("../middlewire/auth.js");
const verifyToken = require("../middlewire/verifyToken.js");
const {
  registerCourse,

  getAllRegistrations,
  getRegistration,
  getMyRegistrations,
  deleteRegistration,
  getRegistrationStats,
  updateRegistration,
} = require("../controllers/courseRegister.controller.js");

// Student
router.post("/", protect, registerCourse);
router.get("/my", verifyToken, getMyRegistrations);
// Admin
router.get("/get", getAllRegistrations);
router.get("/stats", getRegistrationStats);

// Shared
router.put("/:id", updateRegistration);
router.get("/:id", getRegistration);
router.delete("/:id", deleteRegistration);

module.exports = router;
