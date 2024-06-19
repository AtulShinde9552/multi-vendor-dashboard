import { lazy } from 'react'

// const Orders = lazy(() => import("../../views/admin/Orders"))
// const Category = lazy(() => import("../../views/admin/Category"))
// const PaymentRequest = lazy(() => import("../../views/admin/PaymentRequest"))
// const ChatSeller = lazy(() => import("../../views/admin/ChatSeller"))
// const OrderDetails = lazy(() => import("../../views/admin/OrderDetails"))
const DeactiveSellers = lazy(() => import("../../views/areamanager/DeactiveSellers"))
// const SellerRequest = lazy(() => import("../../views/areamanager/SellerRequest"))
// const AreaManagerDashboard = lazy(() => import("../../views/areamanager/AreaManagerDashboard"))
const Sellers = lazy(() => import("../../views/areamanager/Sellers"))
const SellerDetails = lazy(() => import("../../views/areamanager/SellerDetails"))
const AddSeller = lazy(() => import("../../views/areamanager/AddSeller"))
const Category = lazy(() => import("../../views/areamanager/Category"))
const AddShop = lazy(() => import("../../views/areamanager/AddShopInfo"))



export const areamanagerRoutes = [
    // {
    //     path: 'areamanager/dashboard',
    //     element: <AreaManagerDashboard />,
    //     role: 'areamanager'
    // },

    {
        path: 'areamanager/dashboard/category',
        element: <Category />,
        role: 'areamanager'
    },

    {
        path: 'areamanager/dashboard/sellers',
        element: <Sellers />,
        role: 'areamanager'
    },

    {
        path: 'areamanager/dashboard/deactive-sellers',
        element: <DeactiveSellers />,
        role: 'areamanager'
    },
    {
        path: 'areamanager/dashboard/add-seller',
        element: <AddSeller />,
        role: 'areamanager'
    },
    {
        path: 'areamanager/dashboard/seller/details/:sellerId',
        element: <SellerDetails />,
        role: 'areamanager'
    },
    {
        path: 'areamanager/dashboard/addshopinfo',
        element: <AddShop />,
        role: 'areamanager'
    },
]