import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { setUserData } from "../../redux/authReducer";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.setUserData();
  }

  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state) => ({
  isAuth: state.authState.isAuth,
  userName: state.authState.userName,
});

export default connect(mapStateToProps, { setUserData })(HeaderContainer);
