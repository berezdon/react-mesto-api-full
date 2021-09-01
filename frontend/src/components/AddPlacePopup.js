import React from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({isOpen, onClose, onAddPlace, textButtonAdd}) {
  const name = React.useRef();
  const link = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: name.current.value,
      link: link.current.value,
    })
  }

  return (
    <PopupWithForm name="add" title="Новое место" textButton={textButtonAdd}
                   isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input ref={name} type="text" className="popup__input popup__input_firstname_value-add" placeholder="Название"
             name="firstname" id="title-input" required minLength="2" maxLength="30" />
      <span className="popup__input-error title-input-error">Вы пропустили это поле.</span>
      <input ref={link} type="url" className="popup__input popup__input_profession_value-add"
             placeholder="Ссылка на картинку" name="link" id="link-input" required />
      <span className="popup__input-error link-input-error">Вы пропустили это поле.</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup
