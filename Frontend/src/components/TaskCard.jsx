const TaskCard = ({ task, onDelete, onEdit, onStatusToggle }) => {
  const isCompleted = task.status === "completed";

  return (
    <div className="group bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex justify-between items-start">
      <div className="flex-1">
        <h3 className={`font-bold text-gray-800 transition-all ${isCompleted ? "line-through text-gray-400" : ""}`}>
          {task.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-2">
          {task.description || "No description provided."}
        </p>

        <div className="flex items-center gap-4 mt-4 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onStatusToggle(task)}
            className={`text-xs font-medium transition-colors ${
              isCompleted ? "text-gray-400 hover:text-blue-600" : "text-blue-600 hover:text-blue-700"
            }`}
          >
            {isCompleted ? "↩ Mark Pending" : "✓ Mark Done"}
          </button>

          <button
            onClick={() => onEdit(task)}
            className="text-xs font-medium text-gray-600 hover:text-yellow-600 transition-colors"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="text-xs font-medium text-gray-400 hover:text-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <span
        className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border ${
          isCompleted
            ? "bg-green-50 text-green-700 border-green-100"
            : "bg-amber-50 text-amber-700 border-amber-100"
        }`}
      >
        {task.status}
      </span>
    </div>
  );
};

export default TaskCard;