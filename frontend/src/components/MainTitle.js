import React from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

export const userTag = (user) => {
    return <p className={'userTag'}>{user.first_name} {user.last_name}</p>

}

const MainTitle = () => {
    const user = useSelector(state => state.user)

    return (
    <div className={'mainTitle'}>
        {user.status === 'Не авторизован' && <div className={'mainTitle__actions actions'}>
            <NavLink className={'link'} to={'auth'}>Вход</NavLink>
            <p className={'actions__separator'}>/</p>
            <NavLink className={'link'} to={'/registerUser'}>Регистрация</NavLink>
        </div>}
        {user.status === 'Авторизован' && <>
            {userTag(user)}
        </>}
        <h1 className="mainTitle__title">Трансфер между Абхазией и Россией</h1>
        <p className="mainTitle__description">Transfer Abkhazia - это сервис бронирования трансфера между
            Абхазией и Россией. На нашем сервисе вы можете онлайн оставить заявку на трансфер и выбрать понравившегося водителя по выгодной цене.</p>
    </div>
    )
}

export default MainTitle