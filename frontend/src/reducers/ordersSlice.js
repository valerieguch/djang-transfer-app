import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API_URL, headers} from "./userSlice";
import toast from "react-hot-toast";

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const response = await axios.get(`${API_URL}/orders/`, headers)
    return response.data
})

export const orderDetail = createAsyncThunk('orders/orderDetail', async (id) => {
    // const response = await axios.get(`${API_URL}/orders/${id}/`, headers)
    const response = await axios.get(`${API_URL}/orderDetail/${id}`, headers)
    return response.data
})

export const makeOrder = createAsyncThunk('orders/makeOrder', async (data) => {
    const response = await axios.post(`${API_URL}/orders/`, data, headers)
    toast.success('Заявка оставлена!')
    return response.data
})

export const chooseRequestFromDriver = createAsyncThunk('orders/chooseRequestFromDriver', async data => {
    const response = await axios.post(`${API_URL}/choose-driver/`, data, headers)
    return response
})

export const updateRequest = createAsyncThunk('ordere/updateRequest', async ({id, price}) => {
    const response = await axios.put(`${API_URL}/update-response/${id}/`, {price}, headers)
    return response
})

export const chooseRequestFromClient = createAsyncThunk('orders/chooseRequestFromClient', async ({id, status}) => {
    const response = await axios.put(`${API_URL}/choose-request/${id}/`, {status}, headers)
    return response
})

export const setRate = createAsyncThunk('orders/setRate', async (data) => {
    try {
        const response = await axios.post(`${API_URL}/order-rating/${data.order}/`, data, headers)
        toast.success('Отзыв отправлен!')
        return response.data
    } catch (e) {
        toast.error('Ошибка, вы уже оценили эту поездку')
    }
})

const initialState = {
    orders: [],
    status: 'Нет данных'
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchOrders.pending]: state => {
            state.status = 'Загрузка данных'
        },
        [fetchOrders.fulfilled]: (state, action) => {
            const orders = action.payload
            state.orders = orders
            state.status = 'Успешно'
        },
        [fetchOrders.rejected]: (state, action) => {
            console.log(action)
            state.status = 'Ошибка'
        },
        [makeOrder.fulfilled]: (state, action) => {
            state.orders = [...state.orders, action.payload]
        },
        [orderDetail.fulfilled]: (state, action) => {
            state.currentOrder = action.payload
        },
        [chooseRequestFromDriver.fulfilled]: (state, action) => {
            toast.success('Предложение отправлено!')
        },
        [updateRequest.fulfilled]: state => {
            toast.success('Предложение обновлено!')
        },
        [chooseRequestFromClient.fulfilled]: state => {
            toast.success("Водитель выбран!")
        }
    }
})

export default ordersSlice.reducer