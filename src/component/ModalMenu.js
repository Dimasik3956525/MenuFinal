import Modal from 'react-modal';
import React, { useState} from 'react';
import {mockDishes} from './Info'
import steack from "../icon/steack.webp";
import pirog from "../icon/pirog.webp";
import cezar from "../icon/cezar.webp";
import limonad from "../icon/limonad.webp";
import tomtosup from "../icon/tomtosup.webp";
import zakuski1 from "../icon/zakuski1.webp";
import './ModalMenu.css';

const ModalMenu = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [option, setAdditions] = useState([]);
    const [currentItem, setCurrentItem] = useState({
        category: '',
        title: '',
        option: [],
    });
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCurrentItem({
        ...currentItem,
        category: selectedCategory,
        title: '',
        option: [],
    });
};
    const handleDishChange = (selectedDish) => {
        setAdditions(selectedDish.option || []);
        setCurrentItem({ ...currentItem, title: selectedDish.title, option: [] });
    };
    const handleAdditionChange = (selectedAddition) => {
        const updatedAdditions = currentItem.option.includes(selectedAddition)
            ? currentItem.option.filter((item) => item !== selectedAddition)
            : [...currentItem.option, selectedAddition];
        setCurrentItem({
            ...currentItem,
            option: updatedAdditions,
        });
    };
    const handleAddItem = () => {
        const newItem = { ...currentItem };
        props.setCart([...props.cart, newItem]); // Обновляем корзину через setCart
        setCurrentItem({
            category: '',
            title: '',
            option: [],
        });
        closeModal();
    };

    return (
<div className='center-block'>

                <div className='menuButton'>
                    <button onClick={openModal}>Меню</button>
                </div>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                    <h2>Добавить позицию</h2>
                    <div>
                        <h3>Выберите категорию:</h3>
                        <div className="category-buttons">
                            <button className="category-button" onClick={() => handleCategoryChange({ target: { value: 'mainCourse' } })}>
                                <img src={steack} alt="Стейк" />
                                Основное блюдо
                            </button>
                            <button className="category-button" onClick={() => handleCategoryChange({ target: { value: 'dessert' } })}>
                                <img src={pirog} alt="Десерт" />
                                Десерт
                            </button>
                            <button className="category-button" onClick={() => handleCategoryChange({ target: { value: 'salads' } })}>
                                <img src={cezar} alt="Салаты" />
                                Салаты
                            </button>
                            <button className="category-button" onClick={() => handleCategoryChange({ target: { value: 'drinks' } })}>
                                <img src={limonad} alt="Напитки" />
                                Напитки
                            </button>
                            <button className="category-button" onClick={() => handleCategoryChange({ target: { value: 'soups' } })}>
                                <img src={tomtosup} alt="Супы" />
                                Супы
                            </button>
                            <button className="category-button" onClick={() => handleCategoryChange({ target: { value: 'appetizers' } })}>
                                <img src={zakuski1} alt="Закуски" />
                                Закуски
                            </button>
                        </div>

                    </div>
                    {currentItem.category && (
                        <div>
                            <h3>Выбранная категория: {currentItem.category}</h3>
                            <span>Выберите блюдо:</span>
                            <div className="category-buttons">
                                {mockDishes[currentItem.category].map((dish) => (
                                    <button
                                        className="category-button"
                                        key={dish.title}
                                        onClick={() => handleDishChange(dish)}
                                    >
                                        <img src={dish.image} alt={dish.title} />
                                        {dish.title}
                                    </button>
                                ))}
                            </div>


                        </div>
                    )}
                    <div>
                        {currentItem.title && (
                            <div>
                                <h3>Выбранное блюдо: {currentItem.title}</h3>
                                <span>Выберите дополнения:</span>
                                <div className="category-buttons">
                                    {option.map((option) => (
                                        <button
                                            key={option}
                                            className={`category-button ${currentItem.option.includes(option) ? 'selected' : ''}`}
                                            onClick={() => handleAdditionChange(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>

                                {currentItem.option.length > 0 && (
                                    <div>
                                        <p>Выбранные дополнения: {currentItem.option.join(', ')}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className='buttonItem'>
                        <button className="buttonAdd" onClick={handleAddItem}>Добавить</button>
                        <button className="buttonClose" onClick={closeModal}>Закрыть</button>
                    </div>
                </Modal>


</div>
    )
};
export default ModalMenu;