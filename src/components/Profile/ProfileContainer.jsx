import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/profileReducer";
import Profile from "./Profile";
import WithAuthRedirect from "../HOC/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId ? this.props.match.params.userId : 13929;
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }

  render() {
    return (
      <Profile {...this.props} />
    );
  }
};

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  userStatus: state.profilePage.userStatus
});

// let withRedirect = WithAuthRedirect(ProfileContainer)
//
// let ProfileContainerWithURL = withRouter(withRedirect)

// export default withRouter(WithAuthRedirect(connect(mapStateToProps, { setUserProfile, getUserProfile })(ProfileContainer)));
export default compose(
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
    withRouter,
    // WithAuthRedirect
)(ProfileContainer);
