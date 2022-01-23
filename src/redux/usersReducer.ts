import {usersAPI} from "../api/api";
import {updateObjectProp} from "../utils/helpers/updateObjectProp";
import {UserType} from "../types/types";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
const TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE-FOLLOWING-IN-PROGRESS";
// const SET_PORTION_NUMBER = "SET-PORTION-NUMBER";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  currentPage: 1,
  // portionNumber: 1,
  totalItemsCount: 0,
  isFetching: false,
  userFollowInProgress: [] as Array<number> // array of users IDs
};

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectProp(state.users, "id", action.userId, {followed: true})
        // state.users.map( user => {
        //   if (user.id === action.userId) {
        //     return { ...user, followed: true };
        //   }
        //   return user;
        // }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectProp(state.users, "id", action.userId, {followed: false})
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      };
    // case SET_PORTION_NUMBER:
    //   return {
    //     ...state,
    //     portionNumber: action.portionNumber
    //   };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalItemsCount: action.totalUsers
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }
    case TOGGLE_FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        userFollowInProgress: action.isFetching ?
            [...state.userFollowInProgress, action.userId]
            : state.userFollowInProgress.filter(id => id !== action.userId)
      }
    default:
      return state;
  }
};

export default usersReducer;

type FollowActionType = {
  type: typeof FOLLOW
  userId: number
}
// export const followAC = (userId) => ({ type: FOLLOW, userId: userId });
export const follow = (userId: number): FollowActionType => ({ type: FOLLOW, userId: userId });

type UnfollowActionType = {
  type: typeof UNFOLLOW
  userId: number
}
// export const unfollowAC = (userId) => {
//   return {
//     type: UNFOLLOW,
//     userId: userId,
//   };
// };
export const unfollow = (userId: number): UnfollowActionType => {
  return {
    type: UNFOLLOW,
    userId: userId,
  };
};

type SetUsersActionType = {
  type: typeof SET_USERS
  users: Array<UserType>
}
// export const setUsersAC = (users) => ({ type: SET_USERS, users });
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });

// export const changePortionNumber = (portionNumber) => ({ type: SET_PORTION_NUMBER, portionNumber });

//getUsersThunkCreator
export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(page));

  // usersAPI.getUsers(page, pageSize).then( data => {
  //           dispatch(toggleIsFetching(false));
  //           dispatch(setUsers(data.items));
  //           dispatch(setTotalItemsCount(data.totalCount));
  // });

  let data = await usersAPI.getUsers(page, pageSize)
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(setTotalItemsCount(data.totalCount));
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
  dispatch(toggleFollowingInProgress(true, userId));

  let data = await apiMethod(userId);

  if (data.resultCode === 0) {
      dispatch(actionCreator(userId));
  }

  dispatch(toggleFollowingInProgress(false, userId));
}

export const unfollowUser = (userId: number) => async (dispatch: any) => {
  let apiMethod = usersAPI.unfollowUser.bind(usersAPI); // на всякий случай - мы берем метод у обьекта и мы не знаем этот метод будет использовать this, а вызывать будем оторванно от обьекта поэтому контекст моэет потеряться
  await followUnfollowFlow(dispatch, userId, apiMethod, unfollow);
}

export const followUser = (userId: number) => async (dispatch: any) => {
  let apiMethod = usersAPI.followUser.bind(usersAPI);
  await followUnfollowFlow(dispatch, userId, apiMethod, follow);
}

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
// export const setCurrentPageAC = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType=> ({ type: SET_CURRENT_PAGE, currentPage });

type SetTotalItemsCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  totalUsers: number
}
// export const setTotalItemsCountAC = (totalUsers) => ({ type: SET_TOTAL_USERS_COUNT, totalUsers });
export const setTotalItemsCount = (totalUsers: number): SetTotalItemsCountActionType => ({ type: SET_TOTAL_USERS_COUNT, totalUsers });

type SetToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
// export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleIsFetching = (isFetching: boolean): SetToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });

type ToggleFollowInProgressActionType = {
  type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
  isFetching: boolean
  userId: number
}
export const toggleFollowingInProgress = (isFetching: boolean, userId: number): ToggleFollowInProgressActionType => ({ type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId });
