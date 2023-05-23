import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Provider } from 'react-redux'
import store from "./store";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import App from "./App";
import Main from "./routes/Main";
import Authorization from "./routes/auth/Authorization";
import Registration from "./routes/auth/Registration";
import MakeOrder from "./routes/user/MakeOrder";
import MyOrders from "./routes/user/MyOrders";
import Support from "./routes/user/Support";
import OrderDetail from "./components/orders/OrderDetail";
import Profile from "./routes/user/Profile";
import RegisterDriver from "./routes/driver/RegisterDriver";
import ProfileDriver from "./routes/driver/ProfileDriver";
import Car from "./routes/driver/Car";
import OrderRequests from "./routes/driver/OrderRequests";
import Orders from "./routes/driver/Orders";

const router = createBrowserRouter(
    createRoutesFromElements(
    <>
        <Route path={'/'} element={<App/>}>
            <Route index element={<Main/>}/>
            <Route path={'auth'} element={<Authorization/>}/>
            <Route path={'registerUser'} element={<Registration title={'Регистрация'}/>}/>
            <Route path={'registerDriver'} element={<RegisterDriver/>}/>
        </Route>
        <Route path={'/user'} element={<App/>}>
            <Route path={'create'} element={<MakeOrder/>}/>
            <Route path={'upcomingOrders'} element={<MyOrders/>}/>
            <Route path={'pastOrders'} element={<MyOrders/>}/>
            <Route path={'support'} element={<Support/>}/>
            <Route path={'upcomingOrders/:id'} element={<OrderDetail/>}/>
            <Route path={'profile'} element={<Profile/>} />
        </Route>
        <Route path={'/driver'} element={<App/>}>
            <Route path={'profile'} element={<ProfileDriver/>}/>
            <Route path={'support'} element={<Support/>}/>
            <Route path={'car'} element={<Car/>}/>
            <Route path={'requests'} element={<OrderRequests/>}/>
            <Route path={'orders'} element={<Orders/>}/>
        </Route>
    </>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
