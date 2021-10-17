import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/profileReducer";
import Profile from "./Profile";
import {compose} from "redux";

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId ? this.props.match.params.userId : this.props.loggedInUser;
    if (!userId) {
      this.props.history.push('/login');
    } else {
      this.props.getUserProfile(userId);
      this.props.getUserStatus(userId);
    }
  }

  render() {
    return (
      <Profile {...this.props} />
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
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
    withRouter
)(ProfileContainer);
