import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url } from '../../utils/config';

export const get_regionaladmin = createAsyncThunk(
    'regionaladmin/get_regionaladmin',
    async (_, { rejectWithValue, getState }) => {
        const { token } = getState().auth;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };

        try {
            const response = await axios.get(`${base_url}/api/get_regionaladmin`, config);
            return response.data; 
           
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const regionaladminSlice = createSlice({
    name: 'regionaladmin',
    initialState: {
        regionaladmins: [],
        total: 0,
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
            .addCase(get_regionaladmin.pending, (state) => {
                state.loader = true;
            })
            .addCase(get_regionaladmin.fulfilled, (state, { payload }) => {
                state.regionaladmins = payload.data;
                state.total = payload.total;
                state.loader = false;
            })
            .addCase(get_regionaladmin.rejected, (state, { payload }) => {
                state.errorMessage = payload;
                state.loader = false;
            });
    }
});

export const { messageClear } = regionaladminSlice.actions;
export default regionaladminSlice.reducer;