import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  //Используем Реф для этого popup
  const avatar = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      //Благодаря ссылке на DOM элемент, мы можем через current обращаться к его свойствам
      avatar: avatar.current.value,
    });
  }

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар" textButton={props.textButton}
                   isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input ref={avatar} type="url" className="popup__input popup__input_profession_value-edit-avatar"
             placeholder="Ссылка на картинку" name="link" id="edit-avatar-input" required />
      <span className="popup__input-error edit-avatar-input-error">Вы пропустили это поле.</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
