const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Person = require("../models/personSchema");

const signToken = (person) => {
  return jwt.sign(
    {
      id: person._id,
      role: person.roles[0] // Assuming the first role is the primary one
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
  );
};

// 2. Send token to client
const createSendToken = (person, statusCode, message, res) => {
  const token = signToken(person);

  const sanitizedUser = {
    id: person._id,
    role: person.roles[0]
  };

  res.status(statusCode).json({
    status: "Success",
    token,
    data: { person: sanitizedUser },
    message
  });
};

// 3. LOGIN Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const targetPerson = await Person.findOne({ email });
    if (!targetPerson) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

if (!targetPerson || !targetPerson.passwordHash) {
  return res.status(400).json({ message: "Invalid email or password" });
}
    
    // Compare password
    const isMatch = await bcrypt.compare(password, targetPerson.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Send token
    createSendToken(targetPerson, 200, "You are logged in", res);

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 4. PROTECT Middleware
exports.protect = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentPerson = await Person.findById(decoded.id);
    if (!currentPerson) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    // Attach user to request
    req.user = currentPerson;

    // 🔧 Attach role explicitly from decoded token or DB
    req.user.role = decoded.role || currentPerson.roles[0];

    next();

  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please login again" });
    }
    console.error("Auth middleware error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
