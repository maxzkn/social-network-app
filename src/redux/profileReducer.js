const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 5 },
    { id: 2, message: "It's my first post", likesCount: 20 },
  ],
  newPostText: "",
  profile: null
};

const profileReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 101,
      };
      // this.setState(newPost);
      return {
        ...state,
        newPostText: '',
        posts: [...state.posts, newPost]
      }
      //   state.profilePage.posts.push(newPost);
      //   state.profilePage.newPostText = "";
      //   return state;
    case UPDATE_NEW_POST_TEXT:
      //   stateCopy.profilePage.posts = [...state.profilePage.posts];
      return {
          ...state,
          newPostText: action.newText
      }
      //   state.profilePage.newPostText = action.newText;
      //   return state;
    case SET_USER_PROFILE:
      return {
        ...state, profile: action.profile,
      }
    default:
      return state;
  }
};

export default profileReducer;

export const addPostCreator = () => ({ type: ADD_POST });

export const updateNewPostTextCreator = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
  };
};

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
