const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {

  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      return {
        ...state,
        newMessageBody: action.newMessage,
      };
    //   state.dialogsPage.newMessageBody = action.newMessage;
    //   return state;
    case SEND_MESSAGE:
      let body = state.newMessageBody;
      let msg = { id: 6, message: body };
      return {
        ...state,
        newMessageBody: "",
        messages: [...state.messages, msg],
      };
    //   state.dialogsPage.messages.push(msg);
    //   state.dialogsPage.newMessageBody = "";
    //   return state;
    default:
      return state;
  }

};

export default dialogsReducer;

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });

export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  newMessage: body,
});
