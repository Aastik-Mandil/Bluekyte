var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const secret = "test";

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        status: false,
        statusCode: 200,
        message: "User does not exist",
        data: null,
        token: null,
        error: null,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: false,
        statusCode: 200,
        message: "Invalid credentials",
        data: null,
        token: null,
        error: null,
      });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id, name: existingUser.name},
      secret,
      { expiresIn: "7d" }
    );
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Sign-in successfully",
      data: existingUser,
      token: token,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error while Sign-in",
      data: null,
      error: err.message,
    });
  }
};

const signUp = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  } = req.body;
  try {
    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        statusCode: 200,
        message: "User already exists",
        data: null,
        token: null,
        error: null,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: false,
        statusCode: 200,
        message: "Password does not match",
        data: null,
        token: null,
        error: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      secret,
      { expiresIn: "7d" }
    );
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Sign-up successfully",
      data: result,
      token: token,
      err: null,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error while Sign-up",
      data: null,
      error: err.message,
    });
  }
};

module.exports = { signIn, signUp };
