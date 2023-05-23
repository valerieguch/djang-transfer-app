import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {makeRequest} from "../../reducers/supportSlice";
import toast from "react-hot-toast";

function MakeRequest(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const onChangeTitle = e => setTitle(e.target.value);
    const onChangeDescription = e => setDescription(e.target.value);

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()

        if (title.length < 1) {
            toast.error('Напишите заголовок!')
            return
        }
        if (description.length < 1) {
            toast.error('Напишите описание ошибки!')
            return
        }

        dispatch(makeRequest({title, description}))

        setTitle('')
        setDescription('')
    }

    return (
    <form className={'support__form form'} onSubmit={onSubmit}>
        <div className="form__header">
            <h3 className={'form__title'}>Оставить запрос</h3>
        </div>
        <div className="form__body">
            <label className={'form__label'} htmlFor={'title'}>Заголовок</label>
            <input className={'form__input'} id={'title'} placeholder={'Краткое описание'} value={title} onChange={onChangeTitle}/>

            <label className={'form__label'} htmlFor={'description'}>Описание проблемы</label>
            <textarea className={'form__textarea'} id={'description'} placeholder={'Опишите подробно вашу проблему'} value={description} onChange={onChangeDescription} rows={6}/>
        </div>
        <div className="form__footer">
            <input className={'form__input form__input_submit'} type={'submit'} value={'Отправить запрос'}/>
        </div>
    </form>
    );
}

export default MakeRequest;