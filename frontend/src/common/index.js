const backendDomain = "http://localhost:8080"
const SummaryApi = {
    signUP : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    checkOut : {
        url : `${backendDomain}/api/create/order`,
        method : "post"
             },
    signIn : {
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
      getorder : {
        url : `${backendDomain}/api/allorders`,
          method : "get"
      },  

    current_user : {
        url : `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomain}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomain}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomain}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomain}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomain}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomain}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomain}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomain}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomain}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomain}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomain}/api/filter-product`,
        method : 'post'
    },
    deleteProduct : {
        url : `${backendDomain}/api/productss`,
        method : 'delete'
    }
}
export default SummaryApi