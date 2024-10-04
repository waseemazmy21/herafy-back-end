import User from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.role === "client") {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else if (req.role === "craftsman") {
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
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCraftsmanDetails = async (req, res) => {
  try {
    const craftsman = await User.findById(req.params.id);
    if (!craftsman) {
      return res.status(404).json({ error: "Craftsman not found" });
    }
    res.json({
      name: craftsman.name,
      description: craftsman.description,
      phone: craftsman.phone,
      jobTitle: craftsman.jobTitle,
      ratings: craftsman.ratings,
    });
  } catch (error) {
    console.error("Error retrieving craftsman:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
