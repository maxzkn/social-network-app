import React from "react";
import { connect } from "react-redux";
// import { followAC, setCurrentPageAC, settotalItemsCountAC, setUsersAC, toggleIsFetchingAC, unfollowAC } from "../../redux/usersReducer";
import {
    followUser,
    unfollowUser,
    requestUsers,
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {compose} from "redux";
import {
    getPageSize,
    getCurrentPage,
    getIsFetching,
    gettotalItemsCount,
    getUserFollowInProgress,
    getUsers,
    // getUsersSuperSelector
} from "../selectors/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

// TWO containers here:
// UsersContainer is wrapped with another container by connect()
// const connector = connect(mapState, mapDispatch) // HOC
// export default connector(UsersContainer) // pass UsersContainer to HOC

type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    currentPage: number
    totalItemsCount: number
    isFetching: boolean
    userFollowInProgress: Array<number>
}

type MapDispatchPropsType = {
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<UsersContainerPropsType> {

    // isn't necessary bc React does it by default, but if we want to also add smth or change, then
    // add a constructor
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        const { currentPage, pageSize } = this.props;
        this.props.requestUsers(currentPage, pageSize);
        // this.props.toggleIsFetching(true);
        // usersAPI.requestUsers(this.props.currentPage, this.props.pageSize).then( data => {
        //     this.props.toggleIsFetching(false);
        //     this.props.setUsers(data.items);
        //     this.props.settotalItemsCount(data.totalCount);
        // });
    }

    onPageChange = (pageNumber: number) => {
        const { pageSize } = this.props;
        this.props.requestUsers(pageNumber, pageSize);
    }

    // onPortionNumberChange = portionNumber => {
    //     this.props.changePortionNumber(portionNumber);
    // }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : 
                    <Users
                        pageSize={this.props.pageSize}
                        // portionNumber={this.props.portionNumber}
                        totalItemsCount={this.props.totalItemsCount}
                        currentPage={this.props.currentPage}
                        onPageChange={() => this.onPageChange}
                        // onPortionNumberChange={this.onPortionNumberChange}
                        followUser={this.props.followUser}
                        unfollowUser={this.props.unfollowUser}
                        users={this.props.users}
                        userFollowInProgress={this.props.userFollowInProgress}
                    />
                }
            </>
        );
    }
};

// let mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     currentPage: state.usersPage.currentPage,
//     totalItemsCount: state.usersPage.totalItemsCount,
//     isFetching: state.usersPage.isFetching,
//     userFollowInProgress: state.usersPage.userFollowInProgress
//   };
// };

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    // users: getUsersSuperSelector(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    totalItemsCount: gettotalItemsCount(state),
    isFetching: getIsFetching(state),
    userFollowInProgress: getUserFollowInProgress(state),
    // portionNumber: getPortionNumber(state),
  };
};

// let mapDispatchToProps = (dispatch) => {
//   return {
//     followUser: (userId) => {
//       dispatch(followAC(userId));
//     },
//     unfollowUser: (userId) => {
//       dispatch(unfollowAC(userId));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users));
//     },
//     setCurrentPage: (page) => {
//         dispatch(setCurrentPageAC(page));
//     },
//     settotalItemsCount: (totalUsers) => {
//         dispatch(settotalItemsCountAC(totalUsers));
//     },
//     toggleIsFetching: (isFetching) => {
//         dispatch(toggleIsFetchingAC(isFetching));
//     }
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

// const withRedirect = WithAuthRedirect(UsersContainer);

// export default WithAuthRedirect(connect(mapStateToProps, {
//     followUser,
//     unfollowUser,
//     requestUsers
// })(UsersContainer));
export default compose(
    // Cmd + click -> generic types for connect
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { followUser, unfollowUser, requestUsers, /* changePortionNumber */ })
)(UsersContainer);
