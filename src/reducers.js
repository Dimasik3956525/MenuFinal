import { combineReducers } from 'redux';
import {
    ADD_TO_WAITING_LIST,
    MOVE_TO_ORDER_LIST,
    REMOVE_FROM_WAITING_LIST,
    REMOVE_FROM_ORDER_LIST,
} from './actions';



const initialState = {
    waitingList: [],
    orderList: [],
};

const waitingListReducer = (state = initialState.waitingList, action) => {
    switch (action.type) {
        case ADD_TO_WAITING_LIST:
            return [...state, action.payload];
        case MOVE_TO_ORDER_LIST:
            return state.filter(item => !action.payload.includes(item));
        case REMOVE_FROM_WAITING_LIST:
            return state.filter((item, index) => index !== action.payload);
        default:
            return state;
    }
};


const orderListReducer = (state = initialState.orderList, action) => {
    switch (action.type) {
        case MOVE_TO_ORDER_LIST:
            return [...state, ...action.payload]; // Разворачиваем массив items и добавляем в список заказов
        case REMOVE_FROM_ORDER_LIST:
            return [...action.payload];
        default:
            return state;
    }
};




const rootReducer = combineReducers({
    waitingList: waitingListReducer,
    orderList: orderListReducer,

});

export default rootReducer;

