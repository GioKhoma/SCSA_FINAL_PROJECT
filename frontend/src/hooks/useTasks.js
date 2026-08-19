import { useCallback, useEffect, useState } from "react";
import {
    getTasks,
    deleteTask,
    completeTask,
} from "../services/tasks";

export default function useTasks(filters = {}) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadTasks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getTasks(filters);

            const data = response.data;

            if (Array.isArray(data)) {
                setTasks(data);
            } else {
                setTasks(data.results || []);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to load tasks.");
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const removeTask = async (id) => {
        try {
            await deleteTask(id);
            await loadTasks();
        } catch (err) {
            console.error(err);
            setError("Failed to delete task.");
        }
    };

    const markComplete = async (id) => {
        try {
            await completeTask(id);
            await loadTasks();
        } catch (err) {
            console.error(err);
            setError("Failed to complete task.");
        }
    };

    return {
        tasks,
        loading,
        error,
        reload: loadTasks,
        removeTask,
        markComplete,
    };
}