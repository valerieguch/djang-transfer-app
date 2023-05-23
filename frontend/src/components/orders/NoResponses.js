import React from 'react';
import arrow from '../../images/arrow_horizontal.png'

function NoResponses(props) {
    return (
    <div className={'orderDetail__noResponses'}>
        <div className="column">
            <div className="row__circle row__circle_red"/>
            <p className="row__text">Дождитесь откликов</p>
        </div>
        <img className={'arrow'} src={arrow} />
        <div className="column">
            <div className="row__circle row__circle_white"/>
            <p className="row__text">Выберите подходящего водителя</p>
        </div>
    </div>
    );
}

export default NoResponses;