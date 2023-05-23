import React from 'react';
import Registration from "../auth/Registration";

function RegisterDriver(props) {
    return (
        <Registration
            type={'driver'}
            title={'Стать перевозчиком'}
        />
    );
}

export default RegisterDriver;