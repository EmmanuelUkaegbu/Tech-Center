const express = require("express");
const router = express.Router();

const {
  registerCourse,

  getAllRegistrations,
  getRegistration,
  getRegistrationById,
  deleteRegistration,
  getRegistrationStats,
  updateRegistration,
} = require("../controllers/courseRegister.controller.js");

// Student
router.post("/", registerCourse);

router.get("/my-courses", getRegistrationById);
// Admin
router.get("/get", getAllRegistrations);
router.get("/stats", getRegistrationStats);

// Shared
router.put("/:id", updateRegistration);
router.get("/:id", getRegistration);
router.delete("/:id", deleteRegistration);

module.exports = router;
