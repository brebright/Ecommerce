// Update Stock
const productModel = require("../../models/productModel");

const updateStock = async (req,res)=> {
    const { quantity } = req.body;
    try {
        const product = await Product.findById(req.params.id);
        product.quantity = quantity;
        await product.save();
        res.json(product);
      } catch (error) {
        res.status(400).json({ message: 'Error updating stock', error });
      }

}
module.exports = updateStock



    
   
