import React, { useState, useEffect } from 'react';

const AdminEditOrder = ({ orderData, onClose, fetchOrders }) => {
  // Use optional chaining to handle undefined `orderData` safely
  const [updatedOrder, setUpdatedOrder] = useState({
    status: orderData?.status || 'Pending',
    shippingAddress: orderData?.shippingAddress || '',
    paymentStatus: orderData?.paymentStatus || 'Unpaid',
  });

  // Update the order fields based on input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  // Handle order update and call `fetchOrders` if available
  const handleUpdateOrder = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/${orderData?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });

      if (response.ok) {
        alert('Order updated successfully');
        fetchOrders?.(); // Re-fetch orders if `fetchOrders` is provided
        onClose(); // Close the modal
      } else {
        alert('Failed to update the order');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('An error occurred while updating the order');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Order</h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Order Status</label>
          <select
            name="status"
            value={updatedOrder.status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Shipping Address</label>
          <textarea
            name="shippingAddress"
            value={updatedOrder.shippingAddress}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Payment Status</label>
          <select
            name="paymentStatus"
            value={updatedOrder.paymentStatus}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleUpdateOrder}
          >
            Update Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditOrder;
