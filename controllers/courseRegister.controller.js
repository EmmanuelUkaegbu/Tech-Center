const RegisterCourse = require("../models/registercourse.model.js");
const Course = require("../models/course.model.js");
const User = require("../models/user.model.js");

exports.registerCourse = async (req, res) => {
  try {
    const student = req.user._id;
    const { course, learningMode, batch, startDate, level, goal } = req.body;
    const existingCourse = await Course.findOne({ title: course });

    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const alreadyRegistered = await RegisterCourse.findOne({
      student,
      course: existingCourse._id,
    });

    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: "You have already registered for this course",
      });
    }

    const registration = await RegisterCourse.create({
      student,
      course: existingCourse._id,
      learningMode,
      batch,
      startDate,
      level,
      goal,
    });

    res.status(201).json({
      success: true,
      message: "Course registered successfully",
      registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await RegisterCourse.find()
      .populate("student", "name email")
      .populate("course");

    res.status(200).json({
      success: true,
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRegistration = async (req, res) => {
  try {
    const registration = await RegisterCourse.findById(req.params.id)
      .populate("student", "name email")
      .populate("course");

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    res.status(200).json({
      success: true,
      registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    const registration = await RegisterCourse.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    await registration.deleteOne();

    res.status(200).json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRegistrationStats = async (req, res) => {
  try {
    const totalRegistrations = await RegisterCourse.countDocuments();

    const completed = await RegisterCourse.countDocuments({
      status: "Completed",
    });

    const inProgress = await RegisterCourse.countDocuments({
      status: "In Progress",
    });

    const registered = await RegisterCourse.countDocuments({
      status: "Registered",
    });

    res.status(200).json({
      success: true,
      stats: {
        totalRegistrations,
        completed,
        inProgress,
        registered,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateRegistration = async (req, res) => {
  try {
    const registration = await RegisterCourse.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    if (req.body.course) {
      const course = await Course.findOne({ title: req.body.course });

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      req.body.course = course._id;
    }

    const updatedRegistration = await RegisterCourse.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )
      .populate("course")
      .populate("student", "name email");

    res.status(200).json({
      success: true,
      message: "Registration updated successfully",
      updatedRegistration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
