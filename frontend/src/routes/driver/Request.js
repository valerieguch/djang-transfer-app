import React, {useState} from 'react';
import {beautyTime} from "../../components/orders/OrdersList";
import adult from "../../images/adult.png";
import children from "../../images/children.png";
import {useDispatch, useSelector} from "react-redux";
import {chooseRequestFromDriver, fetchOrders, updateRequest} from "../../reducers/ordersSlice";
import toast from "react-hot-toast";
import {useLocation} from "react-router-dom";

function Request(props) {
    const driver_id = useSelector(state => state.user.driver_id)

    const request = props.request

    const [price, setPrice] = useState(request.response?.price || '')
    const [isOffer, setIsOffer] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const toggleOffer = () => setIsOffer(!isOffer)
    const toggleEdit = () => setIsEdit(!isEdit)
    const onChangePrice = e => setPrice(e.target.value)

    const dispatch = useDispatch()

    const location = useLocation()
    const endsWith = location.pathname.endsWith('requests')

    const onEdit = async e => {
        e.preventDefault()

        const data = {
            id: request.response.id,
            price
        }
        await dispatch(updateRequest(data))
        dispatch(fetchOrders())
        toggleEdit()
    }

    const onSubmit = async e => {
        e.preventDefault()

        const data = {
            order_id: request.id,
            driver_id,
            price
        }

        await dispatch(chooseRequestFromDriver(data))
        dispatch(fetchOrders())
        toggleOffer()
    }

    return (
        <div className={"requests__request request "}>
            <p className="request__item">{beautyTime(request.departure_time,'time')}</p>
            <p className="request__item">{request.from_location}</p>
            <p className="request__item">{request.to_location}</p>
            <div className="request__item item">
                <div className="item__passenger">
                    <img className="passenger__image" src={adult}/>
                    <p className="passenger__count">x {request.men_amount}</p>
                </div>
                <div className="item__passenger">
                    <img className="passenger__image" src={children}/>
                    <p className="passenger__count">x {request.children_amount}</p>
                </div>
            </div>
            {endsWith ? (
            <div className="request__item item__response">
                {request?.response ? (
                    isEdit ? (
                        <form className={'response__form form form_row'} onSubmit={onEdit}>
                            <label className={'form__label'} htmlFor={`price${request.id}`}>Стоимость:</label>
                            <input
                                className={'form__input'}
                                id={`price${request.id}`}
                                placeholder={'1000'}
                                value={price}
                                onChange={onChangePrice}
                                type={'number'}
                                required
                            />
                            <input
                                className={'button button_submit'}
                                type={'submit'}
                                value={'Сохранить'}
                            />
                        </form>
                    ) : (<>
                        <p className="response__price">{request.response?.price} р.</p>
                        <button className={'button button_edit'} onClick={toggleEdit}>Изменить</button>
                    </>)
                ) : (<>
                    {isOffer ? (
                        <form className={'response__form form form_row'} onSubmit={onSubmit}>
                            <label className={'form__label'} htmlFor={`price${request.id}`}>Стоимость:</label>
                            <input
                                className={'form__input'}
                                id={`price${request.id}`}
                                placeholder={'1000'}
                                value={price}
                                onChange={onChangePrice}
                                type={'number'}
                                required
                            />
                            <input
                                className={'button button_submit'}
                                type={'submit'}
                                value={'Предложить'}
                            />
                        </form>
                    ) : (
                        <>
                            <p></p>
                            <button className={'button button_submit'} onClick={toggleOffer}>Предложить цену</button>
                        </>
                    )}
                </>)}
            </div>
            ) : (
            <div className="request__item item__cost">
                <p className="response__price">{request.response?.price} р.</p>
            </div>
            )}
        </div>
    );
}

export default Request;