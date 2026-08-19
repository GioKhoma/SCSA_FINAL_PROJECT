import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";

import Layout from "./components/Layout";
import TasksPage from "./pages/TasksPage";
import StatsPage from "./pages/StatsPage";
import { useAuth } from "./context/AuthContext";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await login(username, password);

      navigate("/tasks");
    } catch (error) {
      console.error(error);

      setError("Invalid username or password.");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form className="task-form" onSubmit={handleSubmit}>
        <div>
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <StatsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={<Navigate to="/tasks" replace />}
        />

        <Route
          path="*"
          element={<Navigate to="/tasks" replace />}
        />
      </Routes>
    </Layout>
  );
}

export default App;