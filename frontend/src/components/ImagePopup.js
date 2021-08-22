function ImagePopup(props) {
   return (
     <section className={`popup popup_zoom ${props.card.name && 'popup_opened'}`}>
       <div className="popup__container-zoom">
         <button onClick={props.onClose} type="button" className="popup__close-button popup__close-button_image"
                 aria-label="Закрыть" />
         <img className="popup__image" src={`${props.card.link}`} alt="Картинка для Popup" />
         <h2 className="popup__title popup__title_image">{props.card.name}</h2>
       </div>
     </section>
  )
}

export default ImagePopup
