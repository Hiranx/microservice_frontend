import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import RestaurantOwnerNavBar from "./RestaurantOwnerNavBar";

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <RestaurantOwnerNavBar />
            <main className="container mx-auto px-4 py-8">
                <Outlet /> {/* This renders the matched child route */}
            </main>
        </div>
    );
};

export default Layout;