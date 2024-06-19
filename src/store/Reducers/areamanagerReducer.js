import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url } from '../../utils/config';

export const get_areamanager = createAsyncThunk(
    'areamanager/get_areamanager',
    async (_, { rejectWithValue, getState }) => {
        const { token } = getState().auth;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };

        try {
            const response = await axios.get(`${base_url}/api/get_areamanager`, config);
            return response.data; 
           
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const areamanagerSlice = createSlice({
    name: 'areamanager',
    initialState: {
        areaManagers: [],
        loader: false,
        errorMessage: '',
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_areamanager.pending, (state) => {
                state.loader = true;
            })
            .addCase(get_areamanager.fulfilled, (state, { payload }) => {
                state.areaManagers = payload; // Ensure payload is correctly set
                state.loader = false;
            })
            .addCase(get_areamanager.rejected, (state, { payload }) => {
                state.errorMessage = payload;
                state.loader = false;
            });
    }
});

export const { messageClear } = areamanagerSlice.actions;
export default areamanagerSlice.reducer;