function TaskItem({ task, onComplete, onDelete }) {
    return (
        <div className="task-item">
            <div>
                <h3>{task.title}</h3>

                {task.description && <p>{task.description}</p>}

                <p>
                    <strong>Status:</strong> {task.status}
                </p>

                <p>
                    <strong>Priority:</strong> {task.priority}
                </p>

                {task.due_date && (
                    <p>
                        <strong>Due:</strong> {task.due_date}
                    </p>
                )}

                {task.category && (
                    <p>
                        <strong>Category:</strong>{" "}
                        {typeof task.category === "object"
                            ? task.category.name
                            : task.category}
                    </p>
                )}
            </div>

            <div>
                {task.status !== "DONE" && (
                    <button onClick={() => onComplete(task.id)}>
                        Complete
                    </button>
                )}

                <button onClick={() => onDelete(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskItem;