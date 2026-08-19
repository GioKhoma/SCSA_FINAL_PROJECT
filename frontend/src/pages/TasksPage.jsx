import { useState } from "react";
import useTasks from "../hooks/useTasks";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";

function TasksPage() {
    const [filters, setFilters] = useState({});

    const {
        tasks,
        loading,
        error,
        reload,
        removeTask,
        markComplete,
    } = useTasks(filters);

    return (
        <div>
            <h1>My Tasks</h1>

            <TaskForm onCreated={reload} />

            <hr />

            <TaskFilters
                filters={filters}
                setFilters={setFilters}
            />

            <hr />

            {loading && <p>Loading tasks...</p>}

            {error && <p>{error}</p>}

            {!loading && (
                <TaskList
                    tasks={tasks}
                    onComplete={markComplete}
                    onDelete={removeTask}
                />
            )}
        </div>
    );
}

export default TasksPage;