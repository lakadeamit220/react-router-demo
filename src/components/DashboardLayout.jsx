import React from "react";
import { Outlet, Link } from "react-router-dom";

// Layout Component with Sidebar
function DashboardLayout() {
  return (
    <div>
      <header>
        <h1>Dashboard</h1>
      </header>
      <div style={{ display: "flex" }}>
        <nav style={{ width: "200px", padding: "1rem", background: "#f0f0f0" }}>
          <Link to="/dashboard">Dashboard Home</Link>
          <br />
          <Link to="/dashboard/settings">Settings</Link>
          <br />
          <Link to="/">Application Home</Link>
        </nav>
        <main style={{ padding: "1rem", flex: 1 }}>
          {/* Renders nested child routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Page Components
function DashboardHome() {
  return <h2>Dashboard Home</h2>;
}

function DashboardSettings() {
  return <h2>Dashboard Settings</h2>;
}

export { DashboardLayout, DashboardHome, DashboardSettings };
