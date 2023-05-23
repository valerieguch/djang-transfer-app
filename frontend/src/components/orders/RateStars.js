import React from 'react';

function StarIcon(props) {
    const { fill = 'none' } = props;
    return (
        <svg className={'starIcon'} fill={fill} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
        </svg>
    );
}

function RateStars(props) {
    const [rating, setRating] = [props.rating, props.setRating]

    const onSaveRating = (index) => {
        setRating(index);
    };

    const stars = [1, 2, 3, 4, 5].map((index) => {
        const fill = rating >= index ? 'orange' : 'gray';
        return (
            <div
                key={index}
                className="cursor-pointer"
                onClick={() => onSaveRating(index)}
            >
                <StarIcon fill={fill}/>
            </div>
        );
    });

    return <div className={'row__input'}>{stars}</div>;
}

export default RateStars;