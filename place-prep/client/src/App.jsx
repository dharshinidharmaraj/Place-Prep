import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import StudentDashboard from "./StudentDashboard";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import Aptitude from "./Aptitude";
import DSA from "./DSA";
import Communication from "./Communication";
import Documents from "./Documents";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Student Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Student Dashboard */}
        <Route
          path="/dashboard"
          element={<StudentDashboard />}
        />

        {/* Student Sections */}
        <Route
          path="/aptitude"
          element={<Aptitude />}
        />

        <Route
          path="/dsa"
          element={<DSA />}
        />

        <Route
          path="/communication"
          element={<Communication />}
        />

        <Route
          path="/documents"
          element={<Documents />}
        />

        {/* Admin Login */}
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;