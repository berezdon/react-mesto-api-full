import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const value = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(value.currentUser.name);
    setDescription(value.currentUser.about);
  }, [value.isEditProfilePopupOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" textButton={props.textButton}
                   isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input onChange={handleChangeName} type="text" value={name}
             className="popup__input popup__input_firstname_value-edit" placeholder="Имя"
             name="firstname" id="name-input" required minLength="2" maxLength="40" />
      <span className="popup__input-error name-input-error">Вы пропустили это поле.</span>
      <input onChange={handleChangeDescription} type="text" value={description}
             className="popup__input popup__input_profession_value-edit" placeholder="О себе"
             name="profession" id="profession-input" required minLength="2" maxLength="200" />
      <span className="popup__input-error profession-input-error">Вы пропустили это поле.</span>
    </PopupWithForm>
    )
}

export default EditProfilePopup
