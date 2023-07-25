import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

export default function Card(props) {

  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(card => card === currentUser._id);

  const cardLikeButtonClassName = (
    `content__card-like ${isLiked && 'content__card-like-active'}`
  );
  function handleCardClick() {
    props.onCardClick(props.card)
  }
  function handleLikeClick() {
    props.onCardLike(props.card)
  }
  function nandleDeleteCard() {
    props.onCardDelete(props.card._id)
  }

  return (<div className="content__card">
          <img className="content__card-photo" onClick={handleCardClick} src={props.card.link} alt={props.card.name} />
          <div className="content__card-info">
            <h2 className="content__card-name">{props.card.name}</h2>
            <div className="content__like-info">
              <button className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Поставить лайк"></button>
              <span className="content__like-value">{props.card.likes.length}</span>
            </div>
            {isOwn && <button className="content__card-delete" onClick={nandleDeleteCard} aria-label="Удалить карточку"></button>}
          </div>
        </div>
  )
}