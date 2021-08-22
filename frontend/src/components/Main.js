import React from 'react';
import editImage from "../images/edit-image.svg";
import ImagePopup from "./ImagePopup";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__position">
          <div onClick={props.onEditAvatar} className="profile__avatar"
               style={{ backgroundImage: `url(${currentUser.avatar})` }}>
            <img className="profile__avatar-edit-image" src={editImage} alt="Изменить фотографию"/>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} type="button" className="profile__edit-button" aria-label="Редактировать"/>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={props.onAddPlace} type="button" className="profile__add-button" aria-label="Добавить" />
      </section>
      <section className="elements">
        {props.cards.map((card, i) => (
          <Card key={card._id} card={card}
                onCardClick={(card) => props.handleCardClick(card)}
                onCardLike={() => props.onCardLike(card)}
                onCardDelete={() => props.onCardDelete(card)}
          />
        ))}
      </section>
      <ImagePopup card={props.selectedCard} onClose={props.onClose}/>
    </main>
  )
}

export default Main
