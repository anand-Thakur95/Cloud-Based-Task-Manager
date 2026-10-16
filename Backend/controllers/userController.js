import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Notice from "../model/notification.js";
import {
  getMissingRequiredFields,
  validationErrorResponse,
  formatMongooseValidationError,
} from "../utils/validateFields.js";

const REGISTER_REQUIRED_FIELDS = ["name", "email", "password"];

const createUserAccount = async (req, res, successMessage) => {
  const { name, email, password, isAdmin } = req.body;
  const role = req.body.role || "Member";
  const title = req.body.title || "Team Member";

  const missingFields = getMissingRequiredFields(
    { name, email, password },
    REGISTER_REQUIRED_FIELDS
  );

  if (missingFields.length > 0) {
    return res.status(400).json(validationErrorResponse(missingFields));
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({
      status: false,
      message: "User already exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    title,
    isAdmin: Boolean(isAdmin),
  });

  user.password = undefined;

  return res.status(201).json({
    status: true,
    message: successMessage,
    user,
  });
};

const handleCreateUserError = (error, res) => {
  console.error("Create User Error:", error);

  if (error.name === "ValidationError") {
    return res.status(400).json(formatMongooseValidationError(error));
  }

  if (error.code === 11000) {
    return res.status(400).json({
      status: false,
      message: "Email is required and must be unique",
      missingFields: ["email"],
    });
  }

  return res.status(500).json({
    status: false,
    message: "Server error",
  });
};

// Public register (does not change admin session cookie)
export const registerUser = async (req, res) => {
  try {
    // Guard: if someone tries to register as admin but one already exists, reject it
    if (
      req.body.isAdmin === true ||
      req.body.isAdmin === "true" ||
      req.body.role === "Admin" ||
      req.body.role?.toLowerCase() === "admin"
    ) {
      const existingAdmin = await User.findOne({
        $or: [{ isAdmin: true }, { role: "Admin" }, { role: "admin" }],
      });
      if (existingAdmin) {
        return res.status(400).json({
          status: false,
          message: "An admin already exists. You can only register as a User.",
        });
      }
    }
    return await createUserAccount(req, res, "User registered successfully");
  } catch (error) {
    return handleCreateUserError(error, res);
  }
};

// Public: check if an admin exists and return their name (used on register page)
export const getAdminInfo = async (req, res) => {
  try {
    const admin = await User.findOne({
      $or: [{ isAdmin: true }, { role: "Admin" }, { role: "admin" }],
    }).select("name");
    if (admin) {
      return res.status(200).json({ status: true, hasAdmin: true, adminName: admin.name });
    }
    return res.status(200).json({ status: true, hasAdmin: false, adminName: null });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Public: promote a user to admin by email — only works when NO admin exists yet
export const makeAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: false, message: "Email and password are required" });
    }

    // Only allowed if no admin exists yet
    const existingAdmin = await User.findOne({ isAdmin: true });
    if (existingAdmin) {
      return res.status(400).json({ status: false, message: "An admin already exists." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found with this email." });
    }

    // Verify password before promoting
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: false, message: "Incorrect password." });
    }

    user.isAdmin = true;
    user.title = user.title || "Administrator";
    user.role = user.role || "Admin";
    await user.save();

    return res.status(200).json({
      status: true,
      message: `${user.name} has been promoted to Admin successfully. Please log in again.`,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Admin adds team member — keeps current user logged in (no auth cookie set)
export const createTeamMember = async (req, res) => {
  try {
    return await createUserAccount(req, res, "User added successfully");
  } catch (error) {
    return handleCreateUserError(error, res);
  }
};


// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); 
    console.log("RECEIVED:", JSON.stringify({ email, password }));

    if (!user) {
      return res.status(401).json({ status: false, message: "Invalid email or password" });
    }

    if(!user?.isActive) {
      return res.status(401).json({
        status: false,
        message: "User account has been deactivated, contact the administator"
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ status: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET?.trim(),
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    const isUserAdmin = Boolean(
      user.isAdmin ||
      user.role === "Admin" ||
      user.role?.toLowerCase() === "admin"
    );

    if (isUserAdmin && !user.isAdmin) {
      user.isAdmin = true;
      await user.save();
    }

    user.password = undefined;

    return res.status(200).json({
      status: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: isUserAdmin,
        role: user.role,
        title: user.title,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Logout User
export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({ status: true, message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Get Team List
export const getTeamList = async (req, res) => {
  try {
    const users = await User.find().select("name title role email isActive");

    return res.status(200).json({ status: true, users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Get Notifications List
export const getNotificationsList = async (req, res) => {
  try {
    const { userId } = req.user;

    const notifications = await Notice.find({
      team: { $in: [userId] },
    })
      .populate("task", "title")
      .sort({ _id: -1 });

    return res.status(200).json({ status: true, notifications });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { _id } = req.body;

    const id =
      isAdmin && _id && String(userId) !== String(_id) ? _id : userId;

    const user = await User.findById(id);

    if (user) {
      user.name  = req.body.name  || user.name;
      user.title = req.body.title || user.title;
      user.role  = req.body.role  || user.role;
      if (req.body.email) user.email = req.body.email;

      const updatedUser = await user.save();
      updatedUser.password = undefined;

      res.status(201).json({
        status: true,
        message: "Profile Updated Successfully",
        user: {
          _id:     updatedUser._id,
          name:    updatedUser.name,
          email:   updatedUser.email,
          title:   updatedUser.title,
          role:    updatedUser.role,
          isAdmin: updatedUser.isAdmin,   // always include so Redux stays in sync
          isActive:updatedUser.isActive,
        },
      });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Mark Notification as Read
export const markNotificationRead = async (req, res) => {
  try {
   const { userId } = req.user;

   const {isReadType, id} = req.query

   if(isReadType=== "all") {
    await Notice.updateMany(
      { team: { $in: [userId] }, isRead: { $nin: [userId] } },
      { $push: { isRead: userId } }
    );
   }
   else {
    await Notice.findOneAndUpdate(
      { _id: id, isRead: { $nin: [userId] } },
      { $push: { isRead: userId } },
      { new: true }
    );
   }
    return res.status(200).json({ status: true, message: "Notification marked as read" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Change User Password
export const changeUserPassword = async (req, res) => {
  try {
    const { userId } = req.user;
   

    const user = await User.findById(userId);

    if (user) {
     user.password = req.body.password;

     await user.save();
    }


    return res.status(200).json({ status: true, message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Activate User Profile
export const activateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
  const user = await User.findById(id);

  if(user){
 user.isActive = req.body.isActive;

 await user.save();


 res.status(201).json({
  status: true,
  message: `User account has been ${
  user?.isActive ? "activated" : "disabled"
  }`,
 })

  }
  else {
    res.status(404).json({status: false, message: "User not found"})
  }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Reset password by email (public, used by forgot-password page)
export const forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const missingFields = getMissingRequiredFields(
      { email, password },
      ["email", "password"]
    );

    if (missingFields.length > 0) {
      return res.status(400).json(validationErrorResponse(missingFields));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "No account found with this email",
      });
    }

    user.password = password;
    await user.save();

    return res.status(200).json({
      status: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Delete User Profile
export const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

   await User.findByIdAndDelete(id);

    res.status(200).json({ status: true, message: "User deleted successfully" });
   
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
