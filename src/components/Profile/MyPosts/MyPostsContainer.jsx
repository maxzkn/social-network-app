import React from "react";
import { connect } from "react-redux";
import { addPostCreator } from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";

// const MyPostsContainer = (props) => {
//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         let addPost = () => {
//           store.dispatch(addPostCreator());
//         };

//         let onPostChange = (text) => {
//           store.dispatch(updateNewPostTextCreator(text));
//         };

//         return (
//           <MyPosts
//             posts={store.getState().profilePage.posts}
//             newPostText={store.getState().profilePage.newPostText}
//             addPost={addPost}
//             updateNewPostText={onPostChange}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };

let mapStateToProps = (state) => ({
  posts: state.profilePage.posts,
  newPostText: state.profilePage.newPostText
});

let mapDispatchToProps = (dispatch) => ({
  addPost: (newPost) => {
    dispatch(addPostCreator(newPost));
  },
  // updateNewPostText: (text) => {
  //   dispatch(updateNewPostTextCreator(text));
  // }
});

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
