import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL, headers} from "./userSlice";
import toast from "react-hot-toast";

export const fetchFeedbacks = createAsyncThunk('feedbacks/fetchFeedbacks', async () => {
    const response = await axios.get(`${API_URL}/feedbacks/`)
    return response.data
})

export const postFeedback = createAsyncThunk('feedbacks/postFeedback', async (data) => {
    try {
        const response = await axios.post(`${API_URL}/feedbacks/`, data, headers)
        toast.success('Отзыв сохранен')
        return response
    } catch (e) {
        toast.error('Ошибка при попытке оставить отзыв')
    }
})

const initialState = {
    status: 'Нет данных',
    feedbacks: []
}

const feedbacksSlice = createSlice({
    name: 'feedbacks',
    initialState,
    extraReducers: {
        [fetchFeedbacks.pending]: state => {state.status = 'Загрузка данных'},
        [fetchFeedbacks.fulfilled]: (state, action) => {
            state.feedbacks = action.payload
            state.status = 'Успешно'
        },
        [fetchFeedbacks.rejected]: (state, action) => {
            console.log(action)
            state.status = 'Ошибка'
        }
    }
})

export default feedbacksSlice.reducer