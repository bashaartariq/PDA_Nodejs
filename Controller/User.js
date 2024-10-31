const axios = require("axios");
require("dotenv").config();
const { user } = require("../Model");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Op, Sequelize } = require("sequelize");

const validateUser = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Gender is required and must be one of: male, female, other"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),
  body("role")
    .isIn(["admin", "doctor", "patient"])
    .withMessage("Role is required and must be one of: admin, doctor, patient"),
];

const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" });
  }
  try {
    const foundUser = await user.findOne({ where: { email } });
    if (!foundUser) {
      return res.status(404).send({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        userId: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        Name:
          foundUser.firstName +
          " " +
          foundUser.middleName +
          " " +
          foundUser.lastName,
      },
      process.env.privateKey,
      { expiresIn: "2h" }
    );

    return res.status(200).send({
      message: "Login successful",
      token,
      user: {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      },
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send({ error: "An error occurred during login" });
  }
};

const signup = async (req, res) => {
  console.log(req.body);
  const {
    firstName,
    middleName,
    lastName,
    gender,
    email,
    confirmPassword,
    role,
    password,
    dob,
  } = req.body;

  console.log(dob);
  try {
    const existingUser = await user.findOne({ where: { email } });
    const dobDate = new Date(dob).toISOString().split("T")[0];

    console.log(dobDate);
    const PatientUnique = await user.findOne({
      where: {
        firstName,
        middleName,
        lastName,
        role: "patient",
        dob: {
          [Op.eq]: Sequelize.fn("DATE", dobDate),
        },
      },
    });
    console.log("This is the Unique Patient", PatientUnique);
    if (PatientUnique) {
      return res.status(400).json({
        message: "patient cannot have same Name and Date of Birth",
      });
    }
    if (existingUser) {
      return res.status(400).json({
        message: "Email is already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      firstName,
      middleName,
      lastName,
      gender,
      email,
      password: hashedPassword,
      dob,
      role,
    });

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      process.env.privateKey,
      { expiresIn: "2h" }
    );
    res.status(200).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

const getRoles = async(req,res)=>{
  try {
    const response = await axios.get("http://localhost:8000/api/getRoles");
    console.log("Data Retrived : ", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.log(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error.response.data);
  }

}
const getGender = async(req,res)=>{
  try{
    const response = await axios.get('http://localhost:8000/api/Gender');
    console.log("Data received : ",response.data);
    return res.status(200).send(response.data);}
  catch(err)
  {
    console.log("Error while fetching the Gender");
    res.status(500).send("ERROR");
  }
}
module.exports = { signin, signup,getRoles,getGender };
