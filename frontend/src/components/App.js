import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from './Header';
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import api from "../utils/api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState(
    {name: "",
      about: "",
      avatar: "",
      _id: "",
      cohort: ""}
  );

  const [textButton, setTextButton] = React.useState('Сохранить');
  const [textButtonAdd, setTextButtonAdd] = React.useState('Создать');

  React.useEffect(() => {
    api.getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card){
    setSelectedCard(card);
  }

  function closeAllPopups() {
    isEditProfilePopupOpen && setIsEditProfilePopupOpen(false);
    isAddPlacePopupOpen && setIsAddPlacePopupOpen(false);
    isEditAvatarPopupOpen && setIsEditAvatarPopupOpen(false);
    selectedCard && setSelectedCard({});
  }

  function handleUpdateUser(obj) {
    setTextButton('Сохранение...')
    api.patchUserData(obj.name, obj.about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setTextButton('Сохранить'));
  }

  function handleUpdateAvatar(obj) {
    setTextButton('Сохранение...')
    api.patchUserAvatar(obj.avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setTextButton('Сохранить'));
  }

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((stateCard) => stateCard._id === card._id ? newCard : stateCard));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((stateCard) => stateCard._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(initialCard) {
    setTextButtonAdd('Сохранение...')
    api.postNewCard(initialCard)
      .then((newCard) => {
        //При добавлении новой карточки, используем этот подход
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setTextButtonAdd('Создать'));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          selectedCard={selectedCard}
          handleCardClick={handleCardClick}
          onClose={closeAllPopups}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                          onUpdateUser={(obj) => handleUpdateUser(obj)} textButton={textButton}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                       onAddPlace={(initialCard) => handleAddPlaceSubmit(initialCard)} textButtonAdd={textButtonAdd}/>
        <DeletePlacePopup />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                         onUpdateAvatar={(obj) => handleUpdateAvatar(obj)} textButton={textButton}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
