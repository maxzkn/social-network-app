import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "../Message/Message";
import classes from "./Dialogs.module.css";

const Dialogs = (props) => {

  let dialogs = props.dialogs;
  let messages = props.messages;
  let newMessageBody = props.newMessageBody;

  let onSendMessageClick = () => {
    props.sendMessage();
  }

  let onNewMessageChange = (e) => {
    let body = e.target.value;
    props.updateNewMessageBody(body);
  }

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogItems}>
        {dialogs.map( user => <DialogItem key={user.id} name={user.name} id={user.id} src={user.src} /> )}
      </div>
      <div className={classes.messages}>
        <div>
          {messages.map( message => <Message key={message.id} message={message.message} /> )}
        </div>
        <div>
          <div><textarea onChange={ onNewMessageChange } value={ newMessageBody } placeholder='Enter your message'></textarea></div>
          <div><button onClick={ onSendMessageClick }>Send message</button></div>
        </div>
      </div>
    </div>
  )
};

export default Dialogs;
