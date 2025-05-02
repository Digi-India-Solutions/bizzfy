import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";

const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <div className="flex-grow-1">
        {/* Navbar */}
        <nav className="navbar navbar-light bg-white shadow-sm px-4 d-flex justify-content-between">
          <span className="navbar-brand mb-0 h5">Welcome, User</span>

          {/* Profile Dropdown */}
          <div className="position-relative" ref={menuRef}>
            <button
              className="btn btn-light d-flex align-items-center gap-2"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <i className="bi bi-person-circle fs-5"></i>
              <i className={`bi ${dropdownOpen ? "bi-caret-up-fill" : "bi-caret-down-fill"} fs-6`}></i>
            </button>
            {dropdownOpen && (
              <div
                className="position-absolute end-0 mt-2 bg-white border shadow rounded p-2"
                style={{ minWidth: "160px", zIndex: 1000 }}
              >
                <Link href="/Pages/Profile" className="dropdown-item">
                  <i className="bi bi-person me-2"></i> Profile
                </Link>
                <button onClick={() => alert("Logout logic here")} className="dropdown-item text-danger">
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Content */}
        <div className="p-4">
          <div className="row d-flex align-items-start justify-content-between mb-4">
            <div className="col-md-8">
              <h2 className="mb-4">Dashboard Overview</h2>
            </div>
            <div className="col-md-4">
              <select className="form-control">
                <option value="">Select Category</option>
                <option value="category 1">Category 1</option>
                <option value="category 2">Category 2</option>
                <option value="category 3">Category 3</option>
              </select>
            </div>
          </div>

          {/* Example stats cards */}
          <div className="row g-4">
            {[
              { title: "Total Listings", value: 23 },
              { title: "New Messages", value: 5 },
              { title: "Profile Views", value: 128 },
            ].map((item, i) => (
              <div key={i} className="col-md-4">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text display-6">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
