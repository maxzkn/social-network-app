import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {FormControl} from "../../common/FormControls/FormControls";

const maxLength30 = maxLengthCreator(30);
const Textarea = FormControl("textarea");

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

// we don't need to use memo anymore, since now React works like this automatically and renders only once if props didn't change
// const MyPosts = React.memo((props) => {
//   let posts = props.posts;
//   // let newPostText = props.newPostText;
//
//   // let newPostElement = React.createRef();
//
//   let addPost = (formData) => {
//     props.addPost(formData.newPost);
//   }
//
//   // let onPostChange = () => {
//   //   let text = newPostElement.current.value;
//   //   props.updateNewPostText(text);
//   // }
//
//   // let onPostChange = (e) => {
//   //   updateNewPostText(e.target.value);
//   // }
//
//   return (
//     <div className={classes.postsBlock}>
//       <h3>My Posts</h3>
//       <div>
//         <div>
//           {/* <textarea onChange={ (e) => onPostChange(e) } ref={newPostElement} value={props.newPostText}></textarea> */}
//           {/*<textarea onChange={ onPostChange } ref={ newPostElement } value={ newPostText }></textarea>*/}
//           <AddPostFormRedux onSubmit={addPost} />
//         </div>
//       </div>
//       <div className={classes.posts}>
//         {posts.map((post, idx) => <Post key={idx} message={post.message} likesCount={post.likesCount} />)}
//       </div>
//     </div>
//   );
// });

// class MyPosts extends React.Component {
//     shouldComponentUpdate(nextProps, nextState, nextContext) {
//         console.log(nextProps)
//         console.log(this.props)
//         return nextProps !== this.props || nextState !== this.state;
//     }
//
//     render() {
//         console.log("render")
//         let posts = this.props.posts;
//
//         let addPost = (formData) => {
//             this.props.addPost(formData.newPost);
//         }
//
//         return (
//             <div className={classes.postsBlock}>
//               <h3>My Posts</h3>
//               <div>
//                 <div>
//                   {/* <textarea onChange={ (e) => onPostChange(e) } ref={newPostElement} value={props.newPostText}></textarea> */}
//                   {/*<textarea onChange={ onPostChange } ref={ newPostElement } value={ newPostText }></textarea>*/}
//                   <AddPostFormRedux onSubmit={addPost} />
//                 </div>
//               </div>
//               <div className={classes.posts}>
//                 {posts.map((post, idx) => <Post key={idx} message={post.message} likesCount={post.likesCount} />)}
//               </div>
//             </div>
//         );
//     };
// };

// class MyPosts extends React.PureComponent {
//     // we don't need this check anymore bc PureComponent does this automatically
//     // shouldComponentUpdate(nextProps, nextState, nextContext) {
//     //     console.log(nextProps)
//     //     console.log(this.props)
//     //     return nextProps !== this.props || nextState !== this.state;
//     // }
//
//     render() {
//         console.log("render")
//         let posts = this.props.posts;
//
//         let addPost = (formData) => {
//             this.props.addPost(formData.newPost);
//         }
//
//         return (
//             <div className={classes.postsBlock}>
//               <h3>My Posts</h3>
//               <div>
//                 <div>
//                   {/* <textarea onChange={ (e) => onPostChange(e) } ref={newPostElement} value={props.newPostText}></textarea> */}
//                   {/*<textarea onChange={ onPostChange } ref={ newPostElement } value={ newPostText }></textarea>*/}
//                   <AddPostFormRedux onSubmit={addPost} />
//                 </div>
//               </div>
//               <div className={classes.posts}>
//                 {posts.map((post, idx) => <Post key={idx} message={post.message} likesCount={post.likesCount} />)}
//               </div>
//             </div>
//         );
//     };
// };

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea}
                   name={"newPost"}
                   placeholder={"Add your post here"}
                   validate={[required, maxLength30]}
            />
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
