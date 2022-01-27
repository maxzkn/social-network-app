import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

// const Users = (props) => {

//  let requestUsers = () => {
//     if (props.users.length == 0) {
//         axios.get('https://social-network.samuraijs.com/api/1.0/users').then( response => {
//            props.setUsers(response.data.items);
//         })
//      }
//  }

//   return (
//     <div>
//       <button onClick={requestUsers}>Fetch users</button>
//       {props.users.map( user =>
//         <div key={user.id}>
//           <div>
//             <img className={styles.image} src={user.photos.small ? user.photos.small : defaultPic} alt="" />
//           </div>
//           <div>{user.fullname}</div>
//           <div>{user.status}</div>
//           <div>{"user.location.country"}</div>
//           <div>{"user.location.city"}</div>
//           <div>
//             {user.followed ? (
//               <button onClick={ () => {props.unfollowUser(user.id)} }>Unfollow</button>
//             ) : (
//               <button onClick={ () => {props.followUser(user.id)} }>Follow</button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )};

type UsersPropsType = {
    currentPage: number,
    onPageChange: () => void,
    totalItemsCount: number,
    pageSize: number,
    users: Array<UserType>,
    followUser: (userId: number) => void,
    unfollowUser: (userId: number) => void,
    userFollowInProgress: Array<number>,
}

const Users: React.FC<UsersPropsType> = ({
                   currentPage,
                   onPageChange,
                   // onPortionNumberChange,
                   totalItemsCount,
                   pageSize,
                   // portionNumber,
                   users,
                   followUser,
                   userFollowInProgress,
                   unfollowUser
}) => {
    return (
        <div>
            <Paginator currentPage={currentPage}
                       onPageChange={onPageChange}
                       // onPortionNumberChange={onPortionNu mberChange}
                       totalItemsCount={totalItemsCount}
                       pageSize={pageSize}
                       // portionNumber={portionNumber}
            />
            {users.map( user =>
                <User
                    user={user}
                    followUser={followUser}
                    unfollowUser={unfollowUser}
                    userFollowInProgress={userFollowInProgress}
                /> )}
        </div>
        )
}

export default Users;
