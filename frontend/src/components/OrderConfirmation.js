import React, { useEffect, useState } from 'react';

const OrderConfirmation = ({ match }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const response = await fetch(`/api/orders/${match.params.orderId}`);
      const data = await response.json();
      setOrderDetails(data);
    };

    fetchOrderDetails();
  }, [match.params.orderId]);

  if (!orderDetails) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Thank you for your purchase! Your order has been successfully placed.</p>
      <p><strong>Order Number:</strong> {orderDetails._id}</p>
      <p><strong>Transaction ID:</strong> {orderDetails.transactionId}</p>
      <p><strong>Total Amount:</strong> ${orderDetails.amountPaid}</p>
      <p>A receipt has been sent to your email.</p>
    </div>
  );
};

export default OrderConfirmation;
