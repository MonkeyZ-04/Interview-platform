import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/admin">Admin Dashboard</Link>
                </li>
                <li>
                    <Link to="/interviewer">Interviewer Page</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;