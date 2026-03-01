"use client";

export default function AdminDashboardStat() {
  return (
    <div className="main-content">
      <h2>System Statistics</h2>

      <div className="courses">
        <div className="course-card">
          <div className="course-icon">👤</div>
          <p>Total Users: 0</p>
        </div>

        <div className="course-card">
          <div className="course-icon">🏢</div>
          <p>Total Companies: 0</p>
        </div>

        <div className="course-card">
          <div className="course-icon">🧑‍🍳</div>
          <p>Total Staffs: 0</p>
        </div>
      </div>

      <div className="courses">
        <div className="course-card">
          <div className="course-icon">👤</div>
          <p>Total Customers: 0</p>
        </div>

        <div className="course-card">
          <div className="course-icon">🎁</div>
          <p>Total Rewards: 0</p>
        </div>

        <div className="course-card">
          <div className="course-icon">💎</div>
          <p>Points Issued: 0</p>
        </div>
      </div>
    </div>
  );
}