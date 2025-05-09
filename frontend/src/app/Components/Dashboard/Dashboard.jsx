import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";

const Dashboard = ({ businessListing }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [singleData, setSingleData] = useState(businessListing.length > 0 ? businessListing[0]?._id : []);
  const [totalProfileViews, setTotalProfileViews] = useState(0);
  const menuRef = useRef();
  console.log("businessListing:---", businessListing)
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredData = businessListing?.find((item) => item?._id === singleData);

  const clickCountsArray = filteredData?.clickCounts
    ? Object.entries(filteredData.clickCounts).map(([key, { count, user }]) => ({
        title: key.charAt(0).toUpperCase() + key.slice(1), // Capitalized title
        count,
        user    
      }))
    : [];


  const totalListings = businessListing.reduce((acc, item) => {
    return acc + (item?.clickCounts?.listings.count || 0);
  }, 0);



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
              <select value={singleData} onChange={(e) => setSingleData(e.target.value)} className="form-control">
                <option value="">Select Category</option>
                {businessListing?.map((item, i) => (
                  <option key={i} value={item?._id}>{item?.businessDetails?.businessName}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Example stats cards */}
          <div className="row g-4">
            <div key={"Total Profile Views"} className="col-md-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">Total Profile Views</h5>
                  <p className="card-text display-6">{totalListings}</p>
                </div>
              </div>
            </div>
            {clickCountsArray?.map((item, i) => (
              <div key={i} className="col-md-4">
                {item.title === '_id' ? '' :
                  <div className="card shadow-sm border-0">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text display-6">{item.count}</p>
                    </div>
                    <div style={{ marginLeft: "auto", cursor: "pointer",color: "#0d6efd" }}>View All</div>
                  </div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
