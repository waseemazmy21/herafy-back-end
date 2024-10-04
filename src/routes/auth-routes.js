import express from "express";
import {
  registerClient,
  registerCraftsman,
} from "../controllers/auth-controller.js";
import { body } from "express-validator";
import { clientRegistrationValidator } from "../validators/auth-validators.js";
import { handleValidationErrors } from "../middlewares/validate.js";

const router = express.Router();

router.post(
  "/register-client",
  clientRegistrationValidator,
  handleValidationErrors,
  registerClient
);
router.post("/register-craftsman", registerCraftsman);

// router.post("/login", loginUser);

export default router;
