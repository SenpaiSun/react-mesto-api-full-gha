import React from "react";
import AuthPopup from "./AuthPopup";
import InfoTooltip from "./InfoTooltip";

export default function Register(props) {

  return(
    <>
      <AuthPopup title={'Регистрация'} confirmButton={'Зарегистрироваться'} titleHeader={props.titleHeader} redirect={props.redirect} onRegister={props.onRegister}/>
      <InfoTooltip isOpen={props.isOpen} onClose={props.onClose} onImageTooltip={props.onImageTooltip} text={props.text}/>
    </>
  )
}