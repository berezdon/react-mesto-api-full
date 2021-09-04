import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {Route, Switch, useHistory} from 'react-router-dom';
import Header from './Header';
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import unionTrue from "../images/union.svg";
import unionFalse from "../images/unio_err.svg";
import * as auth from '../auth.js';
import {userExit} from "../auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isSingIn, setIsSingIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(
    {name: "",
      about: "",
      avatar: "",
      _id: "",
      cohort: ""}
  );
  const [textButton, setTextButton] = React.useState('Сохранить');
  const [textButtonAdd, setTextButtonAdd] = React.useState('Создать');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [infoTooltipValue, setInfoTooltipValue] = React.useState(
    {
      image: "",
      text: ""
    }
  );
  const [headerInfo, setHeaderInfo] = React.useState(
    {
      text: "Регистрация",
      path: "sign-up",
      email: "",
      out: false
    }
  );

  React.useEffect(() => {
    handleHeaderInfo(history.location.pathname.substr(1));
    api.getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isSingIn]);

  function handleInfoTooltipClick() {
    setIsInfoTooltipPopupOpen(true);
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
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function closeAllPopups() {
    isEditProfilePopupOpen && setIsEditProfilePopupOpen(false);
    isAddPlacePopupOpen && setIsAddPlacePopupOpen(false);
    isEditAvatarPopupOpen && setIsEditAvatarPopupOpen(false);
    selectedCard && setSelectedCard({});
    isInfoTooltipPopupOpen && setIsInfoTooltipPopupOpen(false);
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
  }, [isSingIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
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

  function handleSuccessfulRegistration() {
    setInfoTooltipValue(
      {
        image: unionTrue,
        text: "Вы успешно зарегистрировались!"
      }
    )
  }

  function handleFailedRegistration() {
    setInfoTooltipValue(
      {
        image: unionFalse,
        text: "Что-то пошло не так! Попробуйте ещё раз."
      }
    )
  }

  function handleHeaderInfo(path, email) {
    if (path === 'sign-up') {
      setHeaderInfo({
        text: "Войти",
        path: "sign-in",
        email: '',
        out: false
      })
    }
    if (path === 'sign-in') {
      setHeaderInfo({
        text: "Регистрация",
        path: "sign-up",
        email: '',
        out: false
      })
    }
    if (path === '/') {
      setHeaderInfo({
        text: "Выйти",
        path: "sign-in",
        email: email,
        out: true
      })
    }
  }

  function handleLogin (){
    setLoggedIn(true);
  }

  React.useEffect(() => {
    handleTokenCheck();
  },[])

  //вызовем один раз функцию проверки токена после монтирования
  const history = useHistory();

  function handleTokenCheck(){
    auth.checkToken().then((res) => {
      if (res){
        setLoggedIn(true);
        history.push('/');
        handleHeaderInfo('/', res.email);
        api.getInitialCards()
          .then((cards) => {
            setCards(cards);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function onSignOut (){
    auth.userExit()
      .then((mes) => {
        console.log(mes);
        history.push('/sign-in');
        setLoggedIn(false);
        handleHeaderInfo('sign-in');
      })

  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{loggedIn: loggedIn,
        handleLogin: handleLogin,
        currentUser: currentUser,
        isEditProfilePopupOpen: isEditProfilePopupOpen,
        onHeaderInfo: handleHeaderInfo,
        setIsSingIn: setIsSingIn
      }}>
        <Header headerInfo={headerInfo} signOut={onSignOut }/>
        <Switch>
          <ProtectedRoute exact path="/"
                          component={Main}
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
          <Route path="/sign-in">
            <Login />
          </Route>
          <Route path="/sign-up">
            <Register onInfoTooltip = {handleInfoTooltipClick}
                      onSuccessfulRegistration = {handleSuccessfulRegistration}
                      onFailedRegistration = {handleFailedRegistration}
                      onHeaderInfo={handleHeaderInfo}
                      headerInfo={headerInfo}
            />
            <InfoTooltip isOpen={isInfoTooltipPopupOpen}
                         onClose={closeAllPopups}
                         infoTooltipValue = {infoTooltipValue}
            />
          </Route>
        </Switch>
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
