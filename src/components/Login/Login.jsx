import React from 'react';
import {reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {createField, FormControl} from "../common/FormControls/FormControls";
import {login} from "../../redux/authReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import WithAuthRedirect from "../HOC/withAuthRedirect";
import {Redirect} from "react-router-dom";
import styles from "../common/FormControls/FormControls.module.css";

const maxLength30 = maxLengthCreator(30);
const Input = FormControl("input");

const LoginForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", Input, [required, maxLength30])}
            {createField("Password", "password", Input, [required, maxLength30], {type: "password"})}
            {createField(null, "rememberMe", Input, null, {type: "checkbox"}, "Remember me")}
            {error &&
            <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({
    // a unique name for the form (required)
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        const { email, password, rememberMe } = formData;
        props.login(email, password, rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

let mapStateToProps = (state) => ({
    isAuth: state.authState.isAuth
})

// login, logout - это не санк креаторы здесь а колбеки (login callback redux: login thunkcreator наш) которые попадают в пропсы Логин
// и там вызываются с аргументами (email, ...) а потом эти аргументы внутри редакс уже передает в наш login санк креатор и вызывает
export default compose(
    // WithAuthRedirect,
    connect(mapStateToProps, {login})
)(Login);
