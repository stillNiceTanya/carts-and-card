import Card from "./components/Card/Card";
import { useState } from "react";

import "./App.css";

const dataCard = [
  {
    id: 1,
    title: "Нямушка",
    subtitle: "с фуа-гра",
    portions: 10,
    present: 1,
    weightInfo: "0,5",
    itemDescription: "Печень утки разварная с артишоками.",
    isDisabled: false,
    isDisabledDescription: "Печалька, с фуа-гра закончился.",
  },
  {
    id: 2,
    title: "Нямушка",
    subtitle: "с рыбой",
    portions: 40,
    present: 2,
    weightInfo: 2,
    itemDescription: "Головы щучьи с чесноком да свежайшая сёмгушка.",
    isDisabled: false,
    isDisabledDescription: "Печалька, с рыбой закончился.",
  },
  {
    id: 3,
    title: "Нямушка",
    subtitle: "с курой",
    portions: 100,
    present: 5,
    weightInfo: 5,
    itemDescription: "Филе из цыплят с трюфелями в бульоне. ",
    isDisabled: true,
    isDisabledDescription: "Печалька, с курой закончился.",
  },
];

function App() {
  const [cart, updateCart] = useState([]);

  const handleClick = (item, id) => {
    if (item.isDisabled) {
      return;
    }
    const isItemInCart = cart.some((itemId) => itemId === id);
    if (isItemInCart) {
      updateCart(cart.filter((itemId) => itemId !== id));
    } else {
      updateCart([...cart, id]);
    }
  };

  return (
    <div className="cat-food-section">
      <section className="section-cta">
        <h2 className="cta-title">Ты сегодня покормил кота?</h2>
        <ul className="cta-cards">
          {dataCard.map((item) => (
            <li key={item.id}>
              <Card
                isDisabled={item.isDisabled}
                isSelected={cart.some((cartItem) => cartItem === item.id)}
                onClick={handleClick}
                item={item}
              ></Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
