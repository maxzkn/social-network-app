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
        ...action.data,
        isAuth: true
      }
    default:
      return state;
  }
};

export default authReducer;

export const setUserAuthData = (userId, email, userName) => ({type: SET_USER_DATA, data: {userId, email, userName}})
