import React from 'react';
import {Redirect} from "react-router-dom";
import { connect } from "react-redux";

let mapStateToProps = (state) => ({
  isAuth: state.authState.isAuth
});

export const WithAuthRedirect = (Component) => {
    // const componentName = Component.WrappedComponent.name;
    class RedirectComponent extends React.Component {
        render() {
            if(!this.props.isAuth) return <Redirect to={"/login"}/>
            // return componentName === 'Login' ? <Redirect to={"/profile"} /> : <Component {...this.props} />
            return <Component {...this.props} />
        }
    }

    return connect(mapStateToProps)(RedirectComponent);
}

export default WithAuthRedirect;
