const productModel = require("../../models/productModel");

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id; // Get product ID from request parameters
        const deletedProduct = await productModel.findByIdAndDelete(productId); // Use productModel to find and delete the product

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: err.message || 'An error occurred while deleting the product',
        });
    }
};

module.exports = deleteProduct;
