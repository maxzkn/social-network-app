import {setUserData} from "./authReducer";

const SET_INITIALIZED_SUCCESS = "SET-INITIALIZED-SUCCESS"

export type InitialStateType = {
  initialized: boolean,
}

let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      }
    default:
      return state;
  }
};

export default appReducer;

type InitializedSuccessActionType = {
  type: typeof SET_INITIALIZED_SUCCESS; // only "SET-INITIALIZED-SUCCESS", typeof в TS выводит не тип как JS, а значение
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: SET_INITIALIZED_SUCCESS});

export const initializeApp = () => async (dispatch: any) => {
  let promise = dispatch(setUserData());
  await Promise.all([promise]);
  dispatch(initializedSuccess());
};
