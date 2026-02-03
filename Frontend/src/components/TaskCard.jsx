const TaskCard = ({
  task,
  onDelete,
  onEdit,
  onStatusToggle,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-500">
          {task.description || "No description"}
        </p>

        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onStatusToggle(task)}
            className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-600"
          >
            Toggle
          </button>

          <button
            onClick={() => onEdit(task)}
            className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-600"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="text-xs px-2 py-1 rounded bg-red-100 text-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      <span
        className={`text-sm px-3 py-1 rounded ${
          task.status === "completed"
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600"
        }`}
      >
        {task.status}
      </span>
    </div>
  );
};

export default TaskCard;
