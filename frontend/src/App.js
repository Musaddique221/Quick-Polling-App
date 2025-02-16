import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://quick-polling-app-3.onrender.com";

const App = () => {
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);

  // Fetch all polls from the backend
  const fetchPolls = async () => {
    try {
      const response = await axios.get(`${API_URL}/polls`);
      setPolls(response.data);
    } catch (error) {
      toast.error("Error fetching polls!");
      console.error("Error fetching polls:", error);
    }
  };

  // Create a new poll
  const createPoll = async () => {
    if (!question.trim() || options.some((opt) => !opt.trim())) {
      toast.error("Please fill in all fields!");
      return;
    }

    const newPoll = { question, options };

    try {
      await axios.post(`${API_URL}/polls`, newPoll);
      fetchPolls(); // Refresh polls
      setQuestion(""); // Clear input fields
      setOptions([""]);
      toast.success("Poll created successfully!");
    } catch (error) {
      toast.error("Error creating poll!");
      console.error("Error creating poll:", error);
    }
  };

  // Vote on a poll
  const vote = async (pollId, optionIndex) => {
    console.log(pollId, optionIndex, "47");
    try {
      await axios.post(`${API_URL}/polls/${pollId}/vote`, { optionIndex });
      fetchPolls(); // Refresh poll results
      toast.success("Vote submitted!");
    } catch (error) {
      toast.error("Error submitting vote!");
      console.error("Error voting:", error);
    }
  };

  // Automatically fetch polls every 5 seconds
  useEffect(() => {
    fetchPolls();
    const interval = setInterval(fetchPolls, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Quick Polling App
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Poll Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          {options.map((opt, idx) => (
            <input
              key={idx}
              type="text"
              className="w-full p-2 border rounded"
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[idx] = e.target.value;
                setOptions(newOptions);
              }}
            />
          ))}

          <button
            onClick={() => setOptions([...options, ""])}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Add Option
          </button>
          <button
            onClick={createPoll}
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Create Poll
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto mt-6 space-y-6">
        {polls.map((poll) => (
          <div key={poll.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold">{poll.question}</h2>
            {poll.options.map((option, index) => (
              <div
                key={index}
                className="flex justify-between items-center mt-2"
              >
                <span>{option.text}</span>
                <button
                  onClick={() => vote(poll._id, index)}
                  className="bg-green-800 text-white px-3 py-1 rounded"
                >
                  Vote ({option.votes})
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
