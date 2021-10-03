import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { profileAPI } from "../../api/api";
import { setUserProfile } from "../../redux/profileReducer";
import Profile from "./Profile";

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) userId = 2;
    profileAPI.getUserProfile(userId).then(
      data => {
        this.props.setUserProfile(data);
      }
    )
  }

  render() {
    return (
      <Profile {...this.props} />
    );
  }
};

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

let ProfileContainerWithURL = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(ProfileContainerWithURL);
