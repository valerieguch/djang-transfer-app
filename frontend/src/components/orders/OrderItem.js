import React, {useEffect, useRef, useState} from 'react';
import Rate from "./Rate";
import {NavLink, useLocation} from "react-router-dom";

function OrderItem(props) {
    const row = props.row
    const [isShow, setIsShow] = useState(false)

    const ref = useRef()

    const location = useLocation()

    const end = location.pathname.endsWith('pastOrders')

    const openRate = e => {
        setIsShow(true)
    }

    const closeRate = () => {
        setIsShow(false)
    }

    const handleClick = (event) => {
        if(ref && ref.current && !ref.current.contains(event.target)) {
            setIsShow(false)
            console.log('asd')
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [ref.current])
    return (
        <article className={'orders__order order'} ref={ref}>
            <p className="row__item">Дата создания</p>
            <p className="row__item">Дата поездки</p>
            <p className="row__item">Откуда</p>
            <p className="row__item">Куда</p>
            {end ?
                <a className='row__item row__item_choose link' onClick={openRate}>Оценить</a> :
                <NavLink className='row__item row__item_choose link' to={`${props.orderId}`}>Выбрать</NavLink>}
            {row}
            {isShow && <Rate orderId={props.orderId} refer={ref} closeRate={closeRate}/>}
        </article>
    );
}

export default OrderItem;