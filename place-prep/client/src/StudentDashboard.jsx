import { Link } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {
  return (
    <div className="dashboard-page">

      <h1>Place-Prep</h1>
      <h2>Student Dashboard</h2>

      <div className="dashboard-container">

        <div className="dashboard-card">
          <h3>Aptitude</h3>
          <p>Practice aptitude questions</p>
          <Link to="/aptitude">
            <button>Start Practice</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>DSA</h3>
          <p>Access DSA learning and practice resources</p>
          <Link to="/dsa">
            <button>Explore DSA</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>Communication</h3>
          <p>Improve communication and interview skills</p>
          <Link to="/communication">
            <button>Explore</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>My Documents</h3>
          <p>Upload and manage your placement documents</p>
          <Link to="/documents">
            <button>View Documents</button>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;