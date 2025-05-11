import React from 'react';
import moment from 'moment'; // Optional: for date formatting

const DashboardDetails = ({ type }) => {
    const users = type?.user || [];
    const title = type?.title || "Dashboard";

    if (!users.length) {
        return (
            <div className="container mt-4 text-center text-muted">
                <h5>No user data available.</h5>
            </div>
        );
    }

    return (
        <section className='listings-details'>
            <div className="container mt-4">
                <div className="card shadow-sm border-0 rounded-4">
                    <div className="card-header bg-primary text-white rounded-top-4">
                        <h4 className="mb-0">👥 {title} ({users.length})</h4>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover mb-0 align-middle" style={{ overflowX: 'scroll',overflowY:'scroll' }}>
                                <thead className="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Profile</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>City / State</th>
                                        <th>Status</th>
                                        <th>Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user._id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img
                                                    src={user.profileImage}
                                                    alt={user.fullName}
                                                    className="rounded-circle"
                                                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                />
                                            </td>
                                            <td>{user.fullName || "N/A"}</td>
                                            <td>{user.email || "N/A"}</td>
                                            <td>{user.phone || "N/A"}</td>
                                            <td>{user.city || "N/A"}, {user.state || "N/A"}</td>
                                            <td>
                                                <span className={`badge bg-${user.status === "Active" ? "success" : "secondary"}`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td>{moment(user.createdAt).format("DD MMM YYYY, h:mm A")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardDetails;
