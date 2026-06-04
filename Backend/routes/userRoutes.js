import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";
import {
  registerUser,
  createTeamMember,
  loginUser,
  logoutUser,
  getTeamList,
  getNotificationsList,
  updateUserProfile,
  markNotificationRead,
  changeUserPassword,
  activateUserProfile,
  deleteUserProfile,
  forgotPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);


router.post("/add-team", protectRoute, isAdminRoute, createTeamMember);
router.get("/get-team", protectRoute, isAdminRoute, getTeamList);
router.get("/notifications", protectRoute, getNotificationsList);

router.put("/profile", protectRoute, updateUserProfile);
router.put("/read-noti", protectRoute, markNotificationRead);
router.put("/change-password", protectRoute, changeUserPassword);


router
.route("/:id")
.put(protectRoute, isAdminRoute, activateUserProfile)
.delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;