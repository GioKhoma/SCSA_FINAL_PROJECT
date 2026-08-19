import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout({ children }) {
    const { authenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
            <nav>
                <h1>Task Manager</h1>

                {authenticated && (
                    <>
                        <Link to="/tasks">Tasks</Link>
                        {" | "}
                        <Link to="/stats">Statistics</Link>
                        {" | "}

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                )}
            </nav>

            <main>{children}</main>
        </div>
    );
}

export default Layout;