// controllers/authController.js
/*const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/personModel");

//  1. Utility: Sign a JWT token for the user
const signToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "15m" } // default to 15 minutes
  );
};

// 2. Send token to client
const createSendToken = (user, statusCode, message, res) => {
  const token = signToken(user);

  const sanitizedUser = {
    id: user._id,
    name: user.fName,
    role: user.role,
  };

  res.status(statusCode).json({
    status: "Success",
    token,
    data: { user: sanitizedUser },
    message,
  });
};

//  3. LOGIN controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const targetUser = await User.findOne({ email });
    if (!targetUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, targetUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Send token if login is valid
    createSendToken(targetUser, 200, "You are logged in", res);

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🛡️ 4. PROTECT middleware (auth guard)
exports.protect = async (req, res, next) => {
  try {
    // Get token from header
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ message: "User no longer exists." });
    }

    // Attach user to request
    req.user = currentUser;
    next(); // move to the next middleware or route

  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Not authorized. Invalid or expired token." });
  }
}; */