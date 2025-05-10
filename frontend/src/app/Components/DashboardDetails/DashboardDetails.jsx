import React from 'react'

const DashboardDetails = () => {
    const users = [
        {
            id: 1,
            userName: 'John Doe',
            contactNumber: '1234567890',
            date: '2025-05-09',
            dateTime: '2025-05-09 10:30 AM',
        },
        {
            id: 2,
            userName: 'Jane Smith',
            contactNumber: '9876543210',
            date: '2025-05-08',
            dateTime: '2025-05-08 04:45 PM',
        },
        // Add more users as needed
    ];

    return (
        <>
            <section className='listings-details'>
                <div className="container mt-4">
                    <h2 className="mb-4">User Table</h2>
                    <table className="table table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>User Name</th>
                                <th>Contact Number</th>
                                <th>Date</th>
                                <th>Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.contactNumber}</td>
                                    <td>{user.date}</td>
                                    <td>{user.dateTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default DashboardDetails