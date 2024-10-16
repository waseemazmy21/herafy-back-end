import express from "express";
import {
  registerClient,
  registerCraftsman,
  loginUser,
} from "../controllers/auth-controller.js";
import {
  clientRegistrationValidator,
  craftsmanRegistrationValidator,
  loginValidator,
} from "../validators/auth-validators.js";
import { handleValidationErrors } from "../middlewares/validate.js";

const router = express.Router();

router.post(
  "/register-client",
  clientRegistrationValidator,
  handleValidationErrors,
  registerClient
);

router.post(
  "/register-craftsman",
  craftsmanRegistrationValidator,
  handleValidationErrors,
  registerCraftsman
);

router.post("/login", loginValidator, handleValidationErrors, loginUser);

export default router;
