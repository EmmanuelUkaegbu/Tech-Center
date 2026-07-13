const RegisterCourse = require("../models/registercourse.model.js");
const Course = require("../models/course.model.js");
const User = require("../models/user.model.js");

const jwt = require("jsonwebtoken");

exports.registerCourse = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const studentId = decoded.userId;

    // Use studentId when creating the registration
    const registration = await RegisterCourse.create({
      student: studentId,
      course: req.body.course,
      level: req.body.level,
      batch: req.body.batch,
      learningMode: req.body.learningMode,
    });

    res.status(201).json({
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

exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await RegisterCourse.find()
      .populate("student", "firstName lastName email")
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
      .populate("student", "firstName lastName email")
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

exports.getRegistrationById = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const registrations = await RegisterCourse.find({
      student: decoded.userId,
    })
      .populate("student", "firstName lastName email gender")
      .populate("course");

    res.status(200).json({
      success: true,
      registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
