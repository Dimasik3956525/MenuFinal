// actions.js
export const ADD_TO_WAITING_LIST = 'ADD_TO_WAITING_LIST';
export const MOVE_TO_ORDER_LIST = 'MOVE_TO_ORDER_LIST';
export const REMOVE_FROM_WAITING_LIST = 'REMOVE_FROM_WAITING_LIST';
export const REMOVE_FROM_ORDER_LIST = 'REMOVE_FROM_ORDER_LIST';

export const addToWaitingList = (item) => ({
    type: ADD_TO_WAITING_LIST,
    payload: item,
});
export const moveToOrderList = (items) => {
    return {
        type: MOVE_TO_ORDER_LIST,
        payload: items,
    };
};


export const removeFromWaitingList = (index) => ({
    type: REMOVE_FROM_WAITING_LIST,
    payload: index,
});
export const removeFromOrderList = (updatedList) => ({
    type: REMOVE_FROM_ORDER_LIST,
    payload: updatedList,
});


