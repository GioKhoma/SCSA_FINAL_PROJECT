import TaskItem from "./TaskItem";

function TaskList({ tasks, onComplete, onDelete }) {
    if (tasks.length === 0) {
        return <p>No tasks found.</p>;
    }

    return (
        <div>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onComplete={onComplete}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default TaskList;