import { useState } from "react";
import "./Card.css";

const getPresentAmountText = (amount, words) => {
  const value = Math.abs(amount) % 100;
  const num = value % 10;
  let numText;

  if (value > 4) {
    numText = words[2];
  } else if (num > 1 && num < 5) {
    numText = words[1];
  } else if (num === 1) {
    numText = words[0];
  }

  if (amount === 1) {
    return numText;
  }

  return `${amount} ${numText}`;
};

export default function Card({ item, onClick, isSelected, isDisabled }) {
  const [defaultText, setHoverText] = useState(false);

  const handleClick = () => {
    if (isSelected) {
      setHoverText(false);
    }
    onClick(item, item.id);
  };

  const handleMouseEnter = () => {
    if (!isSelected) {
      return;
    }
    setHoverText(true);
  };

  const handleMouseLeave = () => {
    if (!isSelected) return;
    setHoverText(false);
  };

  const showTextDescription = () => {
    if (isDisabled) {
      return item.isDisabledDescription;
    } else if (isSelected) {
      return item.itemDescription;
    } else {
      return (
        <>
          Чего сидишь? Порадуй котэ,{" "}
          <button
            onClick={handleClick}
            className="card-button"
          >
            купи
          </button>
          .
        </>
      );
    }
  };

  return (
    <div>
      <div
        className={`card-wrapper ${isSelected ? "card-wrapper-selected" : ""} ${
          isDisabled ? "card-wrapper card-wrapper-disabled" : "card-wrapper"
        }`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {defaultText ? (
          <>
            <span className="card-description-selected-leave">
              Котэ не одобряет?
            </span>
          </>
        ) : (
          <>
            <span className="card-description">Сказочное заморское яство</span>
          </>
        )}
        <h1 className="card-title">{item.title}</h1>
        <h2 className="card-subtitle">{item.subtitle}</h2>
        <span className="card-additional">{item.portions} порций</span>
        <br />
        <span className="card-additional">
          {getPresentAmountText(item.present, ["мышь", "мыши", "мышей"])} в
          подарок
        </span>
        <div
          className={
            isSelected
              ? "weight-info weight-info-selected"
              : "weight-info weight-info-default"
          }
        >
          <span className="weight-amount">{item.weightInfo}</span>
          <span className="weight-unit">кг</span>
        </div>
      </div>
      <p className="card-cta">{showTextDescription()}</p>
    </div>
  );
}
