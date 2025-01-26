import React, { useState } from 'react';
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import displayETBCurrency from '../helpers/displayCurrency';

const AdminOrderCard = ({ data, fetchOrders, setOpenEditOrder }) => {
  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
          method: 'delete',
        });

        if (response.ok) {
          alert('Order deleted successfully');
          fetchOrders(); // Refetch orders after deletion
        } else {
          alert('Failed to delete the order');
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('An error occurred while deleting the order');
      }
    }
  };

  return (
    <div className='bg-white p-4 rounded'>
      <div className='relative w-40'>
        <div className='relative w-32 h-32 flex justify-center items-center'>
          <img src={data?.orderImage} className='mx-auto object-fill h-full' alt="Order" />
        </div>

        {/* Delete Icon */}
        <div
          className='absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 hover:opacity-100 cursor-pointer transition-opacity duration-300'
          onClick={() => handleDeleteOrder(data._id)}
        >
          <MdDelete size={20} />
        </div>

        {/* Order Info */}
        <h1 className='text-ellipsis line-clamp-2'>{data._id}</h1>
        <p className='font-semibold'>{displayETBCurrency(data.totalAmount)}</p>

        {/* Edit Icon */}
        <div
          className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'
          onClick={() => setOpenEditOrder(data)}
        >
          <MdModeEditOutline />
        </div>
      </div>
    </div>
  );
};

export default AdminOrderCard;
