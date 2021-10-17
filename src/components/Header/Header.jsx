import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={classes.header}>
        <img src={logo}></img>
        <div className={classes.right}>
            {props.isAuth ?
                <div>
                    {props.userName}
                    <div>
                        <button onClick={props.logout}>Logout</button>
                    </div>
                </div>
                :
                <NavLink to="/login">Login</NavLink>}
        </div>
    </header>
  );
};

export default Header;
