import React, {useState} from "react";
import landscape from "../../../assets/images/landscape.jpg";
import profileImage from "../../../assets/images/profile.jpg";
import Preloader from "../../common/preloader/Preloader";
import classes from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({ isOwner, profile, updateUserStatus, userStatus, saveProfilePhoto, saveProfile, globalError }) => {

  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  let userImage = profile.photos.large;
  
  // let showContacts = () => {
  //   let contacts = [];
  //   for (let [key, value] of Object.entries(profile.contacts)) {
  //     if (value) {
  //       contacts.push({key, value});
  //     }
  //   }
  //   return (
  //       <div>
  //         <b>My contacts: </b>
  //         <div>
  //           {contacts.length ? contacts.map( contact => <div key={contacts.indexOf(contact) + 1}>{contact.key}: {contact.value}</div> ) : 'No contacts'}
  //         </div>
  //       </div>
  //   );
  // }

  let onProfilePhotoSelected = (e) => {
    if (e.target.files.length) {
      saveProfilePhoto(e.target.files[0]);
    }
  }

  let onSubmit = (formData) => {
      // работает потому что возвращаем Promise.reject() из saveProfile
      saveProfile(formData)
          .then(() => setEditMode(false))
          .catch((error) => console.log(error));
  }

  return (
    <div>
      <div className={classes.heroImg}>
        <img src={landscape}></img>
      </div>
      {isOwner && <input type="file" onChange={onProfilePhotoSelected} />}
      <div className={classes.descriptionBlock}>
        <div className={classes.profileImg}>
          <img src={userImage || profileImage}></img>
        </div>
        <ProfileStatus userStatus={userStatus} updateUserStatus={updateUserStatus} globalError={globalError} />
        {editMode ?
            <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} /> :
            <ProfileData activateEditMode={() => {setEditMode(true)}} profile={profile} isOwner={isOwner} />}
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, activateEditMode }) => {
  return (
      <div>
        {isOwner && <div>
          <button onClick={activateEditMode}>Edit</button>
        </div>}
        <div>
            <div>
                <b>Full name: </b>{profile.fullName}
            </div>
            <div>
              <b>Looking for a job: </b>{profile.lookingForAJob ? 'Yes' : 'No'}
            </div>
            <div>
              <b>About me: </b>{profile.aboutMe}
            </div>
            <div>
              <b>My professional skills: </b> {profile.lookingForAJobDescription}
            </div>
            <div>
              {/*{showContacts()}*/}
              <b>My contacts: </b>
              {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
              })}
            </div>
        </div>
      </div>
  )
}

const Contact = ({ contactTitle, contactValue }) => {
  return <div className={classes.contacts}>
    <b>{contactTitle}: </b> {contactValue}
  </div>
}

export default ProfileInfo;
