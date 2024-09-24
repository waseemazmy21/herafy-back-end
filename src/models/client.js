import mongoose from "mongoose";
import User from "./user";

const clientSchema = new mongoose.Schema({
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Client = User.discriminator("client", clientSchema);
export default Client;
