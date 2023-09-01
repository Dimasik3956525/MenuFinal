import closeIcon from "../icon/free-icon-close-1828665.png";
import React, {useEffect, useState} from "react";
import {mockDishes} from './Info'
import {useDispatch, useSelector} from "react-redux";
import './Basket.css';
import {addToWaitingList} from "../actions";

const Basket = (props) => {
    const [orderType, setOrderType] = useState('inHouse');
    const [serviceCharge, setServiceCharge] = useState(0);
    const [waitingList] = useState([]);
    const orderList = useSelector(state => state.orderList);

    const dispatch = useDispatch();

    const calculateItemTotal = (item) => {
        const selectedDish = mockDishes[item.category].find(dish => dish.title === item.title);

        if (!selectedDish) {
            return 0;
        }

        return selectedDish.price;
    };
    const handleMoveToWaitingList = () => {
        props.cart.forEach(item => {
            dispatch(addToWaitingList(item)); // Перемещаем каждый товар в список ожидания
        });
        props.setCart([]); // Очищаем корзину
    };
    const handleRemoveCartItem = (index) => {
        const updatedCart = [...props.cart];
        updatedCart.splice(index, 1);
        props.setCart(updatedCart);
    };
    const handleOrderTypeChange = (e) => {
        const type = e.target.value;
        setOrderType(type);
        calculateServiceCharge();
    };
    const calculateServiceCharge = () => {
        const totalOrderAmount = [...waitingList, ...orderList, ...props.cart].reduce(
            (total, item) => total + calculateItemTotal(item),
            0
        );
        let charge =
            totalOrderAmount + (orderType === 'inHouse' ? totalOrderAmount * 0.1 : 150);

        setServiceCharge(charge);
    };


    useEffect(() => {
        calculateServiceCharge();
    }, [props.cart, orderList, waitingList, orderType]);

    return (
        <div className='center-block'>
        <div className='basket'>
            <h3>Корзина:</h3>
            <div>
                {props.cart.length > 0 ? (
                    props.cart.map((item, index) => (
                        <div className='basketBlock' key={index}>
                            <div className='basketInfo' key={index}>
                                {item.title} - {item.option.join(', ')} - Сумма: {calculateItemTotal(item)} тг
                            </div>
                            <div className='basketRemove'>
                                <button onClick={() => handleRemoveCartItem(index)}>
                                    <img src={closeIcon} alt="Close Icon" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Корзина пуста</p>
                )}

                {props.cart.length > 0 && (
                    <div className='basketButton'>
                        <button onClick={handleMoveToWaitingList}>Заказать</button>
                    </div>
                )}

                <div className='hallAway'>
                    <select value={orderType} onChange={handleOrderTypeChange}>
                        <option value="inHouse">В зале</option>
                        <option value="takeAway">На вынос</option>
                    </select>
                    <p>Общая сумма: {serviceCharge} тг</p>
                </div>
            </div>
        </div>
        </div>
    )

}
export default Basket