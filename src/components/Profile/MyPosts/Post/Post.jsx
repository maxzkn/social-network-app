import React from "react";
import classes from "./Post.module.css";
import avatar from "../../../../assets/images/avatar.png";

const Post = (props) => {
  return (
    <div className={classes.item}>
      <img src={avatar} />
      {props.message}
      <div>
        <span> {props.likesCount} likes</span>
      </div>
    </div>
  );
};

export default Post;
