import React, {useState} from 'react';
import './App.css';
import ModalMenu from "./component/ModalMenu";
import Basket from "./component/Basket";
import WaitingList from "./component/waitingList";
const App = () => {
    const [cart, setCart] = useState([]);
    return (
        <div className='main-container'>
            <ModalMenu cart={cart} setCart={setCart} />
            <Basket cart={cart} setCart={setCart}  />
        <WaitingList />
          </div>

  );
};
export default App;
