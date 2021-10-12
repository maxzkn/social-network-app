import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "../Message/Message";
import classes from "./Dialogs.module.css";
import {Field, reduxForm} from "redux-form";

const Dialogs = (props) => {

  let dialogs = props.dialogs;
  let messages = props.messages;
  // let newMessageBody = props.newMessageBody;

  // let onSendMessageClick = () => {
  //   props.sendMessage();
  // }
  //
  // let onNewMessageChange = (e) => {
  //   let body = e.target.value;
  //   props.updateNewMessageBody(body);
  // }

  let addNewMessage = (formData) => {
    props.sendMessage(formData.newMessageBody);
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
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
          </div>
        </div>
  )
};

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"} name={"newMessageBody"} placeholder={"Enter your message"} />
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({
    form: "dialogAddMessageForm"
})(AddMessageForm)

export default Dialogs;
