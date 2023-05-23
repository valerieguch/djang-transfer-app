import React, {useState} from 'react';
import RateStars from "../orders/RateStars";
import {useDispatch} from "react-redux";
import {postFeedback} from "../../reducers/feedbacksSlice";
import toast from "react-hot-toast";

function FeedbackForm(props) {
    const [rating, setRating] = useState(3)
    const [comment, setComment] = useState('')

    const onChangeComment = e => setComment(e.target.value);

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()

        if (comment.length < 5) {
            toast.error('Заполните комментарий!')
            return
        }

        dispatch(postFeedback({rating, comment}))
    }

    return (
    <form action="" className="general__feedbackForm form" onSubmit={onSubmit}>
        <div className="form__header">
            <h2 className="form__title">Оставить отзыв</h2>
        </div>
        <div className="form__body">
            <label className="form__label">Оценка</label>
            <RateStars rating={rating} setRating={setRating}/>

            <label htmlFor="comment" className="form__label">Комментарий</label>
            <textarea
                name=""
                id="comment"
                rows="10"
                className="form__textarea"
                value={comment}
                onChange={onChangeComment}
            />
        </div>
        <div className="form__footer">
            <input className={'form__input form__input_submit'} type={'submit'} value={'Отправить'}/>
        </div>
    </form>
    );
}

export default FeedbackForm;