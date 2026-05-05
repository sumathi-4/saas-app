const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const Organization = require("../models/Organization");
const signup = async (req, res) => {
  try {
    const { name, email, password, organizationId } = req.body;
    // Check if organization exists
    // const org = await Organization.findById(organizationId);
    // if (!org) {
    //   return res.status(400).json({ message: "Invalid organization" });
    // }
        const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
        const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
      name,
      email,
      password: hashedPassword,
      organizationId
    });

    await user.save();
        res.status(201).json({ message: "User registered successfully" });
          } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
        const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
        const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
        const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        organizationId: user.organizationId
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
        res.json({
      token,
      user: {
        id: user._id,
        role: user.role,
        organizationId: user.organizationId
      }
    });
      } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// const getOrganizations = async (req, res) => {
//   try {
//     const orgs = await Organization.find();
//     res.json(orgs);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const createTestAdmin = async (req, res) => {
  try {
    const { email, password, organizationId } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      name: "Test Admin",
      email,
      password: hashedPassword,
      role: "admin",
      organizationId
    });

    await admin.save();
    res.json({ message: "Test admin created! Login with this email." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { signup,login,createTestAdmin};