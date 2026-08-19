import { useEffect, useState } from "react";
import { createTask, getCategories } from "../services/tasks";

function TaskForm({ onCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(2);
    const [status, setStatus] = useState("todo");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [error, setError] = useState("");

    // Load user's categories
    useEffect(() => {
        const loadCategories = async () => {
            try {
                setLoadingCategories(true);

                const response = await getCategories();

                const data = response.data;

                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    setCategories(data.results || []);
                }
            } catch (error) {
                console.error("Failed to load categories:", error);

                setError("Failed to load categories.");
            } finally {
                setLoadingCategories(false);
            }
        };

        loadCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError("Title is required.");
            return;
        }

        if (title.trim().length < 3) {
            setError("Title must contain at least 3 characters.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const task = {
                title: title.trim(),
                description: description.trim(),
                status,
                priority,
                due_date: dueDate || null,
                category: category ? Number(category) : null,
            };

            console.log("Sending task:", task);

            await createTask(task);

            // Reset form
            setTitle("");
            setDescription("");
            setPriority(2);
            setStatus("todo");
            setDueDate("");
            setCategory("");

            // Reload tasks
            onCreated();
        } catch (error) {
            console.error("Task creation failed:", error);
            console.error("Django response:", error.response?.data);

            const djangoError = error.response?.data;

            if (djangoError) {
                setError(JSON.stringify(djangoError, null, 2));
            } else {
                setError("Failed to create task.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h2>Create Task</h2>

            {error && (
                <div
                    style={{
                        color: "red",
                        background: "#ffe5e5",
                        padding: "10px",
                        marginBottom: "15px",
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {error}
                </div>
            )}

            {/* Title */}
            <div>
                <label>Title</label>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task title"
                    disabled={loading}
                />
            </div>

            {/* Description */}
            <div>
                <label>Description</label>

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task description"
                    disabled={loading}
                />
            </div>

            {/* Status */}
            <div>
                <label>Status</label>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={loading}
                >
                    <option value="todo">Todo</option>
                    <option value="in_progress">
                        In Progress
                    </option>
                    <option value="done">Done</option>
                </select>
            </div>

            {/* Priority */}
            <div>
                <label>Priority</label>

                <select
                    value={priority}
                    onChange={(e) =>
                        setPriority(Number(e.target.value))
                    }
                    disabled={loading}
                >
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                </select>
            </div>

            {/* Category */}
            <div>
                <label>Category</label>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={loading || loadingCategories}
                >
                    <option value="">
                        {loadingCategories
                            ? "Loading categories..."
                            : "Select category"}
                    </option>

                    {categories.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Due Date */}
            <div>
                <label>Due date</label>

                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    disabled={loading}
                />
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Task"}
            </button>
        </form>
    );
}

export default TaskForm;