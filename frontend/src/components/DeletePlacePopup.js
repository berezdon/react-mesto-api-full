import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup() {
  return (
    <PopupWithForm name="del" title="Вы уверены?" textButton="Да">
      <p className="popup__title-image-id" />
    </PopupWithForm>
  )
}

export default DeletePlacePopup
