import {adminRoutes} from './adminRoutes'
import {areamanagerRoutes} from './areamanagerRoutes'
import {sellerRoutes} from './sellerRoutes'

export const privateRoutes = [
    ...adminRoutes,
    ...areamanagerRoutes,
    ...sellerRoutes
]