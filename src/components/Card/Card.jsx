import { useCallback, useMemo, useState } from "react";
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

export default function Card({ item, onClick, isSelected }) {
  const { isDisabled, portions, presentAmount, weight, title, subtitle } = item;
  // [isHovered, setIsHovered]
  const [isHovered, setIsHovered] = useState(false);

  // лучше везде использовать useCallback для хэндлеров
  const handleClick = useCallback(() => {
    if (isSelected) {
      setIsHovered(false);
    }
    onClick(item);
  }, [item, isSelected, onClick]);

  const handleMouseEnter = useCallback(() => {
    if (!isSelected) return;

    setIsHovered(true);
  }, [isSelected]);

  const handleMouseLeave = useCallback(() => {
    if (!isSelected) return;

    setIsHovered(false);
  }, [isSelected]);

  const descriptionText = useMemo(() => {
    if (item.isDisabled) {
      return item.disabledDescription;
    } else if (isSelected) {
      return item.description;
    } else {
      return (
        <>
          Чего сидишь? Порадуй котэ,{" "}
          <button
            type="button"
            onClick={handleClick}
            className="card-button"
          >
            купи
          </button>
          .
        </>
      );
    }
  }, [item, isSelected, handleClick]);

  return (
    <div className="card-wrapper">
      <div
        className={`card${isSelected ? " card-selected" : ""}${
          isDisabled ? " card-disabled" : ""
        }`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered ? (
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
        <h1 className="card-title">{title}</h1>
        <h2 className="card-subtitle">{subtitle}</h2>
        <span className="card-additional">{portions} порций</span>
        <br />
        <span className="card-additional">
          {getPresentAmountText(presentAmount, ["мышь", "мыши", "мышей"])} в
          подарок
        </span>
        <div
          className={`weight-info${isDisabled ? " disabled" : ""}${
            isSelected ? " selected" : ""
          }`}
        >
          <span className="weight-amount">{weight}</span>
          <span className="weight-unit">кг</span>
        </div>
      </div>
      <p className="card-cta">{descriptionText}</p>
    </div>
  );
}
