
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminOrderCard from '../components/AdminOrderCard'; // Order card component
import AdminEditOrder from '../components/AdminEditOrder'; // Edit Order component
import { fetchOrdersFromAPI } from '../store/orderslice';

const AllOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orderList); // Access the order list from Redux
  const loading = useSelector((state) => state.orders.loading); // Access loading state from Redux
  const error = useSelector((state) => state.orders.error); // Access error state from Redux
  const [filteredOrders, setFilteredOrders] = useState(orders); // State for filtered orders
  const [filterStatus, setFilterStatus] = useState('All'); // State for selected filter status
  const [openEditOrder, setOpenEditOrder] = useState(null); // State to open/close edit modal

  useEffect(() => {
    // Dispatch action to fetch orders on component mount
    dispatch(fetchOrdersFromAPI());
  }, [dispatch]);

  useEffect(() => {
    console.log("Orders list updated:", orders);
    if (filterStatus === 'All') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => order.status === filterStatus);
      setFilteredOrders(filtered);
    }
  }, [orders, filterStatus]);
  

  // Filter orders based on selected status
  const filterOrders = (status) => {
    setFilterStatus(status);
  };

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center overflow-hidden'>
        <h2 className='font-bold text-lg'>Orders List</h2>

        {/* Dropdown to filter orders by status */}
        <div>
          <select
            className='border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all py-1 px-3 rounded-full'
            value={filterStatus}
            onChange={(e) => filterOrders(e.target.value)} // Filter orders when dropdown changes
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Handle loading and error states */}
      {loading && <p className="text-center">Loading orders...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {/* List of filtered orders */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {filteredOrders && filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <AdminOrderCard 
              data={order} 
              key={index + "orderList"} 
              setOpenEditOrder={setOpenEditOrder} // To open edit order modal
            />
          ))
        ) : (
          <p className="text-center w-full">No orders found for {filterStatus} status</p>
        )}
      </div>

      {/* Modal for editing the order */}
      {openEditOrder && (
        <AdminEditOrder 
          orderData={openEditOrder} // Pass the order data to be edited
          onClose={() => setOpenEditOrder(null)} 
        />
      )}
    </div>
  );
};

export default AllOrders;




