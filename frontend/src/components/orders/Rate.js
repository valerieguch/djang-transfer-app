import React, {useState} from 'react';
import RateStars from "./RateStars";
import {useDispatch} from "react-redux";
import {setRate} from "../../reducers/ordersSlice";
import toast from "react-hot-toast";

function Rate(props) {
    const [communication, setCommunication] = useState(1)
    const [driver, setDriver] = useState(1)
    const [transport, setTransport] = useState(1)

    const dispatch = useDispatch()

    const onSubmit = async e => {
        e.preventDefault()

        const data = {
            order: props.orderId,
            communication_rating: communication,
            driver_rating: driver,
            transport_rating: transport,
        }

        await dispatch(setRate(data))
        props.closeRate()
    }

    return(
        <form className={'order__rate rate form'} onSubmit={onSubmit}>
            <div className="rate__header form__header">
                <h3 className="rate__title form__title">Оценка заказа</h3>
                <h3 className="rate__close"onClick={props.closeRate}>x</h3>
            </div>
            <div className="rate__body form__body">
                <label className="row__label">Коммуникабельность</label>
                <RateStars rating={communication} setRating={setCommunication}/>
                <label className="row__label">Водитель</label>
                <RateStars rating={driver} setRating={setDriver}/>
                <label className="row__label">Транспорт</label>
                <RateStars rating={transport} setRating={setTransport}/>
            </div>
            <div className="rate__footer form__footer">
                <input className={'form__input form__input_submit'} type={'submit'} value={'Отправить'}/>
            </div>
        </form>
    )
}

export default Rate;