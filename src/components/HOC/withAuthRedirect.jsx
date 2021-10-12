import React from 'react';
import {Redirect} from "react-router-dom";
import { connect } from "react-redux";

let mapStateToProps = (state) => ({
  isAuth: state.authState.isAuth
});

export const WithAuthRedirect = (Component) => {
    class ContainerWrapper extends React.Component {
        render() {
            if(!this.props.isAuth) return <Redirect to={"/login"}/>
            return <Component {...this.props} />
        }
    }

    return connect(mapStateToProps)(ContainerWrapper);
}

export default WithAuthRedirect;
