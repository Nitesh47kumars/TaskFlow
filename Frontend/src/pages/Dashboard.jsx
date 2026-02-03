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
  const [statusFilter, setStatusFilter] = useState("all");

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

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {" "}
      {/* Soft slate background */}
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Task Overview</h1>
          <p className="text-gray-500">
            Manage your daily flow and productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Tasks" value={tasks.length} color="blue" />
          <StatCard
            title="Pending"
            value={tasks.filter((t) => t.status === "pending").length}
            color="amber"
          />
          <StatCard
            title="Completed"
            value={tasks.filter((t) => t.status === "completed").length}
            color="green"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-10">
          <TaskForm onSuccess={getAllTasks} />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-4 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="w-full md:w-48 p-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer shadow-sm text-gray-600"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500 font-medium">
              Loading your tasks...
            </p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-400">
              No tasks found matching your criteria.
            </p>
          </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setEditingTask(null)}
          ></div>

          <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-5">Edit Task</h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase mb-1 block">
                  Title
                </label>
                <input
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase mb-1 block">
                  Description
                </label>
                <textarea
                  rows="4"
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setEditingTask(null)}
                className="px-5 py-2.5 text-gray-500 font-medium hover:bg-gray-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={updateTaskById}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    amber: "text-amber-600 bg-amber-50",
    green: "text-green-600 bg-green-50",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-100 transition-all group">
      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </p>
      <div className="flex items-center justify-between mt-2">
        <h2 className="text-3xl font-black text-gray-800">{value}</h2>
        <div className={`p-2 rounded-lg ${colors[color]} font-bold text-xs`}>
          {title === "Total Tasks" ? "All" : "Live"}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
