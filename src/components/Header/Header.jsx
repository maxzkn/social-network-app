import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={classes.header}>
        <img src={logo}></img>
      <span>
        {props.isAuth ? props.userName : <NavLink to="/login">Login</NavLink>}
      </span>
    </header>
  );
};

export default Header;
