

// const { updateOrderStatus } = require('../../services/createOrderService');

// async function paymentRoute(req, res) {
  

//   const { orderId, transactionId, paymentStatus, paymentAmount } = req.body;

//   try {
//     if (paymentStatus === 'SUCCESS') {
//       await updateOrderStatus(orderId, transactionId, paymentAmount, 'completed');
//       res.status(200).json({ message: "Payment confirmed" });
//     } else {
//       await updateOrderStatus(orderId, transactionId, paymentAmount, 'failed');
//       res.status(400).json({ message: "Payment failed" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// }

// module.exports = paymentRoute;
