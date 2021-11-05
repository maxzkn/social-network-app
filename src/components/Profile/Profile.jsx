import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

// const Profile = ({ profilePage: { posts, newPostText }, store }) => {
const Profile = (props) => {
  return (
    <div>
      <ProfileInfo profile={props.profile} userStatus={props.userStatus} updateUserStatus={props.updateUserStatus} />
      {/* <MyPosts posts={props.profilePage.posts} newPostText={props.profilePage.newPostText} addPost={props.store.addPost.bind(props.store)} updateNewPostText={props.store.updateNewPostText.bind(props.store)} /> */}
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
