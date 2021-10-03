import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "b6229d74-0aac-4e3f-97e9-1dab19e45d99"
    }
})

export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then( response => {
            return response.data;
        })
    },

    followUser(userId) {
        return instance.post(`follow/${userId}`)
        .then( response => {
            return response.data;
        })
    },

    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`)
        .then( response => {
            return response.data;
        })
    }

}

export const authAPI = {
    authenticateUser() {
        return instance.get('auth/me')
        .then( response => response.data );
    }
}

export const profileAPI = {
    getUserProfile(userId) {
        return instance.get('profile/' + userId)
        .then( response => response.data );
    }
}
