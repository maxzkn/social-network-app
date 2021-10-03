import React from "react";
import { connect } from "react-redux";
// import { followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, toggleIsFetchingAC, unfollowAC } from "../../redux/usersReducer";
import { follow, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching, unfollow } from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import { usersAPI } from "../../api/api";

// TWO containers here:
// UsersContainer is wrapped with another container by connect()

class UsersContainer extends React.Component {

    // isn't necessary bc React does it by default, but if we want to also add smth or change, then
    // add a constructor
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then( data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
        });
    }

    onPageChange = pageNumber => {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        usersAPI.getUsers(pageNumber, this.props.pageSize).then( data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
        });
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : 
                    <Users pageSize={this.props.pageSize}
                        totalUsersCount={this.props.totalUsersCount}
                        currentPage={this.props.currentPage}
                        onPageChange={this.onPageChange}
                        followUser={this.props.followUser}
                        unfollowUser={this.props.unfollowUser}
                        users={this.props.users}
                    />
                }
            </>
        );
    }
};

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    totalUsersCount: state.usersPage.totalUsersCount,
    isFetching: state.usersPage.isFetching
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
//     setTotalUsersCount: (totalUsers) => {
//         dispatch(setTotalUsersCountAC(totalUsers));
//     },
//     toggleIsFetching: (isFetching) => {
//         dispatch(toggleIsFetchingAC(isFetching));
//     }
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
export default connect(mapStateToProps, {
    followUser: follow,
    unfollowUser: unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
})(UsersContainer);