import mongoose from "mongoose";
import User from "./user.js";

const clientSchema = new mongoose.Schema({
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

const Client = User.discriminator("client", clientSchema);
export default Client;
