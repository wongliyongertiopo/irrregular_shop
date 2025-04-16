import React from "react";
import "./Dashbord.css"; // Pastikan file ini ada di folder yang sama

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Dashboard Admin</h1>
      <div className="dashboard-section">
        <p>
          Selamat datang di dashboard admin. Di sini kamu bisa mengelola produk,
          pesanan, dan lainnya.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
