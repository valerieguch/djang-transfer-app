import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL, headers} from "./userSlice";
import toast from "react-hot-toast";

export const fetchRequests = createAsyncThunk('support/fetchRequests', async () => {
    const response = await axios.get(`${API_URL}/supports/`, headers)
    return response.data
})

export const makeRequest = createAsyncThunk('support/makeRequest', async (data) => {
    try {
        const response = await axios.post(`${API_URL}/supports/`, data, headers);
        toast.success('Запрос отправлен!')
        return response.data;
    } catch (error) {
        const err = error.response.data
        throw err;
    }
});



const initialState = {
    status: 'Нет данных',
    requests: []
}

const supportSlice = createSlice({
    name: 'support',
    initialState,
    extraReducers: {
        [fetchRequests.pending]: state => {state.status='Загрузка данных'},
        [fetchRequests.fulfilled]: (state, action) => {
            const data = action.payload
            state.status = 'Успешно'
            state.requests = data
        },
        [fetchRequests.rejected]: (state, action) => {
            console.log(action)
            state.status = 'Ошибка при получении данных'
        },
        [makeRequest.fulfilled]: (state, action) => {
            const data = action.payload
            state.requests = [...state.requests, data]
        }
    }
})

export default supportSlice.reducer