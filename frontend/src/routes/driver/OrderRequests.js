import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userTag} from "../../components/MainTitle";
import {fetchOrders} from "../../reducers/ordersSlice";

import Request from "./Request";
import {useLocation} from "react-router-dom";

function OrderRequests(props) {
    const user = useSelector(state => state.user)
    const requests = useSelector(state => state.orders.orders)

    const [data, setData] = useState([...requests])

    const location = useLocation()

    const dispatch = useDispatch()

    const endsWith = location.pathname.endsWith('requests')

    useEffect(() => {
        if(endsWith) {
            const filtered = requests.filter(request => request.response.status==='n')
            setData([...filtered])
        } else {
            const filtered = requests.filter(request => request.response.status==='a')
            setData([...filtered])
        }
    }, [location, requests])

    useEffect( () => {
        dispatch(fetchOrders())
    },[dispatch])

    return (
    <div className="requests">
        <div className="requests__header">
            <h2 className="requests__title">{endsWith ? 'Заявки' : "Поездки"}</h2>
            {userTag(user)}
        </div>
        <div className={"requests__body " + (!endsWith && 'request__order')}>
            <div className={"requests__head head "}>
                <p className="head__column">Дата поездки</p>
                <p className="head__column">Откуда</p>
                <p className="head__column">Куда</p>
                <p className="head__column">Пассажиры</p>
                <p className="head__column">{endsWith ? 'Ваше предложение' : "Стоимость"}</p>
            </div>
            {data.map(request=> (
                <Request request={request} key={`request${request.id}`}/>
            ))}
        </div>
    </div>
    );
}

export default OrderRequests;