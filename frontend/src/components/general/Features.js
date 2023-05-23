import React from 'react';

function Features(props) {
    const feature = props.feature

    return (
    <article className="features__feature feature">
        <h3 className="feature__title">{feature.title}</h3>
        <img className="feature__image" src={feature.image} />
        <p className="feature__description">{feature.description}</p>
    </article>
    );
}

export default Features;