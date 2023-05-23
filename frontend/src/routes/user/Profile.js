import React from 'react';
import {useSelector} from "react-redux";
import ProfileInput from "../../components/profile/ProfileInput";
import {userTag} from "../../components/MainTitle";

function Profile(props) {
    const user = useSelector(state => state.user)

    return (
    <div className="userProfile">
        <div className="userProfile__header">
            <h2 className="userProfile__title">Настройки</h2>
            {userTag(user)}
        </div>
        <div className="userProfile__body">
            <ProfileInput
                id={'username'}
                value={user.username}
                label={'Имя пользователя'}
                placeholder={'ivan'}
                type={'username'}
            />
            <ProfileInput
                id={'first_name'}
                value={user.first_name}
                label={'Имя'}
                placeholder={'Иван'}
                type={'first_name'}
            />
            <ProfileInput
                id={'last_name'}
                value={user.last_name}
                label={'Фамилия'}
                placeholder={'Иванов'}
                type={'last_name'}
            />
            <ProfileInput
                id={'email'}
                value={user.email}
                label={'Почта'}
                placeholder={'ivan@ivanov.ru'}
                type={'email'}
            />
            <ProfileInput
                id={'phoneNumber'}
                value={user.phoneNumber}
                label={'Номер телефона'}
                placeholder={'+7 (999) 999 99 99'}
                type={'phoneNumber'}
            />
        </div>
    </div>
    );
}

export default Profile;