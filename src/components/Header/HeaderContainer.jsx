import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { setUserAuthData } from "../../redux/authReducer";
import { authAPI } from "../../api/api";

class HeaderContainer extends React.Component {
  componentDidMount() {
    authAPI.authenticateUser().then( data => {
        if (data.resultCode === 0) {
          let { id, email, login } = data.data;
          this.props.setUserAuthData(id, email, login);
        }
      });
  }

  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state) => ({
  isAuth: state.authState.isAuth,
  userName: state.authState.userName,
});

export default connect(mapStateToProps, { setUserAuthData })(HeaderContainer);
