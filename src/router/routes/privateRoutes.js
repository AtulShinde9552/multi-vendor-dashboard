import {adminRoutes} from './adminRoutes'
import {areamanagerRoutes} from './areamanagerRoutes'
import {sellerRoutes} from './sellerRoutes'
import { regionaladminRoutes } from './regionaladminRoutes'


export const privateRoutes = [
    ...adminRoutes,
    ...areamanagerRoutes,
    ...sellerRoutes,
    ...regionaladminRoutes
]