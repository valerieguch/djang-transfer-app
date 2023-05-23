import React, {useEffect} from "react";
import Header from "./components/header/Header";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import {useSelector} from "react-redux";

const App = () => {
    const navigate = useNavigate()

    const location = useLocation()

    const user = useSelector(state => state.user)

    useEffect(() => {
        if (location.pathname.startsWith('/user') && user.status!=='Авторизован') {
            navigate('/')
        }
    },[location])

    return (
    <>
        <Header/>
        {location.pathname.endsWith('/') ? (
            <Outlet/>
            ) : (
            <main className={'main'}>
                <Outlet/>
            </main>
            )}
        <Toaster
            position="top-center"
        />
    </>
    )
}

export default App