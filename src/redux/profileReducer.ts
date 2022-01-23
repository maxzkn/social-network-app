import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE-PHOTO-SUCCESS";
const SHOW_GLOBAL_ERROR = "SHOW-GLOBAL-ERROR";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 5 },
    { id: 2, message: "It's my first post", likesCount: 20 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  userStatus: "",
  globalError: null
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state, profile: { ...state.profile, photos: action.photos } as ProfileType,
      }
    case SHOW_GLOBAL_ERROR:
      return {
        ...state, globalError: action.error,
      }
    default:
      return state;
  }
};

export default profileReducer;

type AddPostCreatorActionType = {
  type: typeof ADD_POST
  newPost: string
}

export const addPostCreator = (newPost: string): AddPostCreatorActionType => ({ type: ADD_POST, newPost });

type DeletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}

export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId });

type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos });

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})

type SetUserStatusActionType = {
  type: typeof SET_USER_STATUS
  status: string
}

export const setUserStatus = (status: string): SetUserStatusActionType => ({type: SET_USER_STATUS, status})

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getUserProfile(userId);
  dispatch(setUserProfile(response));
}

export const getUserStatus = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getUserStatus(userId);
  dispatch(setUserStatus(response));
}

const showError = (error: any) => ({type: SHOW_GLOBAL_ERROR, error})

export const updateUserStatus = (status: string) => async (dispatch: any) => {
  try {
    const response = await profileAPI.updateUserStatus(status);

    if (response.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
  } catch(error) {
    dispatch(showError(error));
  }
}

export const saveProfilePhoto = (file: any) => async (dispatch: any) => {
  const response = await profileAPI.saveProfilePhoto(file);

  if (response.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.photos));
  }
}

export const saveProfile = (profileData: ProfileType) => async (dispatch: any, getState: any) => {
  const userId = getState().authState.userId;
  const response = await profileAPI.saveProfile(profileData);

  if (response.resultCode === 0) {
      dispatch(getUserProfile(userId));
  } else {
    const errors = response.messages;
    const fields = errors.map((error: string) => [error.slice(error.indexOf(">") + 1, error.indexOf(")")).toLowerCase(), error]);
    const fieldsWithErrors = Object.fromEntries(fields);
    dispatch(stopSubmit("edit-profile", {"contacts": fieldsWithErrors}));
    return Promise.reject(fieldsWithErrors);
  }
}

