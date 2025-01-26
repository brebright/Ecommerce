const OrderSummary = ({ cartItems, shippingAddress, totalPrice }) => (
    <div>
      <h2>Order Summary</h2>
      <p><strong>Shipping Address:</strong> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}</p>
      <ul>
        {cartItems.map(item => (
          <li key={item._id}>{item.name} x {item.quantity} = ${item.price}</li>
        ))}
      </ul>
      <h3>Total: ${totalPrice}</h3>
    </div>
  );
  
  export default OrderSummary;
  