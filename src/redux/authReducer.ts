import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "app/auth/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "app/auth/GET-CAPTCHA-URL-SUCCESS";

// каждый раз так делать геморно (дополнять или если большой обьект и тд)
// export type InitialStateType = {
//     userId: number | null,
//     email: string | null,
//     userName: string | null,
//     isAuth: boolean,
//     captchaURL: string | null // if null, then captcha is not required
// }

let initialState = {
    userId: null as number | null, // если оставить просто null, то ТС будет ругаться когда в authReducer присобачим число (null as number | null == number | null)
    email: null as string | null,
    userName: null as string | null,
    isAuth: false,
    captchaURL: null as string | null // if null, then captcha is not required
};

export type InitialStateType = typeof initialState // так проще (ТС сам понимает какой тип данных)

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

export default authReducer;

type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    userName: string | null,
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

export const setUserAuthData = (userId: number | null, email: string| null, userName: string | null, isAuth: boolean): SetAuthUserDataActionType => (
    { type: SET_USER_DATA, payload: { userId, email, userName, isAuth } }
)

type GetCaptchaURLSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaURL: string }
}

export const getCaptchaURLSuccess = (captchaURL: string): GetCaptchaURLSuccessActionType => (
    { type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaURL } }
)

export const setUserData = () => async (dispatch: any) => {
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

export const login = (email: string, password: string, rememberMe?: boolean, captcha?: string) => async (dispatch: any) => {
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

export const getCaptchaURL = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaURL();
    const captchaURL = response.url;
    dispatch(getCaptchaURLSuccess(captchaURL));
};

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();

    if (response.resultCode === 0) {
        dispatch(setUserAuthData(null, null, null, false));
    }
};
