import { useEffect, useState } from "react";
import { getStats } from "../services/tasks";

function StatsPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const response = await getStats();
                setStats(response.data);
            } catch (error) {
                console.error("Failed to load stats:", error);
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, []);

    if (loading) {
        return <p>Loading statistics...</p>;
    }

    if (!stats) {
        return <p>Failed to load statistics.</p>;
    }

    return (
        <div>
            <h1>Statistics</h1>

            <div>
                <h2>Total Tasks</h2>
                <p>{stats.total}</p>
            </div>

            <div>
                <h2>Completed</h2>
                <p>{stats.done}</p>
            </div>

            <div>
                <h2>Overdue</h2>
                <p>{stats.overdue}</p>
            </div>
        </div>
    );
}

export default StatsPage;