
import { useState } from "react";
import "./AdminDashboard.css";
import AdminDocuments from "./AdminDocuments";
import AdminQuestions from "./AdminQuestion";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <div className="admin-dashboard">

      {/* Header */}
      <header className="admin-header">
        <div>
          <h1>Place-Prep Admin</h1>

          <p>
            Welcome, {admin?.username}
          </p>
        </div>

        <div className="admin-role">
          {admin?.role}
        </div>
      </header>

      <div className="admin-content">

        {/* Sidebar */}
        <aside className="admin-sidebar">

          <button
            onClick={() => setActiveSection("dashboard")}
          >
            🏠 Dashboard
          </button>

          <button
            onClick={() => setActiveSection("documents")}
          >
            📄 Documents
          </button>

          <button
            onClick={() => setActiveSection("questions")}
          >
            📝 Questions
          </button>

          <button
            onClick={() => setActiveSection("progress")}
          >
            📊 Student Progress
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("admin");
              window.location.href = "/admin-login";
            }}
          >
            🚪 Logout
          </button>

        </aside>

        {/* Main Content */}
        <main className="admin-main">

          {/* Dashboard */}
          {activeSection === "dashboard" && (
            <div>

              <h2>Dashboard</h2>

              <div className="admin-cards">

                <div
                  className="admin-card"
                  onClick={() => setActiveSection("documents")}
                >
                  <h3>📄 Documents</h3>
                  <p>
                    View documents uploaded by students
                  </p>
                </div>

                <div
                  className="admin-card"
                  onClick={() => setActiveSection("questions")}
                >
                  <h3>📝 Questions</h3>
                  <p>
                    Post Aptitude and DSA questions
                  </p>
                </div>

                <div
                  className="admin-card"
                  onClick={() => setActiveSection("progress")}
                >
                  <h3>📊 Progress</h3>
                  <p>
                    View student progress
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* Documents */}
          {activeSection === "documents" && (
  <AdminDocuments />
)}

          {/* Questions */}
          {activeSection === "questions" && (
            <AdminQuestions />
          )}

          {/* Progress */}
          {activeSection === "progress" && (
            <div>
              <h2>Student Progress</h2>

              <p>
              </p>
            </div>
          )}

          {/* Progress */}
          {activeSection === "progress" && (
            <div>
              <h2>Student Progress</h2>

              <p>
                Student progress will appear here.
              </p>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}

export default AdminDashboard;

