import React from 'react'
import Union from '../image/Union.png'
import UnionCancel from '../image/UnionCancel.png'


export default function InfoTooltip(props) {

  return(
    <div className={`popup ${props.isOpen}`}>
      <div className="popup__page popup__page-item">
        <button className="popup__close popup__close-profile" aria-label="Закрытие редактирования профиля" onClick={props.onClose}/>
        <img src={props.onImageTooltip ? Union : UnionCancel} className='popup__checkout-image' alt="Сообщение о статусе входа/регистрации"/>
        <p className="popup__checkout-auth">{props.text}</p>
      </div>
    </div>
  )
}