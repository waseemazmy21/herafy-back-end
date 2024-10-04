import mongoose from "mongoose";
import User from "./user.js";

const craftsmanSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  proposals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
    },
  ],
});

const Craftsman = User.discriminator("craftsman", craftsmanSchema);
export default Craftsman;
