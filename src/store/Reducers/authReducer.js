import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import jwt from 'jwt-decode'
import axios from 'axios'
import { base_url } from '../../utils/config'

export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.post(`${base_url}/api/admin-login`, info)
            localStorage.setItem('accessToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const area_manager_login = createAsyncThunk(
    'auth/area_manager_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.post(`${base_url}/api/area_manager_login`, info)
            localStorage.setItem('accessToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const area_manager_register = createAsyncThunk(
    'auth/area_manager_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            console.log(info)
            const { data } = await axios.post(`${base_url}/api/area_manager_register`, info)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const seller_login = createAsyncThunk(
    'auth/seller_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.post(`${base_url}/api/seller-login`, info)
            localStorage.setItem('accessToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async ({ navigate, role }, { rejectWithValue, fulfillWithValue, getState }) => {

        const { token } = getState().auth

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }

        try {
            const { data } = await axios.get(`${base_url}/api/logout`, config)
            localStorage.removeItem('accessToken')
            if (role === 'admin') {
                navigate('/admin/login')
            } else {
                navigate('/login')
            }

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const seller_register = createAsyncThunk(
    'auth/seller_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            console.log(info)
            const { data } = await axios.post(`${base_url}/api/seller-register`, info)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const profile_image_upload = createAsyncThunk(
    'auth/profile_image_upload',
    async (image, { rejectWithValue, fulfillWithValue, getState }) => {

        const { token } = getState().auth

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }

        try {
            const { data } = await axios.post(`${base_url}/api/profile-image-upload`, image, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const profile_info_add = createAsyncThunk(
    'auth/profile_info_add',
    async (info, { rejectWithValue, fulfillWithValue, getState }) => {

        const { token } = getState().auth

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }

        try {
            const { data } = await axios.post(`${base_url}/api/profile-info-add`, info, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_user_info = createAsyncThunk(
    'auth/get_user_info',
    async (_, { rejectWithValue, fulfillWithValue, getState }) => {

        const { token } = getState().auth

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        console.log(config);
        try {
            const { data } = await axios.get(`${base_url}/api/get-user`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const regional_admin_login = createAsyncThunk(
    'auth/regional_admin_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.post(`${base_url}/api/regional_admin_login`, info)
            localStorage.setItem('accessToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const regional_admin_register = createAsyncThunk(
    'auth/regional_admin_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.post(`${base_url}/api/regional_admin_register`, info)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const returnRole = (token) => {
    if (token) {
        const decodeToken = jwt(token)
        const expireTime = new Date(decodeToken.exp * 1000)
        if (new Date() > expireTime) {
            localStorage.removeItem('accessToken')
            return ''
        } else {
            return decodeToken.role
        }
    } else {
        return ''
    }
}

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        userInfo: '',
        role: returnRole(localStorage.getItem('accessToken')),
        token: localStorage.getItem('accessToken')
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: {
        [admin_login.pending]: (state, _) => {
            state.loader = true
        },
        [admin_login.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error
        },
        [admin_login.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        },
        [area_manager_login.pending]: (state, _) => {
            state.loader = true
        },
        [area_manager_login.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error
        },
        [area_manager_login.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        },
        [seller_login.pending]: (state, _) => {
            state.loader = true
        },
        [seller_login.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error
        },
        [seller_login.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        },
        [seller_register.pending]: (state, _) => {
            state.loader = true
        },
        [seller_register.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error
        },
        [seller_register.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        },
        [get_user_info.fulfilled]: (state, { payload }) => {
            state.loader = false
            if (payload && payload.userInfo) {
                state.userInfo = payload.userInfo
                state.role = payload.userInfo.role
            } else {
                state.userInfo = ''
                state.role = ''
            }
        },
        [profile_image_upload.pending]: (state, _) => {
            state.loader = true
        },
        [profile_image_upload.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.userInfo = payload.userInfo
            state.successMessage = payload.message
        },
        [profile_info_add.pending]: (state, _) => {
            state.loader = true
        },
        [profile_info_add.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.userInfo = payload.userInfo
            state.successMessage = payload.message
        },
        [regional_admin_login.pending]: (state, _) => {
            state.loader = true
        },
        [regional_admin_login.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error
        },
        [regional_admin_login.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        },
        [regional_admin_register.pending]: (state, _) => {
            state.loader = true
        },
        [regional_admin_register.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error
        },
        [regional_admin_register.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        },
    }
})
export const { messageClear } = authReducer.actions
export default authReducer.reducer
