import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";
import React from "react";

export default function AddPlacePopup(props) {

  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  React.useEffect(() => {
    setName('')
    setLink('')
  }, [props.isOpen])

  function onChangeName(e) {
    setName(e.target.value)
  }

  function onChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onAddPlace({
      name: name,
      link: link
    })
  }

  return (
    <PopupWithForm onClose={props.onClose} isOpen={props.isOpen ? "popup__opened" : ""} name="add_card" title="Новое место" buttonText="Создать" onSubmit={handleSubmit}>
      <input type="text" className="popup__name form__input" name="name" id="input-name-card" placeholder="Название" required minLength="2" maxLength="30" onChange={onChangeName} value={name} />
      <span className="popup__input-error input-name-card-error"></span>
      <input type="url" className="popup__note form__input" id="input-note-card" name="link" placeholder="Ссылка на картинку" required onChange={onChangeLink} value={link} />
      <span className="popup__input-error input-note-card-error"></span>
    </ PopupWithForm>
)
}