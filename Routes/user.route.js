const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUserStats,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  changeRole,
} = require("../controllers/user.controller.js");
router.post("/register", register);
router.post("/login", login);
router.get("/stats", getUserStats);

router.get("/allusers", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

router.put("/:id/role", changeRole);

module.exports = router;
