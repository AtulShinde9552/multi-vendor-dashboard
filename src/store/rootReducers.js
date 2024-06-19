import authReducer from './Reducers/authReducer'
import categoryReducer from './Reducers/categoryReducer'
import productReducer from './Reducers/productReducer'
import sellerReducer from './Reducers/sellerReducer'
import areamanagerReducer from './Reducers/areamanagerReducer'
import regionaladminReducer from './Reducers/regionaladminReducer'
import chatReducer from './Reducers/chatReducer'
import OrderReducer from './Reducers/OrderReducer'
import PaymentReducer from './Reducers/PaymentReducer'
import dashboardIndexReducer from './Reducers/dashboardIndexReducer'
import bannerReducer from './Reducers/bannerReducer'
const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    seller: sellerReducer,
    areamanager: areamanagerReducer,
    regionaladmin: regionaladminReducer,
    chat: chatReducer,
    order: OrderReducer,
    payment: PaymentReducer,
    dashboardIndex: dashboardIndexReducer,
    banner : bannerReducer
}
export default rootReducer