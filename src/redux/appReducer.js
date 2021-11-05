import {setUserData} from "./authReducer";

const SET_INITIALIZED = "SET-INITIALIZED"

let initialState = {
  initialized: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true
      }
    default:
      return state;
  }
};

export default appReducer;

export const initializedSuccess = () => ({type: SET_INITIALIZED});

export const initializeApp = () => async (dispatch) => {
  let promise = dispatch(setUserData());
  await Promise.all([promise]);
  dispatch(initializedSuccess());
};
