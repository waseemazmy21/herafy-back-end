import express from "express";
import {
  getUser,
  getCraftsmanDetails,
} from "../controllers/user-controller.js";
import checkUser from "../middlewares/check-user.js";

const router = express.Router();

router.get("/me", checkUser, getUser);

router.get("/craftsman/:id", getCraftsmanDetails);

export default router;
