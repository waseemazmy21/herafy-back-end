import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Mongoose from 'mongoose';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, jobTitle, description, phone } =
      req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).send('missing required fields');
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json('User already registered.');

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

    if (user.role === 'craftsman') {
      userResponse.jobTitle = user.jobTitle;
      userResponse.description = user.description;
    }

    const token = user.genAuthToken();
    res.setHeader('x-auth-token', token);
    res.json(userResponse);
  } catch (error) {
    if (error instanceof Mongoose.Error.ValidationError) {
      for (const e in error.errors) {
        console.log(error.errors[e].message);
      }
    } else {
      console.log(error.message);
    }
    res.status(500).send({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid email or password.' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: 'Invalid email or password.' });

    const token = user.genAuthToken();

    const userResponse = {
      name: user.name,
      role: user.role,
      email: user.email,
    };

    if (user.role === 'craftsman') {
      userResponse.jobTitle = user.jobTitle;
      userResponse.description = user.description;
    }

    res.setHeader('x-auth-token', token);
    res.json({
      message: 'Logged in successfully',
      user: userResponse,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.role === 'client') {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else if (req.role === 'craftsman') {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        jobTitle: user.jobTitle,
        description: user.description,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getCraftsmanDetails = async (req, res) => {
  try {
    const craftsman = await User.findById(req.params.id);
    if (!craftsman) {
      return res.status(404).json({ error: 'Craftsman not found' });
    }
    res.json({
      name: craftsman.name,
      description: craftsman.description,
      phone: craftsman.phone,
      jobTitle: craftsman.jobTitle,
      ratings: craftsman.ratings,
    });
  } catch (error) {
    console.error('Error retrieving craftsman:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
