import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../reducers/userSlice";
import {NavLink, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {IMaskInput} from "react-imask";

export function validatePhoneNumber(phoneNumber) {
    const regex = /^\+{1}[7]{1}\s{1}\(\d{3}\)\s{1}\d{3}\s{1}\d{2}\s{1}\d{2}$/;
    return regex.test(phoneNumber);
}

export const phoneMask = "+{7} (000) 000 00 00";

function Registration(props) {
    const [username,setUsername] = useState('valerie')
    const [password,setPassword] = useState('zxcqwe12easzcaaz')
    const [password2,setPassword2] = useState('zxcqwe12easzcaaz')
    const [email, setEmail] = useState('marderics@gmail.com')
    const [firstName, setFirstName] = useState('Валерия')
    const [lastName, setLastName] = useState('Гучустян')
    const [phoneNumber, setPhoneNumber] = useState('+7 (926) 848 95 65')

    const onChangeUsername = e => setUsername(e.target.value)
    const onChangePhone = e => setPhoneNumber(e.target.value)
    const onChangePassword = e => setPassword(e.target.value)
    const onChangePassword2 = e => setPassword2(e.target.value)
    const onChangeEmail = e => setEmail(e.target.value)
    const onChangeFirstName = e => setFirstName(e.target.value)
    const onChangeLastName = e => setLastName(e.target.value)

    const user = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const register = async (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error('Пароли не совпадают')
            return
        }
        const data = {firstName, lastName, username, password, email, phoneNumber, is_staff: 'False'}
        if (props.type==='driver') {data.is_staff='True'}

        console.log(data)
        await dispatch(registerUser(data, {navigate}))
        window.location.reload();
    }

    useEffect(() => {
        if(user.status === 'Авторизован') {
            navigate('/')
        }
    },[user])

    return (
        <div className={'register'}>
            <form className='registerForm form' onSubmit={register}>
                <div className="form__header">
                    <h2 className="header__title">{props.title}</h2>
                </div>
                <div className="form__body">
                    <label className='form__label' htmlFor='firstName'>Введите имя:</label>
                    <input
                        className='form__input'
                        id='firstName'
                        type='text'
                        placeholder='Иван'
                        onChange={onChangeFirstName}
                        value={firstName}
                    />
                    <label className='form__label' htmlFor='lastName'>Введите фамилию:</label>
                    <input
                        className='form__input'
                        id='lastName'
                        type='text'
                        placeholder='Иванов'
                        onChange={onChangeLastName}
                        value={lastName}
                    />
                    <label className='form__label' htmlFor='phoneNumber'>Введите номер телефона:</label>
                    <IMaskInput
                        className='form__input'
                        id='phoneNumber'
                        type='phoneNumber'
                        placeholder='Иванов'
                        onChange={onChangePhone}
                        value={phoneNumber}
                        mask={phoneMask}
                        onAccept={(value, mask) => console.log(value, mask)}
                    />
                    <label className='form__label' htmlFor='login'>Введите логин:</label>
                    <input
                        className='form__input'
                        id='login'
                        type='text'
                        placeholder='ivan'
                        onChange={onChangeUsername}
                        value={username}
                    />
                    <label className='form__label' htmlFor='email'>Почта:</label>
                    <input
                        className='form__input'
                        id='email'
                        type='email'
                        placeholder='ivanov@ivan.ru'
                        onChange={onChangeEmail}
                        value={email}
                    />
                    <label className='form__label' htmlFor='password'>Введите пароль:</label>
                    <input
                        className='form__input'
                        id='password'
                        type='password'
                        placeholder='Пароль'
                        onChange={onChangePassword}
                        value={password}
                    />
                    <label className='form__label' htmlFor='password2'>Подтвердите пароль:</label>
                    <input
                        className='form__input'
                        id='password2'
                        type='password'
                        placeholder='Пароль'
                        onChange={onChangePassword2}
                        value={password2}
                    />
                </div>
                <div className="form__footer">
                    <input
                        className='form__input_submit form__input'
                        type='submit'
                        value={'Зарегистрироваться'}
                        onClick={register}
                    />
                    <p className="form__help">
                        Уже есть аккаунт ? <NavLink className={'Войти'} to={"/auth"}>Войти</NavLink>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Registration;