import { body } from "express-validator";
import User from "../models/user.js";

const userRegistrationValidator = [
  body("name", "Name must be alphanumeric and between 2 and 50 characters.")
    .trim()
    .notEmpty()
    .isAlphanumeric("en-US", { ignore: " " })
    .isLength({ min: 2, max: 50 }),

  body("email", "Invalid email format")
    .trim()
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already in use");
      }
    }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("photo").optional(),
];

export const clientRegistrationValidator = [...userRegistrationValidator];

export const craftsmanRegistrationValidator = [
  ...userRegistrationValidator,

  body("jobTitle").trim().notEmpty().withMessage("Job title is required"),

  body("description").trim().notEmpty().withMessage("Description is required"),
];
