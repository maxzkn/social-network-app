import React from "react";
import styles from './Users.module.css';
import defaultPic from '../../assets/images/avatar.png';
import { NavLink } from "react-router-dom";

const User = ({ user, followUser, userFollowInProgress, unfollowUser }) => {
    return (
        <div>
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
                        <button disabled={userFollowInProgress.some(id => id === user.id)}
                                onClick={ () => { unfollowUser(user.id) } }>
                            Unfollow
                        </button>
                    ) : (
                        <button disabled={userFollowInProgress.some(id => id === user.id)}
                                onClick={ () => { followUser(user.id) } }>
                            Follow
                        </button>
                    )}
                </div>
            </div>
        </div>
        )
}

export default User;
