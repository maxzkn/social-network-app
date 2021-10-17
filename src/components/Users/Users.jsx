import React from "react";
import styles from './Users.module.css';
import defaultPic from '../../assets/images/avatar.png';
import { NavLink } from "react-router-dom";

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

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map( (page, idx) => 
                    <span key={idx} className={ props.currentPage === page ? styles.activePage : '' }
                    onClick={() => { props.onPageChange(page) }} >{page}</span>
                )}
            </div>
            {props.users.map( user => 
            <div key={user.id}>
                <div>
                <NavLink to={`/profile/${user.id}`}>
                    <img className={styles.image} src={user.photos.small ? user.photos.small : defaultPic} alt="" />
                </NavLink>
                </div>
                <div>{user.name}</div>
                <div>{user.status}</div>
                {/* <div>{"user.location.country"}</div> */}
                {/* <div>{"user.location.city"}</div> */}
                <div>
                {user.followed ? (
                    <button disabled={props.userFollowInProgress.some(id => id === user.id)}
                            onClick={ () => { props.unfollowUser(user.id) } }>
                        Unfollow
                    </button>
                ) : (
                    <button disabled={props.userFollowInProgress.some(id => id === user.id)}
                            onClick={ () => { props.followUser(user.id) } }>
                        Follow
                    </button>
                )}
                </div>
            </div>
            )}
        </div>
        )
}

export default Users;
