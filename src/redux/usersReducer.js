import {usersAPI} from "../api/api";
import {updateObjectProp} from "../utils/helpers/updateObjectProp";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
const TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE-FOLLOWING-IN-PROGRESS";
// const SET_PORTION_NUMBER = "SET-PORTION-NUMBER";

let initialState = {
  users: [],
  pageSize: 10,
  currentPage: 1,
  // portionNumber: 1,
  totalItemsCount: 0,
  isFetching: false,
  userFollowInProgress: []
};

const usersReducer = (state = initialState, action) => {

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

// export const followAC = (userId) => ({ type: FOLLOW, userId: userId });
export const follow = (userId) => ({ type: FOLLOW, userId: userId });

// export const unfollowAC = (userId) => {
//   return {
//     type: UNFOLLOW,
//     userId: userId,
//   };
// };

export const unfollow = (userId) => {
  return {
    type: UNFOLLOW,
    userId: userId,
  };
};

// export const setUsersAC = (users) => ({ type: SET_USERS, users });
export const setUsers = (users) => ({ type: SET_USERS, users });

// export const changePortionNumber = (portionNumber) => ({ type: SET_PORTION_NUMBER, portionNumber });

//getUsersThunkCreator
export const requestUsers = (page, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(page));

  // usersAPI.getUsers(page, pageSize).then( data => {
  //           dispatch(toggleIsFetching(false));
  //           dispatch(setUsers(data.items));
  //           dispatch(settotalItemsCount(data.totalCount));
  // });

  let data = await usersAPI.getUsers(page, pageSize)
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(settotalItemsCount(data.totalCount));
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleFollowingInProgress(true, userId));

  let data = await apiMethod(userId);

  if (data.resultCode === 0) {
      dispatch(actionCreator(userId));
  }

  dispatch(toggleFollowingInProgress(false, userId));
}

export const unfollowUser = (userId) => async (dispatch) => {
  let apiMethod = usersAPI.unfollowUser.bind(usersAPI);
  await followUnfollowFlow(dispatch, userId, apiMethod, unfollow);
}

export const followUser = (userId) => async (dispatch) => {
  let apiMethod = usersAPI.followUser.bind(usersAPI);
  await followUnfollowFlow(dispatch, userId, apiMethod, follow);
}

// export const setCurrentPageAC = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });

// export const settotalItemsCountAC = (totalUsers) => ({ type: SET_TOTAL_USERS_COUNT, totalUsers });
export const settotalItemsCount = (totalUsers) => ({ type: SET_TOTAL_USERS_COUNT, totalUsers });

// export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const toggleFollowingInProgress = (isFetching, userId) => ({ type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId });
