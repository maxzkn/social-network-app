import React from "react";
import landscape from "../../../assets/images/landscape.jpg";
import profile from "../../../assets/images/profile.jpg";
import Preloader from "../../common/preloader/Preloader";
import classes from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {

  if (!props.profile) {
    return <Preloader />;
  }

  let userImage = props.profile.photos.large;
  
  let showContacts = () => {
    let contacts = [];
    for (let [key, value] of Object.entries(props.profile.contacts)) {
      if (value) {
        contacts.push({key, value});
      }
    }
    return contacts.length ? contacts.map( contact => <div key={contacts.indexOf(contact) + 1}>{contact.key}: {contact.value}</div> ) : 'No contacts';
  }

  return (
    <div>
      <div className={classes.heroImg}>
        <img src={landscape}></img>
      </div>
      <div className={classes.descriptionBlock}>
        <div className={classes.profileImg}>
          <img src={userImage ? userImage : profile}></img>
        </div>
        <div>{props.profile.fullName}</div>
        <div>{props.profile.aboutMe}</div>
        <div>
          {showContacts()}
        </div>
        <div>
          <div>{props.profile.lookingForAJob ? 'Looking for a job: ' + props.profile.lookingForAJobDescription : 'Just for fun'}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
