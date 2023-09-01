import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import Modal from 'react-modal'; // Библиотека для модальных окон
import App from "./App";

// Создаем хранилище Redux
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// Настраиваем модальные окна
Modal.setAppElement('#root'); // Идентификатор корневого элемента вашего приложения

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
