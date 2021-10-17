import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET-USER-DATA"

let initialState = {
  userId: null,
  email: null,
  userName: null,
  isAuth: false
};

const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};

export default authReducer;

export const setUserAuthData = (userId, email, userName, isAuth) => (
    {type: SET_USER_DATA, payload: {userId, email, userName, isAuth}}
)

export const setUserData = () => (dispatch) => {
    return authAPI.authenticateMe().then( data => {
        if (data.resultCode === 0) {
          let { id, email, login } = data.data;
          dispatch(setUserAuthData(id, email, login, true));
        }
      });
};

export const login = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe).then( data => {
        if (data.resultCode === 0) {
          dispatch(setUserData());
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : "Some error";
            // _error is common error
            dispatch(stopSubmit("login", {_error: message}));
        }
      });
};

export const logout = () => (dispatch) => {
  authAPI.logout().then( data => {
        if (data.resultCode === 0) {
          dispatch(setUserAuthData(null, null, null, false));
        }
      });
}
