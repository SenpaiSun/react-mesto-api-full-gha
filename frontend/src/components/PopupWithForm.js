import React from 'react';
import { AppContext } from '../contexts/AppContext';

export default function PopupWithForm(props) {

  const { isLoading } = React.useContext(AppContext)

  return (
    <div className={`popup popup_${props.name} ${props.isOpen}`}>
      <div className="popup__page popup__page-item">
        <button onClick={props.onClose} className="popup__close popup__close-profile" aria-label="Закрытие редактирования профиля" />
        <p className="popup__title">{props.title}</p>
        <form className="popup__form form" name={`form-${props.name}`} id="form-profile" onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__save popup__save-profile" aria-label="Сабмит формы" >{isLoading? 'Сохранение...' : props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}