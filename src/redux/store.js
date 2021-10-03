import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 5 },
        { id: 2, message: "It's my first post", likesCount: 20 },
      ],
      newPostText: "",
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "Max", src: "../../../assets/images/avatar.png" },
        { id: 2, name: "Lera", src: "../../../assets/images/avatar.png" },
        { id: 3, name: "Zheka", src: "../../../assets/images/avatar.png" },
        { id: 4, name: "Viktor", src: "../../../assets/images/avatar.png" },
        { id: 5, name: "JJ", src: "../../../assets/images/avatar.png" },
        { id: 6, name: "Batman", src: "../../../assets/images/avatar.png" },
      ],
      messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "Hi, how are u?" },
        { id: 3, message: "Fine, thanks" },
      ],
      newMessageBody: "",
    },
    sidebar: [
      { id: 1, name: "Max", src: "../../assets/images/avatar.png" },
      { id: 2, name: "Lera", src: "../../assets/images/avatar.png" },
      { id: 3, name: "Zheka", src: "../../assets/images/avatar.png" },
    ],
  },

  _callSubscriber() {
    console.log("State was changed.");
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  // setState(value) {
  //   this._state.profilePage.posts.push(value);
  //   this._state.profilePage.newPostText = "";
  // },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(store);
  },
};

export default store;
