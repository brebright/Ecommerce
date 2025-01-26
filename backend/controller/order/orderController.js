
// const Order = require('../../models/order')
// const Allorders = async(req,res) =>{
//     try {
//         const orders = await Order.find();
//         res.json(orders);
//       } catch (err) {
//         res.status(500).json({ message: err.message });
//       }
// }


// const sendorder = async (req,res) =>{
//   const orderDetails = req.body;

//     try {
//         // Save order to the database
//         const newOrder = new Order(orderDetails);
//         await newOrder.save();
//         res.json({ success: true, message: "Order placed successfully." });
//     } catch (error) {
//         console.error("Error saving order:", error);
//         res.status(500).json({ success: false, message: "Error placing order." });
//     }
// }


// const order = async (req,res) =>{
//   const orderDetails = req.body;

//   try {
//       // Save order to the database
//       const newOrder = new Order(orderDetails);
//       await newOrder.save();
//       res.json({ success: true, message: "Order placed successfully." });
//   } catch (error) {
//       console.error("Error saving order:", error);
//       res.status(500).json({ success: false, message: "Error placing order." });
//   }
// }

// const deleteOrder =async (req,res) =>{
//   try {
//       const { status } = req.body; 
//       const order = await Order.findByIdAndDelete(req.params.id, { status }, { new: true });
      
//       if (!order) {
//         return res.status(404).json({ message: 'Order not found' });
//       }
  
//       res.json(order);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   }
// const updateOrder =async (req,res) =>{
//     try {
//         const { status } = req.body; 
//         const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        
//         if (!order) {
//           return res.status(404).json({ message: 'Order not found' });
//         }
    
//         res.json(order);
//       } catch (err) {
//         res.status(400).json({ message: err.message });
//       }
// }


// module.exports = { sendorder, order, Allorders,updateOrder, deleteOrder };
