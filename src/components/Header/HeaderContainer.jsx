import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import {logout} from "../../redux/authReducer";

class HeaderContainer extends React.Component {
  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state) => ({
  isAuth: state.authState.isAuth,
  userName: state.authState.userName
});

export default connect(mapStateToProps, { logout })(HeaderContainer);
