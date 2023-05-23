import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {updateUser} from "../../reducers/userSlice";
import toast from "react-hot-toast";
import {IMaskInput} from "react-imask/dist/react-imask";
import {phoneMask} from "../../routes/auth/Registration";

export function validateEmail(email) {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return pattern.test(String(email).toLowerCase());
}


function ProfileInput(props) {
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState(props.value)
    const toggleEdit = () => {setIsEdit(!isEdit)}

    const onChange = (e) => setValue(e.target.value)

    const dispatch = useDispatch()

    const save = async e => {
        e.preventDefault()

        if (value.length < 4) {
            toast.error(`Вы ввели слишком короткое ${String(props.label).toLocaleLowerCase()}`)
            return
        }
        if (props.id==='email' && !validateEmail(value)) {
            toast.error('Введите корректную почту!')
            return
        }

        if (props.id==='phoneNumber' && value.length < 18) {
            toast.error('Введите корректный номер телефона!')
            return
        }

        const data = {
            [props.id]: `${value}`
        }

        await dispatch(updateUser(data))
        toggleEdit()
    }

    return (
    <>
        {isEdit ?
        <form className={'userProfile__row userProfile__row_input form form_row'} onSubmit={save}>
            <div className="form__body">
                <label className={'form__label'} htmlFor={props.id}>{props.label}:</label>
                {props.id!=='phoneNumber' ?
                    <input
                        className={'form__input'}
                        placeholder={props.placeholder}
                        type={props.type} id={props.id}
                        value={value}
                        onChange={onChange}
                    /> :
                    <IMaskInput
                        className='form__input'
                        placeholder={props.placeholder}
                        type={props.type} id={props.id}
                        value={value}
                        onChange={onChange}
                        mask={phoneMask}
                        onAccept={(value, mask) => console.log(value, mask)}
                    />
                }
            </div>
            <div className="form__footer">
                <input className={'form__input form__input_submit'} type={'submit'}/>
            </div>
        </form> :
        <div className={'userProfile__row form form_row'}>
            <p className={'row__about'}>{props.label}: {value}</p>
            <button className={'form__input form__input_edit'} onClick={toggleEdit}>Изменить</button>
        </div>}
    </>
    );
}

export default ProfileInput;