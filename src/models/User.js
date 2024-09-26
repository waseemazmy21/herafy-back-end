import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const options = {
  discriminatorKey: "role",
  collection: "User",
  timestamp: true,
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    photo: {
      type: String,
      default: "",
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  options
);

userSchema.methods.genAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWTSEC
  );
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
