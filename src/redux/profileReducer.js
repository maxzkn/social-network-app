import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 5 },
    { id: 2, message: "It's my first post", likesCount: 20 },
  ],
  profile: null,
  userStatus: ""
};

const profileReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: action.newPost,
        likesCount: 101,
      };
      // this.setState(newPost);
      return {
        ...state,
        // newPostText: '',
        posts: [...state.posts, newPost]
      }
      //   state.profilePage.posts.push(newPost);
      //   state.profilePage.newPostText = "";
      //   return state;
    case SET_USER_PROFILE:
      return {
        ...state, profile: action.profile,
      }
    case SET_USER_STATUS:
      return {
        ...state, userStatus: action.status,
      }
    default:
      return state;
  }
};

export default profileReducer;

export const addPostCreator = (newPost) => ({ type: ADD_POST, newPost });

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status})

export const getUserProfile = userId => dispatch => {
  profileAPI.getUserProfile(userId).then(
      data => {
        dispatch(setUserProfile(data));
      }
    )
}

export const getUserStatus = userId => dispatch => {
  profileAPI.getUserStatus(userId).then(
      data => {
        dispatch(setUserStatus(data));
      }
  )
}

export const updateUserStatus = status => dispatch => {
  profileAPI.updateUserStatus(status).then(
      data => {
        dispatch(setUserStatus(status));
      }
  )
}
