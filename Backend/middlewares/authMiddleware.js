import jwt from "jsonwebtoken";
import User from "../model/user.js";

const clearAuthCookie = (res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
};

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "Not authorized. Try login again" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET?.trim());

    const resp = await User.findById(decodedToken.userId).select(
      "isAdmin email isActive"
    );

    if (!resp || !resp.isActive) {
      clearAuthCookie(res);
      return res.status(401).json({
        status: false,
        message: "Session expired or account inactive. Please login again",
      });
    }

    req.user = {
      email: resp.email,
      isAdmin: resp.isAdmin,
      userId: decodedToken.userId,
    };

    next();
  } catch (error) {
    clearAuthCookie(res);
    return res.status(401).json({
      status: false,
      message: "Not authorized. Try login again",
    });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin",
    });
  }
};

export { isAdminRoute, protectRoute };
