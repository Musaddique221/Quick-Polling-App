import Poll from "../models/poll.js";

const getPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const createPoll = async (req, res) => {
  const { question, options } = req.body;

  if (!question || !options.length) {
    return res
      .status(400)
      .json({ message: "Please provide question and options" });
  }

  try {
    const newPoll = new Poll({
      question,
      options: options.map((text) => ({ text, votes: 0 })),
    });

    await newPoll.save();
    res.status(201).json(newPoll);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const votePoll = async (req, res) => {
  const { optionIndex } = req.body;
  const { id } = req.params;

  try {
    const poll = await Poll.findById(id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    poll.options[optionIndex].votes += 1;
    await poll.save();

    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { getPolls, createPoll, votePoll };
