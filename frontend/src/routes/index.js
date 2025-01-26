import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Signin from '../pages/Login'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import OrderConfirmation from '../screens/OrderConfirmationScreen'
import AccountManagement from '../components/AccountManagement'
import RequestReset from '../components/RequestReset'
import ResetPassword from '../components/ResetPassword'
import ForgotPassword from '../components/ForgotPasssword'
import Allorders from '../pages/Allorders'
import Checkout from '../components/Checkout'
import OrderHistory from '../pages/OrderHistory'


const router = createBrowserRouter([
    {
        // window.location.href = `/order-confirmation/${orderId}`;  // Redirect to confirmation page with orderId

        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Signin/>
            },
        
            {
                path : "forgot-password",
                element : <ForgotPassword/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "request-password-reset",
                element : <RequestReset/>
            },
            {
                path : "reset-password",
                element : <ResetPassword/>
            },
            {
                path : "ordersHistorry",
                element : <OrderHistory/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "account-management",
                element : <AccountManagement/>
            },
            {
                path : "checkout",
                element : <Checkout/>
            },

            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path: "/order-confirmation/:orderId",
                element : < OrderConfirmation/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path : "all-orders",
                        element : <Allorders/>
                    }
                ]
            },
        ]
    }
])


export default router