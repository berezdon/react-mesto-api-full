import './styles/InfoTooltip.css';
import React from "react";

function InfoTooltip(props) {
  return(
    <section className={`popup-info ${props.isOpen && 'popup_opened'}`}>
      <div className="popup-info__container">
        <button type="button" onClick={props.onClose} className="popup__close-button" aria-label="Закрыть" />
        <img className="popup-info__union" src={props.infoTooltipValue.image} alt="информационный статус" />
        <p className="popup-info__text">{props.infoTooltipValue.text}</p>
      </div>
    </section>
  )
}

export default InfoTooltip
