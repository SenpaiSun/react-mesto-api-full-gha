export default function ImagePopup(props) {
  return (
    <div className={`popup popup_open_image ${props.card ? "popup__opened" : ""}`}>
      <div className="popup__image-info popup__page-item">
        <button className="popup__close popup__close-image" onClick={props.onClose} aria-label="Закрытие просмотра изображения"></button>
        <img className="popup__full-image" src={props.card?.link} alt={props.card?.name} />
        <p className="popup__text">{props.card?.name}</p>
      </div>
    </div>
  )
}
