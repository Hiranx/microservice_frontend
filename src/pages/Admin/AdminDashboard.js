// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { getPendingRestaurants, updateApprovalStatus } from '../../apiRestaurant/adminApi';
import { getRestaurantOrders, updateOrderStatus } from '../../apiRestaurant/orderApi';
import PendingRestaurantRow from '../../components/admin/PendingRestaurantRow';
import OrderRow from '../../components/admin/OrderRow';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AdminDashboard = () => {
    const [pendingRestaurants, setPendingRestaurants] = useState([]);
    const [restaurantOrders, setRestaurantOrders] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('approvals'); // 'approvals' or 'orders'

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (activeTab === 'approvals') {
                    const data = await getPendingRestaurants();
                    setPendingRestaurants(data);
                } else if (selectedRestaurant) {
                    const data = await getRestaurantOrders(selectedRestaurant);
                    setRestaurantOrders(data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [activeTab, selectedRestaurant]);

    const handleApproval = async (id, approved) => {
        try {
            await updateApprovalStatus(id, approved);
            setPendingRestaurants(pendingRestaurants.filter(restaurant => restaurant.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            setRestaurantOrders(restaurantOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500 text-center mt-8">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex mb-6 border-b">
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'approvals' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('approvals')}
                >
                    Pending Approvals
                </button>
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'orders' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('orders')}
                >
                    Manage Orders
                </button>
            </div>

            {activeTab === 'approvals' ? (
                <>
                    <h1 className="text-2xl font-bold mb-6">Pending Restaurant Approvals</h1>
                    {pendingRestaurants.length === 0 ? (
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <p>No pending restaurant approvals</p>
                        </div>
                    ) : (
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {pendingRestaurants.map((restaurant) => (
                                    <PendingRestaurantRow
                                        key={restaurant.id}
                                        restaurant={restaurant}
                                        onApprove={handleApproval}
                                    />
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-6">Restaurant Orders</h1>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Restaurant</label>
                        <select
                            className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/3"
                            value={selectedRestaurant || ''}
                            onChange={(e) => setSelectedRestaurant(e.target.value)}
                        >
                            <option value="">Select a restaurant</option>
                            {/* You might want to fetch approved restaurants here */}
                            <option value="1">Restaurant 1</option>
                            <option value="2">Restaurant 2</option>
                        </select>
                    </div>

                    {selectedRestaurant ? (
                        restaurantOrders.length === 0 ? (
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <p>No orders found for this restaurant</p>
                            </div>
                        ) : (
                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {restaurantOrders.map((order) => (
                                        <OrderRow
                                            key={order.id}
                                            order={order}
                                            onStatusChange={handleStatusChange}
                                        />
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    ) : (
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <p>Please select a restaurant to view orders</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminDashboard;