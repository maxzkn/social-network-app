import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE-POST";
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
    case DELETE_POST:
      return {
        ...state, posts: state.posts.filter(post => post.id !== action.postId),
      }
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
export const deletePost = (postId) => ({ type: DELETE_POST, postId });

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status})

export const getUserProfile = userId => async (dispatch) => {
  let response = await profileAPI.getUserProfile(userId);
  dispatch(setUserProfile(response));
}

export const getUserStatus = userId => async (dispatch) => {
  let response = await profileAPI.getUserStatus(userId);
  dispatch(setUserStatus(response));
}

export const updateUserStatus = status => async (dispatch) => {
  await profileAPI.updateUserStatus(status);
  dispatch(setUserStatus(status));
}
