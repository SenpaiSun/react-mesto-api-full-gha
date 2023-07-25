import React from "react";
import AuthPopup from "./AuthPopup"
import InfoTooltip from "./InfoTooltip";


export default function Login(props) {
  return (
    <>
      <AuthPopup title={'Вход'} confirmButton={'Войти'} titleHeader={props.titleHeader} redirect={props.redirect} onLogin={props.onLogin} onImageTooltip={props.onImageTooltip}/>
      <InfoTooltip isOpen={props.isOpen} onClose={props.onClose} onImageTooltip={props.onImageTooltip} text={props.text}/>
    </>
  )
}