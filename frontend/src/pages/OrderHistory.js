// src/components/OrderHistory.js

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SummaryApi from '../common';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchOrders = async () => {
        try {
            const response = await fetch(SummaryApi.orders.url, {
                method: 'SummaryApi.orders.method',
                headers: {
                    'Content-Type': 'application/json',
                    // Add Authorization token if needed
                    // 'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                setOrders(data.orders);
            } else {
                setError(data.message || "Failed to fetch orders.");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError("An error occurred while fetching orders.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) return <p className="text-center text-blue-600">Loading orders...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className="max-w-2xl mx-auto p-8 shadow-lg rounded-lg bg-white">
            <h2 className="text-2xl font-semibold mb-4 text-center text-purple-600">Order History</h2>
            {orders.length === 0 ? (
                <p className="text-center text-gray-600">No orders found.</p>
            ) : (
                <ul className="space-y-4">
                    {orders.map((order, index) => (
                        <li key={index} className="p-4 border rounded">
                            <h3 className="font-medium">{order.title}</h3>
                            <p><strong>Name:</strong> {order.fullName}</p>
                            <p><strong>Email:</strong> {order.email}</p>
                            <p><strong>Phone:</strong> {order.phone}</p>
                            <p><strong>Address:</strong> {order.streetAddress}, {order.city}, {order.state}, {order.postalCode}</p>
                            <p><strong>Amount:</strong> {order.amount} ETB</p>
                            <p><strong>Quantity:</strong> {order.quantity}</p>
                            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                            {/* Add more details as needed */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderHistory;
