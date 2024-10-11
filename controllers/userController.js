const User = require("../models/userSchema");
const Admin = require("../models/adminSchema");
const Assignment = require("../models/assignmentSchema");
const generateToken = require("../authentication/jwt/generateToken");
const {validationResult} = require('express-validator');

//Register a new user
exports.register = async (req, res) => {

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password, email } = req.body;
    const user = new User({ username, password, email });
    await user.save();
    console.log(user + "User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Registration failed" });
  }
};

//Login a user
exports.login = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) { 
    return res.status(400).json({ errors: errors.array() });
  } 

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    if (user.role !== "User") {
      console.log("Unauthorized user");
      return res.status(400).json({ error: "Unauthorized user" });
    }

    //Generate a token
    const payload = { id: user._id };
    const token = generateToken(payload);

    res.status(200).json({ token: token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Authentication failed" });
  }
};

//Upload an assignment by a user
exports.upload = async (req, res) => {
  try {
    const { task, adminId } = req.body;

    const userId = req.user.id;

    const admin = await Admin.findOne({ _id: adminId });

    if (!admin || admin.role !== "Admin") {
      return res.status(400).json({ error: "Invalid Admin selection" });
    }

    const assignment = new Assignment({ task : task, userId : userId, admin: adminId });
    await assignment.save();

    console.log("Assignment uploaded successfully");
    res.status(201).json({ message: "Assignment uploaded successfully" });

  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Upload failed" });
  }
};

//Fetch a list of Admins
exports.admins = async (req, res) => {
  try {
    const admins = await Admin.find({ role: "Admin" }).select('username');
    res.status(200).json(admins);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to fetch Admins" });
  }
};

//Get a list of all assignments uploaded by the logged in user

exports.myAssignments = async (req, res) => {
    try {
        const userId = req.user.id;
        const assignments = await Assignment.find({ userId: userId });
        res.status(200).json(assignments);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Failed to fetch assignments" });
    }
};  