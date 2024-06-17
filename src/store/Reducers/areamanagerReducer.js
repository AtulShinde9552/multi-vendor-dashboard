import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { base_url } from '../../utils/config'

export const get_areamanager = createAsyncThunk(
    'areamanager/get_areamanager',
    async (_, { rejectWithValue, getState, fulfillWithValue }) => {
        const { token } = getState().auth
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }

        try {
            const { data } = await axios.get(`${base_url}/api/get_areamanager`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const areamanagerReducer = createSlice({
    name: 'areamanager',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        areaManagers: [], // Ensure areaManagers is an empty array initially
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: {
        [get_areamanager.fulfilled]: (state, { payload }) => {
            state.areaManagers = payload.areaManagers
            state.loader = false; // Move loader to false here
        },
        [get_areamanager.pending]: (state) => {
            state.loader = true;
        },
        [get_areamanager.rejected]: (state, { payload }) => {
            state.errorMessage = payload;
            state.loader = false;
        }
    }
})
export const { messageClear } = areamanagerReducer.actions
export default areamanagerReducer.reducer
