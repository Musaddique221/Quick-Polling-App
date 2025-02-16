import mongoose from "mongoose";

const PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      votes: { type: Number, default: 0 },
    },
  ],
});

const Poll = mongoose.model("Poll", PollSchema);
export default Poll;
