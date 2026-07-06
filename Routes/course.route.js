const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller.js");
router.post("/", createCourse);
router.get("/allcourses", getAllCourses);
router.get("/:id", getSingleCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
module.exports = router;
