import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {authUser} from "../../reducers/userSlice";
import {NavLink, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

function Authorization(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onChangeUsername = e => setUsername(e.target.value)
    const onChangePassword = e => setPassword(e.target.value)

    const user = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const auth = async (e) => {
        e.preventDefault()

        if (username.length < 5) toast.error('Введите корректное имя')
        else if (password.length < 5) toast.error('Введите корректный пароль')
        else {
            await dispatch(authUser({username, password}))
            window.location.reload();
        }
    }

    useEffect(() => {
        if (user.status==='Авторизован') {
            navigate('/')
        }
    }, [user])

    return (
        <div className={'auth'}>
            <form className="auth__form form" onSubmit={auth}>
                <div className="form__header">
                    <h2 className="auth__title">Вход</h2>
                </div>
                <div className="form__body">
                    <label className={'form__label'} htmlFor={'username'}>Логин</label>
                    <input className="form__input" type="text" value={username} onChange={onChangeUsername}/>

                    <label className={'form__label'} htmlFor={'login'}>Пароль</label>
                    <input className="form__input" type="password" value={password} onChange={onChangePassword}/>
                </div>
                <div className="form__footer">
                    <input className="form__input form__input_submit" type="submit" value={'Войти'}/>
                </div>
            </form>
            <p className="form__help">
                Нет аккаунта ? <NavLink className={'link'} to={"/register"}>Регистрация</NavLink>
            </p>
            <p className="auth__status">Статус: {user.status}</p>
        </div>
    );
}

export default Authorization;