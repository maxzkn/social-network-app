import React from 'react';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {FormControl} from "../common/FormControls/FormControls";
import {login} from "../../redux/authReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import WithAuthRedirect from "../HOC/withAuthRedirect";
import {Redirect} from "react-router-dom";
import styles from "../common/FormControls/FormControls.module.css";

const maxLength30 = maxLengthCreator(30);
const Input = FormControl("input");

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"}
                       name={"email"}
                       component={Input}
                       validate={[required, maxLength30]}
                />
            </div>
            <div>
                <Field placeholder={"Password"}
                       name={"password"}
                       component={Input}
                       type={"password"}
                       validate={[required, maxLength30]}
                />
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={Input} /> Remember me
            </div>
            {props.error &&
            <div className={styles.formSummaryError}>
                {props.error}
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
