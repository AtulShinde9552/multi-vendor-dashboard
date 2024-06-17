import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { base_url } from '../../utils/config'

export const get_seller_request = createAsyncThunk(
    'seller/get_seller_request',
    async ({ parPage, page, searchValue }, { rejectWithValue,getState, fulfillWithValue }) => {
        const { token } = getState().auth

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }

        try {
            const { data } = await axios.get(`${base_url}/api/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_seller = createAsyncThunk(
    'seller/get_seller',
    async (sellerId, { rejectWithValue,getState, fulfillWithValue }) => {
        const { token } = getState().auth

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        try {
            const { data } = await axios.get(`${base_url}/api/get-seller/${sellerId}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// export const seller_status_update = createAsyncThunk(
//     'seller/seller_status_update',
//     async (info, { rejectWithValue,getState, fulfillWithValue }) => {

//         const { token } = getState().auth

//         const config = {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//             }
//         }

//         try {
//             const { data } = await axios.post(`${base_url}/api/seller-status-update`, info, config)
//             return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

export const update_seller_data = createAsyncThunk(
    'seller/update_seller_data',
    async (info, { rejectWithValue,getState, fulfillWithValue }) => {

        const { token } = getState().auth

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }

        try {
            const { data } = await axios.post(`${base_url}/api/update_seller_data`, info, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const get_active_sellers = createAsyncThunk(
    'seller/get_active_sellers',
    async ({ parPage, page, searchValue }, { rejectWithValue,getState, fulfillWithValue }) => {

        const { token } = getState().auth

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }

        try {
            const { data } = await axios.get(`${base_url}/api/get-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const get_deactive_sellers = createAsyncThunk(
    'seller/get_active_sellers',
    async ({ parPage, page, searchValue }, { rejectWithValue,getState, fulfillWithValue }) => {

        const { token } = getState().auth

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }

        try {
            const { data } = await axios.get(`${base_url}/api/get-deactive-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const create_stripe_connect_account = createAsyncThunk(
    'seller/create_stripe_connect_account',
    async () => {
        try {
            const { data: { url } } = await axios.get(`${base_url}/api/payment/create-stripe-connect-account`, { withCredentials: true })
            window.location.href = url
           // return fulfillWithValue(data)
        } catch (error) {
            //return rejectWithValue(error.response.data)
        }
    }
)

export const active_stripe_connect_account = createAsyncThunk(
    'seller/active_stripe_connect_account',
    async (activeCode, { rejectWithValue,getState, fulfillWithValue }) => {
        try {
            const { data } = await axios.put(`${base_url}/api/payment/active-stripe-connect-account/${activeCode}`,{ withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)





export const sellerReducer = createSlice({
    name: 'seller',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        sellers: [],
        totalSeller: 0,
        seller: ''
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: {
        [get_seller_request.fulfilled]: (state, { payload }) => {
            state.sellers = payload.sellers
            state.totalSeller = payload.totalSeller
        },
        [get_seller.fulfilled]: (state, { payload }) => {
            state.seller = payload.seller
        },
        [update_seller_data.fulfilled]: (state, { payload }) => {
            state.seller = payload.seller
            state.successMessage = payload.message
        },
        [get_active_sellers.fulfilled]: (state, { payload }) => {
            state.sellers = payload.sellers
            state.totalSeller = payload.totalSeller
        },
        [active_stripe_connect_account.pending]: (state, { payload }) => {
            state.loader = true
        },
        [active_stripe_connect_account.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.message
        },
        [active_stripe_connect_account.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
        },
    }

})
export const { messageClear } = sellerReducer.actions
export default sellerReducer.reducer