import React from 'react';

function SupportList(props) {
    const requests = props.requests

    const statuses = {
        'pending': 'В ожидании',
        'ongoing': 'В работе',
        'resolved': 'Решен'
    }

    return (
    <>
        {requests.map((request, id) => {
            return <div className={'request'} key={`request${id}`}>
                <h3 className="request__title">#{id+1}. {request.title}</h3>
                <p className="request__description">{request.description}</p>
                <p className={"request__status request__status_"+request.status}>{statuses[request.status]}</p>
            </div>
        })}
    </>
    );
}

export default SupportList;