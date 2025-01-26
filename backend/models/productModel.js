const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName : String,
    brandName : String,
    category : String,
    productImage :[],
    description : String,
    stockQuantity: { type: Number, required: true },
    SKU: { type: String, 
        required: true, 
        unique: true },
    sellingPrice : Number


},{
    timestamps : true
})


const productModel = mongoose.model("product",productSchema)

module.exports = productModel