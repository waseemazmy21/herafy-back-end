import User from "../models/user.js";
import Client from "../models/client.js";
import bcrypt from "bcrypt";
import asyncHandler from "../utils/async-handler.js";
import CustomError from "../utils/CustomError.js";

export const registerClient = asyncHandler(async (req, res, next) => {
  const { name, email, password, photo } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const client = new Client({
    name,
    email,
    password: hashedPassword,
    photo,
  });

  await client.save();

  const token = client.genAuthToken();

  const clientResponse = {
    name: client.name,
    email: client.email,
    role: "client",
    photo: client.photo,
  };

  res.status(201).json({
    message: "Client registered successfully",
    token: token,
    user: clientResponse,
  });
});

export const registerCraftsman = async (req, res) => {};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, jobTitle, description, phone } =
      req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).send("missing required fields");
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json("User already registered.");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      jobTitle,
      description,
      phone,
    });

    await user.save();

    const userResponse = {
      name: user.name,
      role: user.role,
      email: user.email,
    };

    if (user.role === "craftsman") {
      userResponse.jobTitle = user.jobTitle;
      userResponse.description = user.description;
    }

    const token = user.genAuthToken();
    res.setHeader("x-auth-token", token);
    res.json(userResponse);
  } catch (error) {
    if (error instanceof Mongoose.Error.ValidationError) {
      for (const e in error.errors) {
        console.log(error.errors[e].message);
      }
    } else {
      console.log(error.message);
    }
    res.status(500).send({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid email or password." });

    const token = user.genAuthToken();

    const userResponse = {
      name: user.name,
      role: user.role,
      email: user.email,
    };

    if (user.role === "craftsman") {
      userResponse.jobTitle = user.jobTitle;
      userResponse.description = user.description;
    }

    res.setHeader("x-auth-token", token);
    res.json({
      message: "Logged in successfully",
      user: userResponse,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
