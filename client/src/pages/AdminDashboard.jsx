import React from "react";

const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <p style={styles.text}>🚀 Coming Soon...</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f6f9",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  text: {
    fontSize: "1.5rem",
    color: "#7f8c8d",
    marginTop: "1rem",
  },
};

export default AdminDashboard;
