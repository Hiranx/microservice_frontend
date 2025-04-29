import React from 'react';
import { Link } from 'react-router-dom';

const DeliveryNavbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex space-x-4">
                <Link to="/create-delivery" className="text-white hover:underline">Create Delivery</Link>
                <Link to="/deliveries" className="text-white hover:underline">View Deliveries</Link>
                <Link to="/driver" className="text-white hover:underline">Driver Dashboard</Link>
                <Link to="/drivers/availability" className="text-white hover:underline">Update Driver Availability</Link>
            </div>
        </nav>
    );
};

export default DeliveryNavbar;
