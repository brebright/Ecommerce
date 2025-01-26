const OrderConfirmation = ({ order }) => (
    <div>
      <h2>Thank you for your purchase!</h2>
      <p>Your order number is {order._id}</p>
      <p>A confirmation email has been sent to your email address.</p>
    </div>
  );
  
  export default OrderConfirmation;
  