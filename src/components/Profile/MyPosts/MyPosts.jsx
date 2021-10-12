import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";

// const MyPosts = ({ posts, newPostText, addPost, updateNewPostText }) => {
const MyPosts = (props) => {
  
  let posts = props.posts;
  // let newPostText = props.newPostText;

  // let newPostElement = React.createRef();

  let addPost = (formData) => {
    props.addPost(formData.newPost);
  }

  // let onPostChange = () => {
  //   let text = newPostElement.current.value;
  //   props.updateNewPostText(text);
  // }

  // let onPostChange = (e) => {
  //   updateNewPostText(e.target.value);
  // }

  return (
    <div className={classes.postsBlock}>
      <h3>My Posts</h3>
      <div>
        <div>
          {/* <textarea onChange={ (e) => onPostChange(e) } ref={newPostElement} value={props.newPostText}></textarea> */}
          {/*<textarea onChange={ onPostChange } ref={ newPostElement } value={ newPostText }></textarea>*/}
          <AddPostFormRedux onSubmit={addPost} />
        </div>
      </div>
      <div className={classes.posts}>
        {posts.map((post, idx) => <Post key={idx} message={post.message} likesCount={post.likesCount} />)}
      </div>
    </div>
  );
};

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={"textarea"} name={"newPost"} placeholder={"Add your post here"} />
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
};

const AddPostFormRedux = reduxForm({
    form: "addPostForm"
})(AddPostForm)

export default MyPosts;
