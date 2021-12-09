import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "app/auth/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "app/auth/GET-CAPTCHA-URL-SUCCESS";

let initialState = {
    userId: null,
    email: null,
    userName: null,
    isAuth: false,
    captchaURL: null // if null, then captcha is not required
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaURL: action.payload
            }
        default:
            return state;
    }
};

export default authReducer;

export const setUserAuthData = (userId, email, userName, isAuth) => (
    {type: SET_USER_DATA, payload: {userId, email, userName, isAuth}}
)

export const getCaptchaURLSuccess = (captchaURL) => (
    {type: GET_CAPTCHA_URL_SUCCESS, payload: captchaURL}
)

export const setUserData = () => async (dispatch) => {
    // return authAPI.authenticateMe().then( data => {
    //     if (data.resultCode === 0) {
    //       let { id, email, login } = data.data;
    //       dispatch(setUserAuthData(id, email, login, true));
    //     }
    //   });

    let response = await authAPI.authenticateMe();

    if (response.resultCode === 0) {
        let {id, email, login} = response.data;
        dispatch(setUserAuthData(id, email, login, true));
    }
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.resultCode === 0) {
        dispatch(setUserData());
    } else {
        if (response.resultCode === 10) {
            dispatch(getCaptchaURL());
        }

        let message = response.messages.length > 0 ? response.messages[0] : "Some error";
        // _error is common error
        dispatch(stopSubmit("login", {_error: message}));
    }
};

export const getCaptchaURL = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaURL();
    const captchaURL = response.url;
    dispatch(getCaptchaURLSuccess(captchaURL));
};

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();

    if (response.resultCode === 0) {
        dispatch(setUserAuthData(null, null, null, false));
    }
};
