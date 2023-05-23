import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchFeedbacks} from "../../reducers/feedbacksSlice";
import {beautyTime} from "../orders/OrdersList";

function Feedback (props) {
    const feedback = props.feedback

    const author = `${feedback.client.first_name} ${feedback.client.last_name}`

    const date = beautyTime(feedback.date, 'time')

    return (
    <article className={'feedbacks__feedback feedback'}>
        <p className="feedback__description">{feedback.comment}</p>
        <div className="feedback__footer">
            <p className="feedback__author">- {author}</p>
            <p className="feedback__date">{date}</p>
        </div>
    </article>
    )
}

function Feedbacks(props) {
    const feedbacks = useSelector(state => state.feedbacks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFeedbacks())
    }, [dispatch])

    return (
    <section className={'general__feedbacks feedbacks'} id={'feedback'}>
        <h2 className="feedbacks__title">Отзывы</h2>
        {feedbacks.feedbacks.map(feedback => <Feedback feedback={feedback} key={`feedback${feedback.id}`}/>)}
    </section>
    );
}

export default Feedbacks;