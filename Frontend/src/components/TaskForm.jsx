import { useState } from "react";
import axios from "../api/axios";

const TaskForm = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios.post("/tasks", { title, description });

    setTitle("");
    setDescription("");
    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={submitHandler} className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">Add Task</h3>

      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full border p-2 rounded mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
