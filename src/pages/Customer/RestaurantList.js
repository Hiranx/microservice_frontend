import React, { useState, useEffect } from 'react';
import { getAllRestaurants } from '../../apiRestaurant/restaurantApi';
import RestaurantCard from '../../components/customer/RestaurantCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const data = await getAllRestaurants();
                const approvedRestaurants = data.filter(restaurant => restaurant.approved);
                setRestaurants(approvedRestaurants);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants().catch(err => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <LoadingSpinner />
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Error Loading Restaurants</h2>
                <p className="text-red-500 text-center">{error}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Restaurants</h1>
                    <p className="text-gray-600">Browse and order from your favorite places</p>
                </div>

                {restaurants.length === 0 ? (
                    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm text-center">
                        <p className="text-gray-600 mb-4">No approved restaurants available at this time.</p>
                        <p className="text-gray-400">Please check back later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {restaurants.map((restaurant) => (
                            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantList;