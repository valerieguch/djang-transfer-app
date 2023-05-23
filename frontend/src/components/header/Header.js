import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import MainMenu from "./MainMenu";
import UserMenu from "./UserMenu";
import logo from '../../images/logo.png'
import {useSelector} from "react-redux";
import DriverMenu from "./DriverMenu";

const Header = () => {
    const location = useLocation()

    const [classList, setClassList] = useState('')

    useEffect(() => {
        if (location.pathname.startsWith('/user') || location.pathname.startsWith('/driver')) {
            setClassList('header_user')
        } else {
            setClassList('')
        }
    }, [location])


    return (
    <header className={'header ' + classList}>
        <NavLink to={'/'} className="header__title">
            <img className={'header__logo'} src={logo}/>
        </NavLink>
        <nav className={'header__nav'}>
            {location.pathname.startsWith('/user') ?
                <UserMenu/> :
                location.pathname.startsWith('/driver') ?
                    <DriverMenu/> :
                    <MainMenu/>
            }
        </nav>
    </header>
    )
}

export default Header