import React from "react";
import {createField, FormControl} from "../../common/FormControls/FormControls";
import {reduxForm} from "redux-form";
import classes from "./ProfileInfo.module.css";
import styles from "../../common/FormControls/FormControls.module.css";

const Input = FormControl("input");
const TextArea = FormControl("textarea");

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  // initialValues сама форма автоматом подхватывает если струтура нэймов совпадает с profile
  return (
      <form onSubmit={handleSubmit}>
        <div>
          <button>Save</button>
        </div>
        {error &&
        <div className={styles.formSummaryError}>
            {error}
        </div>}
        <div>
          <b>Full name: </b> {createField("Full name", "fullName", Input,[])}
        </div>
        <div>
          <div>
            <b>Looking for a job: </b> {createField("", "lookingForAJob", Input,[], {type: "checkbox"})}
          </div>
        </div>
        <div>
          <b>About me: </b> {createField("About me", "aboutMe", TextArea,[])}
        </div>
        <div>
          <b>My professional skills: </b> {createField("My professional skills", "lookingForAJobDescription", TextArea,[])}
        </div>
        <div>
          <b>My contacts: </b>
          {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={classes.contacts}>
                  <b>{key}: {createField(key, "contacts." + key, Input,[])}</b>
              </div>
          })}
        </div>
      </form>
  )
}

const ProfileDataReduxForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm)

export default ProfileDataReduxForm;
