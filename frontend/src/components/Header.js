import logo from "../images/logo.svg";
import "./styles/Header.css"
import {Link} from "react-router-dom";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Header({headerInfo, onHeaderInfo, signOut}) {
  const value = React.useContext(CurrentUserContext);
  return(
    <header className="header">
      <img className="logo" src={logo} alt="Логотип Места России" />
      <div className="header__info">
        <p className="header__email">{headerInfo.email}</p>
        <Link onClick={() => headerInfo.out ? signOut() : value.onHeaderInfo(headerInfo.path)}
              to={`${headerInfo.path}`} className="header__link">{headerInfo.text}</Link>
      </div>
    </header>
  )
}

export default Header
