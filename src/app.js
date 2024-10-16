import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./configs/db-config.js";
import authRouter from "./routes/auth-routes.js";
import userRouter from "./routes/user-routes.js";
import jobRouter from "./routes/job-routes.js";
import proposalRouter from "./routes/proposal-routes.js";
import errorHandler from "./middlewares/error-handler-mw.js";

dotenv.config();

const app = express();

// third-pary middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

// built in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/proposals", proposalRouter);

// Error handler middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    const port = process.env.PORT || 7000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1); // Non-Recoverable Error
  }
};

startServer();
