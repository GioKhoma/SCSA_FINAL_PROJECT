import { useEffect, useState } from "react";
import { getCategories } from "../services/tasks";

function TaskFilters({ filters, setFilters }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await getCategories();

                const data = response.data;

                setCategories(
                    Array.isArray(data) ? data : data.results || []
                );
            } catch (error) {
                console.error("Failed to load categories:", error);
            }
        };

        loadCategories();
    }, []);

    const handleChange = (name, value) => {
        setFilters((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    return (
        <div>
            <h2>Filters</h2>

            <input
                type="text"
                placeholder="Search..."
                value={filters.search || ""}
                onChange={(e) =>
                    handleChange("search", e.target.value)
                }
            />

            <select
                value={filters.status || ""}
                onChange={(e) =>
                    handleChange("status", e.target.value)
                }
            >
                <option value="">All statuses</option>
                <option value="TODO">Todo</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
            </select>

            <select
                value={filters.priority || ""}
                onChange={(e) =>
                    handleChange("priority", e.target.value)
                }
            >
                <option value="">All priorities</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
            </select>

            <select
                value={filters.category || ""}
                onChange={(e) =>
                    handleChange("category", e.target.value)
                }
            >
                <option value="">All categories</option>

                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <button
                onClick={() => setFilters({})}
            >
                Clear Filters
            </button>
        </div>
    );
}

export default TaskFilters;