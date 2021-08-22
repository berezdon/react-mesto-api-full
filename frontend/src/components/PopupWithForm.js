import React from "react";

function PopupWithForm(props) {
  return (
      <section className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
        <form onSubmit={props.onSubmit} name={`popup_${props.name}`} className={`popup__container popup__container_${props.name}`} noValidate>
          <button type="button" onClick={props.onClose} className="popup__close-button" aria-label="Закрыть" />
          <h2 className="popup__title">{`${props.title}`}</h2>
          {props.children}
          <button name={`save-button-${props.name}`} type="submit" className="popup__save-button" aria-label={`${props.textButton}`}>
            {props.textButton}
          </button>
        </form>
      </section>
  )
}

export default PopupWithForm
