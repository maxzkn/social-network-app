import React from "react";
import { connect } from "react-redux";
import {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

// const DialogsContainer = (props) => {

//   return <StoreContext.Consumer>
//     {
//       store => {

//         let onSendMessageClick = () => {
//           store.dispatch(sendMessageCreator());
//         };

//         let onNewMessageChange = (body) => {
//           store.dispatch(updateNewMessageBodyCreator(body));
//         };

//         return (
//           <Dialogs
//             dialogs={store.getState().dialogsPage.dialogs}
//             messages={store.getState().dialogsPage.messages}
//             sendMessage={onSendMessageClick}
//             updateNewMessageBody={onNewMessageChange}
//             newMessageBody={store.getState().dialogsPage.newMessageBody}
//           />
//         );
//       }
//     }
//   </StoreContext.Consumer>
// };

let mapStateToProps = (state) => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    newMessageBody: state.dialogsPage.newMessageBody
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyCreator(body));
    },
    sendMessage: () => {
      dispatch(sendMessageCreator());
    },
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
