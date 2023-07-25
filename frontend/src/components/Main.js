import React from "react"
import Card from "./Card"
import {CurrentUserContext} from '../contexts/CurrentUserContext'

export default function Main(props) {

  const currentUser = React.useContext(CurrentUserContext)
  return (
    <main>
      <section className="profile">
        <img className="profile__photo" src={currentUser.avatar} alt="Аватар пользователя" />
        <button className="profile__button" onClick={props.onEditAvatar}></button>
        <div className="profile__info">
          <div className="profile__info-profile">
            <h1 className="profile__info-username">{currentUser.name}</h1>
            <button className="profile__info-edit" onClick={props.onEditProfile} aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__info-note">{currentUser.about}</p>
        </div>
        <button className="profile__added" onClick={props.onAddPlace} aria-label="Добавить публикацию"></button>
      </section>
      <div className="content">
        {props.onCards.map((card) => (
          <Card
            key={card._id}
            onCardClick={props.onCardClick}
            card={card}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />)
          )}
      </div>
    </main>
  )
}