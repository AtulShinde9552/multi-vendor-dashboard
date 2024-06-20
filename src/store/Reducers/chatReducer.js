import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { base_url } from '../../utils/config'

export const get_customers = createAsyncThunk(
    'chat/get_customers',
    async (sellerId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.get(`${base_url}/api/chat/seller/get-customers/${sellerId}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_customer_message = createAsyncThunk(
    'chat/get_customer_message',
    async (customerId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.get(`${base_url}/api/chat/seller/get-customer-message/${customerId}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const send_message = createAsyncThunk(
    'chat/send_message',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.post(`${base_url}/api/chat/seller/send-message-to-customer`, info, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const get_regionaladmin = createAsyncThunk(
    'chat/get_regionaladmin',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.get(`${base_url}/api/chat/admin/get_regionaladmin`, { withCredentials: true })
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const send_message_regionaladmin_admin = createAsyncThunk(
    'chat/message-send-regionaladmin-admin',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.post(`${base_url}/api/chat/message-send-regionaladmin-admin`, info, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const get_admin_message = createAsyncThunk(
    'chat/get_admin_message',
    async (receverId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.get(`${base_url}/api/chat/get-admin-messages/${receverId}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_regionaladmin_message = createAsyncThunk(
    'chat/get_regionaladmin_message',
    async (receverId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.get(`${base_url}/api/chat/get-regionaladmin-messages`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)




export const chatReducer = createSlice({
    name: 'seller',
    initialState: {
        successMessage: '',
        errorMessage: '',
        customers: [],
        messages: [],
        activeCustomer: [],
        activeregionaladmin: [],
        messageNotification: [],
        activeAdmin: "",
        friends: [],
        regionaladmin_admin_message: [],
        currentRegionaladmin: {},
        currentCustomer: {},
        regionaladmins: []
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
        updateMessage: (state, { payload }) => {
            state.messages = [...state.messages, payload]
        },
        updateCustomer: (state, { payload }) => {
            state.activeCustomer = payload
        },
        updateSellers: (state, { payload }) => {
            state.activeregionaladmin = payload
        },
        updateAdminMessage: (state, { payload }) => {
            state.regionaladmin_admin_message = [...state.regionaladmin_admin_message, payload]
        },
        updateSellerMessage: (state, { payload }) => {
            state.regionaladmin_admin_message = [...state.regionaladmin_admin_message, payload]
        },
        activeStatus_update: (state, { payload }) => {
            state.activeAdmin = payload.status
        }
    },
    extraReducers: {

        [get_customers.fulfilled]: (state, { payload }) => {
            state.customers = payload.customers
        },
        [get_customer_message.fulfilled]: (state, { payload }) => {
            state.messages = payload.messages
            state.currentCustomer = payload.currentCustomer
        },
        [send_message.fulfilled]: (state, { payload }) => {
            let tempFriends = state.customers
            let index = tempFriends.findIndex(f => f.fdId === payload.message.receverId)
            while (index > 0) {
                let temp = tempFriends[index]
                tempFriends[index] = tempFriends[index - 1]
                tempFriends[index - 1] = temp
                index--
            }
            state.customers = tempFriends
            state.messages = [...state.messages, payload.message]
            state.successMessage = ' message send success'
        },
        [get_regionaladmin.fulfilled]: (state, { payload }) => {
            state.regionaladmins = payload.regionaladmins
        },
        [send_message_regionaladmin_admin.fulfilled]: (state, { payload }) => {
            state.regionaladmin_admin_message = [...state.regionaladmin_admin_message, payload.message]
            state.successMessage = 'message send success'
        },
        [get_admin_message.fulfilled]: (state, { payload }) => {
            state.regionaladmin_admin_message = payload.messages
            state.currentRegionaladmin = payload.currentRegionaladmin
        },
        [get_regionaladmin_message.fulfilled]: (state, { payload }) => {
            state.regionaladmin_admin_message = payload.messages
        },
    }

})
export const { messageClear, updateMessage, updateCustomer, updateRegionaladmin, updateAdminMessage, updateRegionaladminMessage, activeStatus_update } = chatReducer.actions
export default chatReducer.reducer