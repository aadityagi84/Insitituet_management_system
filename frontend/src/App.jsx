import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./components/Login";
import Register from "./components/Register";
import { useAuth } from "./context/UserContext";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";
import Institute from "./admin/DashBoardIndex";
import LandingPage from "./pages/LandingPage";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { roleData } = useAuth();
  return allowedRoles.includes(roleData) ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            >
              <Route index element={<LandingPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <ProtectedRoute allowedRoles={[0]}>
                      <Institute />
                    </ProtectedRoute>
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher"
                element={
                  <PrivateRoute>
                    <ProtectedRoute allowedRoles={[0, 1]}>
                      <Teacher />
                    </ProtectedRoute>
                  </PrivateRoute>
                }
              />

              <Route
                path="/student"
                element={
                  <PrivateRoute>
                    <ProtectedRoute allowedRoles={[0, 1, 2]}>
                      <Student />
                    </ProtectedRoute>
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center h-screen text-center">
                  <h1 className="text-3xl font-bold text-red-600">
                    404 Not Found
                  </h1>
                  <Link
                    to="/"
                    className="bg-red-600 px-4 py-2 text-white  rounded-xl mt-2"
                  >
                    Back to home
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
