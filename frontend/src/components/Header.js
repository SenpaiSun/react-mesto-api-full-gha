import logo from '../image/mesto_logo.png';
import { Link, useLocation } from 'react-router-dom';
import {useWindowDimensions } from './useWindowDimensions'
import {HamburgerMenu} from './HamburgerMenu'
import React from 'react';

export default function Header(props) {
  const {width} = useWindowDimensions();
  const location = useLocation()
  const [isHamburgerMenu, setHamburgerMenu] = React.useState(false)

  React.useEffect(() => {
    if(width > 520) {
      setHamburgerMenu(false)
    }
  }, [width])

  function handleClickMenu() {
    setHamburgerMenu(!isHamburgerMenu)
  }
  return (
    <>
      {!isHamburgerMenu || width <= 520 && location.pathname === '/' && <div className='header header__reverse'>
        <p className="header__text">{props.email}</p>
        <Link className="header__text header__text-exit" to={props.redirect} onClick={props.onClick}>{props.titleHeader}</Link>
        <hr className="header__line" />
      </div>}
      <header className={`header ${isHamburgerMenu && `header__padding`}`}>
        <img src={logo} className="header__logo" alt="Логотип сервиса Место" />
        <div className="header__container">
        {width < 520 && location.pathname === '/' ? (
        <HamburgerMenu onClick={handleClickMenu}/>) : (
          <>
            <p className="header__text">{props.email}</p>
            <Link className={`header__text ${location.pathname === '/' ? 'header__text-exit' : ''}`} to={props.redirect} onClick={props.onClick}>{props.titleHeader}</Link>
            </>
          )}
        </div>
      </header>
      <hr className="header__line" />
    </>
  )
}
/*<p className="header__text">{props.email}</p>
          <Link className="header__text" to={props.redirect} onClick={props.onClick}>{props.titleHeader}</Link>
          { <hr className="header__line" /> }*/