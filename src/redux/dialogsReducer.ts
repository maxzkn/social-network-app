// const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

type DialogType = {
  id: number
  name: string
  src: string
}

type MessageType = {
  id: number
  message: string
}

let initialState = {
  dialogs: [
    { id: 1, name: "Max", src: "../../../assets/images/avatar.png" },
    { id: 2, name: "Lera", src: "../../../assets/images/avatar.png" },
    { id: 3, name: "Zheka", src: "../../../assets/images/avatar.png" },
    { id: 4, name: "Viktor", src: "../../../assets/images/avatar.png" },
    { id: 5, name: "JJ", src: "../../../assets/images/avatar.png" },
    { id: 6, name: "Batman", src: "../../../assets/images/avatar.png" },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "Hi, how are u?" },
    { id: 3, message: "Fine, thanks" },
  ] as Array<MessageType>,
  // newMessageBody: "",
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {

  switch (action.type) {
    // case UPDATE_NEW_MESSAGE_BODY:
    //   return {
    //     ...state,
    //     newMessageBody: action.newMessage,
    //   };
    //   state.dialogsPage.newMessageBody = action.newMessage;
    //   return state;
    case SEND_MESSAGE:
      return {
        ...state,
        // newMessageBody: "",
        messages: [...state.messages, { id: 6, message: action.newMessageBody }],
      };
    //   state.dialogsPage.messages.push(msg);
    //   state.dialogsPage.newMessageBody = "";
    //   return state;
    default:
      return state;
  }

};

export default dialogsReducer;

type SendMessageCreatorType = {
  type: typeof SEND_MESSAGE
  newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorType => ({ type: SEND_MESSAGE, newMessageBody });

// export const updateNewMessagenewMessageBodyCreator = (newMessageBody) => ({
//   type: UPDATE_NEW_MESSAGE_BODY,
//   newMessage: newMessageBody,
// });
