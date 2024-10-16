import User from "../models/user.js";
import Client from "../models/client.js";
import Craftsman from "../models/craftsman.js";
import bcrypt from "bcrypt";
import asyncHandler from "../utils/async-handler.js";

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

  res.status(201).header("x-auth-token", token).json({
    message: "Client registered successfully",
    user: clientResponse,
  });
});

export const registerCraftsman = asyncHandler(async (req, res) => {
  const { name, email, password, photo, jobTitle, description } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const craftsman = new Craftsman({
    name,
    email,
    password: hashedPassword,
    photo,
    jobTitle,
    description,
  });

  await craftsman.save();

  const token = craftsman.genAuthToken();
  const craftsmanResponse = {
    name: craftsman.name,
    email: craftsman.email,
    role: "craftsman",
    photo: craftsman.photo,
    jobTitle: craftsman.jobTitle,
    description: craftsman.description,
  };

  res.status(201).header("x-auth-token", token).json({
    message: "Craftsman registered successfully",
    user: craftsmanResponse,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Invalid email or password." });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(401).json({ message: "Invalid email or password." });

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

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    // maxAge: 36000,
  });

  res.status(200).json({
    message: "Logged in successfully",
    user: userResponse,
  });
});
