import Card from "./components/Card/Card";
import { useState } from "react";

import "./App.css";
const items = [
  {
    id: 1,
    title: "Нямушка",
    subtitle: "с фуа-гра",
    portions: 10,
    presentAmount: 1,
    weight: "0,5",
    description: "Печень утки разварная с артишоками.",
    isDisabled: false,
    disabledDescription: "Печалька, с фуа-гра закончился.",
  },
  {
    id: 2,
    title: "Нямушка",
    subtitle: "с рыбой",
    portions: 40,
    presentAmount: 2,
    weight: 2,
    description: "Головы щучьи с чесноком да свежайшая сёмгушка.",
    isDisabled: false,
    disabledDescription: "Печалька, с рыбой закончился.",
  },
  {
    id: 3,
    title: "Нямушка",
    subtitle: "с курой",
    portions: 100,
    presentAmount: 5,
    weight: 5,
    description: "Филе из цыплят с трюфелями в бульоне. ",
    isDisabled: true,
    disabledDescription: "Печалька, с курой закончился.",
  },
];

function App() {
  const [cart, setCart] = useState([]);

  // лучше использовать useCallback для хэндлеров
  const handleClick = (item) => {
    if (item.isDisabled) {
      return;
    }

    const isItemInCart = cart.some((itemId) => itemId === item.id);

    if (isItemInCart) {
      setCart(cart.filter((itemId) => itemId !== item.id));
    } else {
      setCart([...cart, item.id]);
    }
  };

  return (
    <section className="products">
      <h2 className="products-title">Ты сегодня покормил кота?</h2>
      <ul className="products-list">
        {items.map((item) => (
          <li key={item.id}>
            <Card
              isSelected={cart.some((cartItem) => cartItem === item.id)}
              onClick={handleClick}
              item={item}
            ></Card>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;
