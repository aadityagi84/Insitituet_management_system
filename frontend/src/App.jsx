import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./components/Login";
import Register from "./components/Register";
import { useAuth } from "./context/UserContext";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";
import Institute from "./admin/Institute";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// 🔹 FIX: `roleData` should be accessed inside the component, not passed as a prop.
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { roleData } = useAuth(); // Get roleData here
  return allowedRoles.includes(roleData) ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <ProtectedRoute allowedRoles={["0"]}>
                    <Institute />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/teacher"
              element={
                <PrivateRoute>
                  <ProtectedRoute allowedRoles={["0", "1"]}>
                    <Teacher />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/student"
              element={
                <PrivateRoute>
                  <ProtectedRoute allowedRoles={["0", "1", "2"]}>
                    <Student />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
