import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveToOrderList,removeFromOrderList, removeFromWaitingList } from "../actions";
import { mockDishes } from "./Info";
import closeIcon from "../icon/free-icon-close-1828665.png";
import './waitningList.css';

const WaitingList = () => {
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.orderList);
    const [serviceCharge] = useState(0);
    // const [waitingList, setWaitingList] = useState([]);
    const waitingList = useSelector(state => state.waitingList);



    useEffect(() => {
        const orderTimer = setTimeout(() => {
            if (waitingList.length > 0) {
                dispatch(moveToOrderList(waitingList));

                dispatch(removeFromWaitingList());
            }
        }, 10000);

        return () => {
            clearTimeout(orderTimer);
        };
    }, [dispatch, waitingList]);

    console.log(waitingList,'waitingList')


    const calculateItemTotal = (item) => {
        const selectedDish = mockDishes[item.category].find(dish => dish.title === item.title);

        if (!selectedDish) {
            return 0;
        }

        return selectedDish.price;
    };




    const handleRemoveOrder = (index, listType) => {
        const updatedList = listType === 'waiting' ? [...waitingList] : [...orderList];
        updatedList.splice(index, 1);

        if (listType === 'waiting') {
            dispatch(removeFromWaitingList(updatedList));
        } else {
            dispatch(removeFromOrderList(updatedList));
        }
    };

    return (
        <div className='center-block'>
            <div className='waitingList'>
                <h3>Список ожидания:</h3>
                {waitingList && waitingList.length > 0 && waitingList.map((item, index) => (
                    <div className='spiner' key={index}>
                        {item.title} - {item.option.join(', ')} - Сумма: {calculateItemTotal(item)} тг
                        <span className="loader"></span>
                    </div>

                ))}
            </div>
            <div className='listOfOrders'>
                <h3>Список заказов:</h3>
                {orderList.map((item, index) => (
                    <div className='basketBlock' key={index}>
                        <div className='basketInfo'>
                            {item.title} - {item.option.join(', ')} - Сумма: {calculateItemTotal(item)} тг
                        </div>
                        <div className='basketRemove'>
                            <button onClick={() => handleRemoveOrder(index, 'order')}>
                                <img src={closeIcon} alt="Close Icon" />
                            </button>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default WaitingList;
