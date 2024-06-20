import { lazy } from 'react'
const RegionalAdminDashboard = lazy(() => import("../../views/RegionalAdmins/RegionalAdminDashboard"))
const AddZoneManager = lazy(() => import("../../views/RegionalAdmins/AddZoneManager"))
const AreaManagers = lazy(() => import("../../views/RegionalAdmins/AreaManagers"))

// const SellerDetails = lazy(() => import("../../views/areamanager/SellerDetails"))
// const AddSeller = lazy(() => import("../../views/areamanager/AddSeller"))
// const Category = lazy(() => import("../../views/areamanager/Category"))


export const regionaladminRoutes = [
    {
        path: 'regionaladmin/dashboard',
        element: <RegionalAdminDashboard />,
        role: 'regionaladmin'
    },

    {
        path: 'regionaladmin/dashboard/addzonemanager',
        element: <AddZoneManager />,
        role: 'regionaladmin'
    },
    {
        path: "regionaladmin/dashboard/areamanagers",
        element: <AreaManagers />,
        role: 'regionaladmin'
    },
]