import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./DialogItem.module.css";

const DialogItem = (props) => {

  let path = "/dialogs/" + props.id;
  
  return (
    <div className={`${classes.dialog} ${classes.active}`}>
      <NavLink to={path}>
        {/* <img src={require(`${props.src}`)} alt="user-avatar"/> */}
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
