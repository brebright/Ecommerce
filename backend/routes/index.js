const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
// const orderCntroller = require('../controller/user/orderController')
const applyToken = require('../controller/user/applyToken')
const deleteProduct = require('../controller/product/deleteProduct')
const { changePassword, changeEmail, deleteAccount } = require('../controller/user/accountController')
const RequestPasswordReset = require('../controller/user/RequestPasswordReset')
const resetPassword = require('../controller/user/resetPassword')
const deleteUser = require('../controller/user/deleteUser')
const updateStock = require('../controller/product/updateStock')
const {order, Allorders, updateOrder, deleteOrder } = require('../controller/order/orderController')
// const { addToCart, getCart } = require('../controller/cart/cartController')

// router.post("/payment/confirmation" , paymentroute)
router.post('/reset-password', resetPassword)


// router.post('/addToCart' , addToCart )
// router.get ('/getCart' , getCart)

// router.get('/allorders', Allorders)
// router.patch('/updateorder/:id', updateOrder)
// router.delete('/deleteorder', deleteOrder)
// // router.post('/orders', order)
// router.post ("/sendorder",order)

router.post('/token',applyToken)
router.delete('/userDelete/:id', deleteUser)

router.delete('/products/:id', deleteProduct)
router.put('/api/products/:id', updateStock)
router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)
router.post('/request-password-reset', RequestPasswordReset)
//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)
//delete user
router.patch('/change-password', authToken, changePassword);
router.patch('/change-email', authToken,changeEmail);
router.delete('/delete-account', authToken, deleteAccount);

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

module.exports = router