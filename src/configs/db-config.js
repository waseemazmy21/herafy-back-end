import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    throw new Error('MongoDB URI is not defined in environment variables.');
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
};

export default connectDB;