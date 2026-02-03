import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  const getAllTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      setTasks(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  const deleteTaskById = async (taskId) => {
    if (!confirm("Delete this task?")) return;
    await axios.delete(`/tasks/${taskId}`);
    getAllTasks();
  };

  const updateTaskStatus = async (task) => {
    await axios.put(`/tasks/${task._id}`, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    getAllTasks();
  };

  const updateTaskById = async () => {
    await axios.put(`/tasks/${editingTask._id}`, {
      title: editingTask.title,
      description: editingTask.description,
    });
    setEditingTask(null);
    getAllTasks();
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard title="Total Tasks" value={tasks.length} />
          <StatCard
            title="Pending"
            value={tasks.filter((t) => t.status === "pending").length}
          />
          <StatCard
            title="Completed"
            value={tasks.filter((t) => t.status === "completed").length}
          />
        </div>

        <TaskForm onSuccess={getAllTasks} />

        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full p-2 border rounded mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found</p>
        ) : (
          <div className="grid gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTaskById}
                onEdit={setEditingTask}
                onStatusToggle={updateTaskStatus}
              />
            ))}
          </div>
        )}
      </div>

      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="font-semibold mb-3">Edit Task</h3>

            <input
              className="w-full border p-2 rounded mb-2"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
            />

            <textarea
              className="w-full border p-2 rounded mb-3"
              value={editingTask.description}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  description: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingTask(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={updateTaskById}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

export default Dashboard;
