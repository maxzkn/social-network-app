import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {getUserProfile, getUserStatus, saveProfilePhoto, updateUserStatus, saveProfile} from "../../redux/profileReducer";
import Profile from "./Profile";
import {compose} from "redux";

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.match.params.userId ? this.props.match.params.userId : this.props.loggedInUser;
    if (!userId) {
      this.props.history.push('/login');
    } else {
      this.props.getUserProfile(userId);
      this.props.getUserStatus(userId);
    }
  }

  // монтируется один раз когда попадаем на /profile или /profile/id
  componentDidMount() {
    this.refreshProfile();
  }

  // этот метод нужен потому что если с профайла чувака /profile/id нажать на свой profile, то мой профиль не покажется
  // потому что да, URL становится просто /profile, но компонента монтируется один раз (componentDidMount) и поэтому больше на изменение пропсов
  // не реагирует
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
          saveProfilePhoto={this.props.saveProfilePhoto}
          saveProfile={this.props.saveProfile}
          isOwner={!this.props.match.params.userId}
          {...this.props} />
    );
  }
};

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  userStatus: state.profilePage.userStatus,
  loggedInUser: state.authState.userId,
  isAuth: state.authState.isAuth
});

// let withRedirect = WithAuthRedirect(ProfileContainer)
//
// let ProfileContainerWithURL = withRouter(withRedirect)

// export default withRouter(WithAuthRedirect(connect(mapStateToProps, { setUserProfile, getUserProfile })(ProfileContainer)));
export default compose(
    connect(mapStateToProps, {
      getUserProfile,
      getUserStatus,
      updateUserStatus,
      saveProfilePhoto,
      saveProfile }),
    withRouter
)(ProfileContainer);
