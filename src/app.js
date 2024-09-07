import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db-config.js';
import userRouter from './routes/user-routes.js';
import jobRouter from './routes/job-routes.js';
import proposalRouter from './routes/proposal-routes.js';

dotenv.config();

const app = express();

// middlewares
app.use(
  cors({
    origin: '*',
    allowedHeaders: '*',
    exposedHeaders: ['x-auth-token'],
  })
);

// built in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/users', userRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/proposals', proposalRouter);


const startServer = async () => {
  try {
    await connectDB();

    const port = process.env.PORT || 7000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1); // Non-Recoverable Error
  }
};

startServer()