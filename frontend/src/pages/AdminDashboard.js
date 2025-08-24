import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <Navbar />
            <h1>Admin Dashboard</h1>
            {user && user.role === 'admin' ? (
                <div>
                    <h2>Welcome, {user.name}</h2>
                    <p>Here you can manage applicants and assignments.</p>
                    {/* Additional admin functionalities can be added here */}
                </div>
            ) : (
                <h2>You do not have permission to view this page.</h2>
            )}
        </div>
    );
};

export default AdminDashboard;