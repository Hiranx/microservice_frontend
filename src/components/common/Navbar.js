import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    const handleAdminAccess = () => {
        if (userRole === 'ADMIN') {
            navigate('/admin');
        } else {
            alert('You are unauthorized person');
        }
    };

    const handleOwnerAccess = () => {
        if (userRole === 'RESTAURANT_OWNER') {
            navigate('/manage');
        } else {
            alert('You are unauthorized person');
        }
    };

    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Restaurant App</Link>

                <div className="flex space-x-4">
                    <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">Home</Link>

                    {isAuthenticated && (
                        <>
                            <button
                                onClick={handleAdminAccess}
                                className="hover:bg-blue-700 px-3 py-2 rounded"
                            >
                                Admin
                            </button>

                            <button
                                onClick={handleOwnerAccess}
                                className="hover:bg-blue-700 px-3 py-2 rounded"
                            >
                                Manage Restaurant
                            </button>
                        </>
                    )}

                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="hover:bg-blue-700 px-3 py-2 rounded"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">Login</Link>
                            <Link to="/register" className="hover:bg-blue-700 px-3 py-2 rounded">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
