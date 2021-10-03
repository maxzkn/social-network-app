import React from "react";
import { NavLink } from "react-router-dom";
import classes from './Navbar.module.css';

const Navbar = (props) => {

  // let friends = props.friends.sidebar;

  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to="/users" activeClassName={classes.active}>Users</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/profile" activeClassName={classes.active}>Profile</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/dialogs" activeClassName={classes.active}>Messages</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/news" activeClassName={classes.active}>News</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/music" activeClassName={classes.active}>Music</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/settings" activeClassName={classes.active}>Settings</NavLink>
      </div>
      <div>
        <h3>Friends</h3>
        <div style={{display: 'flex'}}>
          {/* {friends.map(friend => 
          <div key={friend.id}>
            {friend.name}
          </div>)} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
