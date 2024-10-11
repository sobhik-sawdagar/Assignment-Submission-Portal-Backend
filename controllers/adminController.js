const Admin = require("../models/adminSchema");
const Assignment = require("../models/assignmentSchema");
const generateToken = require("../authentication/jwt/generateToken");
const { validationResult } = require("express-validator"); 

//Register a new admin
exports.register = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {  
    return res.status(400).json({ errors: errors.array() });
  } 

  try {
    const { username, password } = req.body;
    const admin = new Admin({ username, password });
    await admin.save();
    console.log(admin + "Admin registered successfully");
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Registration failed" });
  }
};

//Login an admin
exports.login = async (req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 

  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username: username });

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    //Generate a token
    const payload = { id: admin._id };
    const token = generateToken(payload);

    res.status(200).json({ token: token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Authentication failed" });
  }
};

//Fetch assignments tagged to a logged in admin

exports.assignments = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const assignments = await Assignment.find({ admin: adminId }).populate(
      "userId",
      "username"
    );

    res.status(200).json({ assignments: assignments });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to fetch assignments" });
  }
};


//Accept an assignment with a remark by an admin
exports.accept = async (req, res) => {
  const { remark } = req.body;
  const assignmentId = req.params.id;
  const adminId = req.admin.id; // Ensure the user is the admin

  try {
    // Find the assignment by its ID and the logged-in admin
    const assignment = await Assignment.findOne({
      _id: assignmentId,
      admin: adminId,
    });

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    if(assignment.status === 'accepted'){
        return res.status(400).json({ error: 'Assignment already accepted' });
    }


    if (!remark) {
        return res.status(400).json({ error: 'Remark is required' });
      }

    // Update the assignment status to 'accepted' and set the remark
    assignment.status = "accepted";
    assignment.remarks = remark;

    await assignment.save(); // Save the updated assignment

    console.log("Assignment accepted");
    res.json({ message: "Assignment accepted", assignment });
  } catch (error) {
    res.status(500).json({ error: "Failed to accept assignment" });
  }
};

//Reject an assignment with a remark by an admin
exports.reject = async (req, res) => {
  const { remark } = req.body;
  const assignmentId = req.params.id;
  const adminId = req.admin.id; // Ensure the user is the admin

  try {
    // Find the assignment by its ID and the logged-in admin
    const assignment = await Assignment.findOne({
      _id: assignmentId,
      admin: adminId,
    });

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    if(assignment.status === 'rejected'){
        return res.status(400).json({ error: 'Assignment already rejected' });
    }

    if (!remark) {
        return res.status(400).json({ error: 'Remark is required' });
      }

    // Update the assignment status to 'rejected' and set the remark
    assignment.status = "rejected";
    assignment.remarks = remark;

    await assignment.save(); // Save the updated assignment

    console.log("Assignment rejected");
    res.json({ message: "Assignment rejected", assignment });
  } catch (error) {
    res.status(500).json({ error: "Failed to reject assignment" });
  }
};