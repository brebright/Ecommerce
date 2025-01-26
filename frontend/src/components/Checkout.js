import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setOrders } from '../store/orderslice';
import { selectCurrentUser } from '../store/userSlice';
import { clearCart } from '../store/cartSlice';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const { totalAmount = 0, totalQuantity = 0 } = useLocation().state || {};

    const [title, setTitle] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Total Quantity:", totalQuantity);
        console.log("Total Price:", totalAmount);
    }, [totalQuantity, totalAmount]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^(\+251|0)(\d{9})$/;
        return phoneRegex.test(phone);
    };

    const validateForm = () => {
        if (!fullName || !title || !streetAddress || !city || !state || !postalCode) {
            setMessage("All fields are required.");
            return false;
        }
        if (!validateEmail(email)) {
            setMessage("Please enter a valid email address.");
            return false;
        }
        if (!validatePhone(phone)) {
            setMessage("Please enter a valid phone number.");
            return false;
        }
        return true;
    };

    const displayETBCurrency = (amount) => `ETB ${typeof amount === 'number' && !isNaN(amount) ? amount.toFixed(2) : '0.00'}`;

    const startPay = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setMessage('');

        const paymentDetails = {
            phone,
            amount: totalAmount,
            first_name: fullName.split(' ')[0], // Get first name
            last_name: fullName.split(' ')[1] || '', // Get last name if exists
            email,
            title, // Optional: Order title
        };

        try {
            // Step 1: Initialize payment with Chapa
            const response = await fetch('http://localhost:4000/stk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentDetails),
            });

            const paymentResponse = await response.json();

            if (response.ok) {
                // Assuming paymentResponse contains a redirect URL
                // Redirect to Chapa payment page
                window.location.href = paymentResponse.paymentUrl; // Change based on actual response structure
            } else {
                setMessage("Payment initialization failed: " + paymentResponse.message);
            }

        } catch (error) {
            console.error('Error during payment initialization:', error);
            setMessage("An error occurred during payment initialization.");
        } finally {
            setLoading(false);
        }
    };

    const placeOrder = async () => {
        const orderDetails = {
            userId: currentUser.id,
            items: [], // You should populate this with the items in the cart
            totalAmount,
            shippingDetails: {
                fullName,
                email,
                phone,
                streetAddress,
                city,
                state,
                postalCode,
            },
            // Add any other order-related details you need
        };

        try {
            const response = await fetch('http://localhost:8080/create/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setOrders(data)); // Update your Redux store with new order
                dispatch(clearCart()); // Clear the cart after placing the order
                navigate('/confirmation'); // Navigate to confirmation page
            } else {
                console.error('Failed to place order:', await response.json());
                setMessage("Failed to place order. Please try again.");
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setMessage("An error occurred while placing the order.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 shadow-lg rounded-lg bg-white">
            <h2 className="text-2xl font-semibold mb-4 text-center text-purple-600">Checkout</h2>
            <form className="space-y-4">
                <div>
                    <label className="block font-medium text-gray-700">Order Title</label>
                    <input
                        type="text"
                        className="w-full mt-1 p-2 border rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        className="w-full mt-1 p-2 border rounded"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full mt-1 p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Phone</label>
                    <input
                        type="tel"
                        className="w-full mt-1 p-2 border rounded"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Street Address</label>
                    <input
                        type="text"
                        className="w-full mt-1 p-2 border rounded"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">City</label>
                    <input
                        type="text"
                        className="w-full mt-1 p-2 border rounded"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">State/Region</label>
                    <input
                        type="text"
                        className="w-full mt-1 p-2 border rounded"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Postal Code</label>
                    <input
                        type="text"
                        className="w-full mt-1 p-2 border rounded"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Total Quantity</span>
                    <span className="text-lg font-semibold">{totalQuantity}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Total Amount</span>
                    <span className="text-lg font-semibold">{displayETBCurrency(totalAmount)}</span>
                </div>
                <div className="flex gap-2 mt-6">


                <button
                        type="button"
                        onClick={startPay}
                        className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                    >
                        Pay Now
                    </button>
                </div>
            </form>
            {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
            {loading && <p className="mt-4 text-blue-600 text-center">Processing payment...</p>}
        </div>
    );
};

export default Checkout;
