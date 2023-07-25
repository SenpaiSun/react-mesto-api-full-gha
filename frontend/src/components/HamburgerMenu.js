import React from "react";


export function HamburgerMenu(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    props.onClick();
  };

  return (
    <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={handleClick}>
      <div className="hamburger-menu__line hamburger-menu__top"/>
      {isOpen ? null : <div className="hamburger-menu__line hamburger-menu__mid" />}
      <div className="hamburger-menu__line hamburger-menu__bot"/>
    </div>
  )
}