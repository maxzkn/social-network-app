import React from "react";
import landscape from "../../../assets/images/landscape.jpg";
import profileImage from "../../../assets/images/profile.jpg";
import Preloader from "../../common/preloader/Preloader";
import classes from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = ({ profile, updateUserStatus, userStatus }) => {

  if (!profile) {
    return <Preloader />;
  }

  let userImage = profile.photos.large;
  
  let showContacts = () => {
    let contacts = [];
    for (let [key, value] of Object.entries(profile.contacts)) {
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
          <img src={userImage ? userImage : profileImage}></img>
        </div>
        <ProfileStatus userStatus={userStatus} updateUserStatus={updateUserStatus} />
        <div>{profile.fullName}</div>
        <div>{profile.aboutMe}</div>
        <div>
          {showContacts()}
        </div>
        <div>
          <div>{profile.lookingForAJob ? 'Looking for a job: ' + profile.lookingForAJobDescription : 'Just for fun'}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
