import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : 'element__like'}`;
  function handleClick(card) {
    onCardClick(card);
  }

  function handleLikeClick(card) {
    onCardLike(card);
  }

  function handleDeleteClick(card) {
    onCardDelete(card);
  }

  return(
    <div className="element" >
      <img onClick={() => handleClick(card)} className="element__photo" src={`${card.link}`} alt={`${card.name}`} />
      <button onClick={() => handleDeleteClick(card)} type="button" className={cardDeleteButtonClassName} aria-label="Удалить" />
      <div className="element__content">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like-content">
          <button onClick={() => handleLikeClick(card)} type="button" className={cardLikeButtonClassName} aria-label="Нравиться" />
          <p className="element__quantity-likes">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
