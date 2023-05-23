import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import toast from "react-hot-toast";
import {updateCar} from "../../reducers/carSlice";

function CarInput (props) {
    const carId = useSelector(state => state.car.id)

    const car = useSelector(state => state.car)

    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState()
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/jpeg'];
        if (!acceptedImageTypes.includes(file.type)) {
            toast.error('Недопустимый тип файла')
            setImage(null)
        } else {
            setImage(e.target.files[0]);
        }
    };

    const toggleEdit = () => {setIsEdit(!isEdit)}

    const onChange = (e) => setValue(e.target.value)

    useEffect(() => {
       setValue(car[props?.id])
    },[car])

    const dispatch = useDispatch()

    const save = async e => {
        e.preventDefault()

        if (value.length < 4) {
            toast.error(`Вы ввели слишком короткое ${String(props.label).toLocaleLowerCase()}`)
            return
        }

        const data = {
            [props.id]: `${value}`,
            id: carId
        }
        if (props.type==='file') {
            if (image === null) {
                toast.error('Загрузите изображение!')
                return
            }
            const formData = new FormData();
            formData.append([props.id], image, image.name);
            await dispatch(updateCar({image: formData, id: carId}))
        } else {
            await dispatch(updateCar(data))
        }
        toggleEdit()
    }

    return (
        <>
        {isEdit ?
        <form className={'car__row form form_row'} onSubmit={save}>
            <>
                <div className="form__header">
                    <label className={'form__label'} htmlFor={props.id}>{props.label}:</label>
                    {props.type !== 'file' ? (
                        <input
                            className={'form__input'}
                            placeholder={props.placeholder}
                            type={props.type} id={props.id}
                            value={value}
                            onChange={onChange}
                        />
                        ) : (
                        <input
                            type={'file'}
                            accept="image/jpeg,image/png,image/jpeg"
                            onChange={handleImageChange}
                        />
                    )}
                </div>
                <div className="form__body">
                    <button className={'form__input from__input_cancel'} onClick={toggleEdit}>Отменить</button>
                    <input className={'form__input form__input_submit'} type={'submit'}/>
                </div>
            </>
        </form> :
        <div className={'car__row form form_row'}>
            {props.type !== 'file' ? (<>
                <div className="row__header">
                    <p className={'row__about'}>{props.label}: {value}</p>
                    <button className={'form__input form__input_edit'} onClick={toggleEdit}>Изменить</button>
                </div>
            </>) : (<>
                <div className="row__header">
                    <p className={'row__about'}>{props.label}</p>
                    <button className={'form__input form__input_edit'} onClick={toggleEdit}>Изменить</button>
                </div>
                <img className={'row__image'} src={value} alt={props.id}/>
            </>)
            }
        </div>}
        </>
    );
}

export default CarInput;