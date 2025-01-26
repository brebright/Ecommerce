// server/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming you have a User model
    title: { type: String, required: true },
    products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
    status: { type: String, default: 'pending' },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    amount: { type: Number, required: true },
    quantity: { type: Number, required: true },
    paymentStatus: { type: String, default: 'unpaid' },
    orderDate: { type: Date, default: Date.now },
    paymentMethod: { type: String, required: true }, // 'telebirr', 'mpesa', or 'chapa'
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
