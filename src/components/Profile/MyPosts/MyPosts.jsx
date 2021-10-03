import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";

// const MyPosts = ({ posts, newPostText, addPost, updateNewPostText }) => {
const MyPosts = (props) => {
  
  let posts = props.posts;
  let newPostText = props.newPostText;

  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  }

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  }

  // let onPostChange = (e) => {
  //   updateNewPostText(e.target.value);
  // }

  return (
    <div className={classes.postsBlock}>
      <h3>My Posts</h3>
      <div>
        <div>
          {/* <textarea onChange={ (e) => onPostChange(e) } ref={newPostElement} value={props.newPostText}></textarea> */}
          <textarea onChange={ onPostChange } ref={ newPostElement } value={ newPostText }></textarea>
        </div>
        <div>
          <button onClick={ onAddPost }>Add post</button>
        </div>
      </div>
      <div className={classes.posts}>
        {posts.map((post, idx) => <Post key={idx} message={post.message} likesCount={post.likesCount} />)}
      </div>
    </div>
  );
};

export default MyPosts;
