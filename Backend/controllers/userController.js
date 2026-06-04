import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Notice from "../model/notification.js";
import {
  getMissingRequiredFields,
  validationErrorResponse,
  formatMongooseValidationError,
} from "../utils/validateFields.js";

const REGISTER_REQUIRED_FIELDS = ["name", "email", "password", "role", "title"];

const createUserAccount = async (req, res, successMessage) => {
  const { name, email, password, role, title, isAdmin } = req.body;

  const missingFields = getMissingRequiredFields(
    { name, email, password, role, title },
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
    return await createUserAccount(req, res, "User registered successfully");
  } catch (error) {
    return handleCreateUserError(error, res);
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

    user.password = undefined;

    return res.status(200).json({
      status: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
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

   const user = await User.findById(id)

   if(user) {
     
    user.name = req.body.name || user.name;
    user.title = req.body.title || user.title;
    user.role = req.body.role || user.role;


    const updateUser = await user.save();

    updateUser.password = undefined;

    res.status(201).json({
      status: true,
      message: "Profile Update Successfully",
      user: updateUser,
    });
  }
    else {
      res.status(404).json({status: false, message: "User not found"});
    }

   
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
}

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
