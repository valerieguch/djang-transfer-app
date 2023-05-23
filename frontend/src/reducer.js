import {combineReducers} from "redux";
import userSlice from "./reducers/userSlice";
import ordersSlice from "./reducers/ordersSlice";
import supportSlice from "./reducers/supportSlice";
import feedbacksSlice from "./reducers/feedbacksSlice";
import carSlice from "./reducers/carSlice";

const rootReducer = combineReducers({
    user: userSlice,
    orders: ordersSlice,
    support: supportSlice,
    feedbacks: feedbacksSlice,
    car: carSlice,
})

export default rootReducer