const Order = require('./models/order')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const nodemailer = require('nodemailer');
const connectDB = require('./config/db')
const router = require('./routes')
const productModel = require('./models/productModel')
const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URI,
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' }));


app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api",router)

app.post('/api/orders', async(req, res) => {

    const {userId, products,title,amount, email, phone, address, items } = req.body;
    for (const item of products) {
        const product = await productModel.findById(item.productId);
        if (product.stockQuantity < item.quantity) {
            return res.status(400).json({ message: 'Insufficient stock for ' + product.name });
        }
    }
    const order = new Order({ userId, products, totalAmount });
    await order.save();

  for (const item of products) {
        await Product.findByIdAndUpdate(item.productId, {
            $inc: { stockQuantity: -item.quantity }
        });
    }
    console.log('Order received:', { title, amount, email, phone, address, items });

 
    res.status(201).json({ message: 'Order created successfully!' });
});

app.patch('/api/orders/:id', async (req, res) => {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
});
const PORT = 8080 || process.env.PORT 
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Mongo DB connected successfully")
        console.log("Server is running "+PORT)
    })
})

