import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "d4dac777-b20f-4fdb-b317-0bdf320dd9a0"
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
    authenticateMe() {
        return instance.get('auth/me')
        .then( response => response.data );
    },
    login(email, password, rememberMe = false, captcha) {
        return instance.post('auth/login', { email, password, rememberMe, captcha })
            .then( response => response.data );
    },
    logout() {
        return instance.delete('auth/login')
            .then( response => response.data );
    }
}

export const profileAPI = {
    getUserProfile(userId) {
        return instance.get('profile/' + userId)
        .then( response => response.data );
    },

    getUserStatus(userId) {
        return instance.get('/profile/status/' + userId).then(
            response => response.data
        );
    },

    updateUserStatus(status) {
        return instance.put('/profile/status', { status }).then(
            response => response.data
        );
    },

    saveProfilePhoto(file) {
        const formData = new FormData();
        formData.append("image", file);

        return instance.put('/profile/photo', formData, {
            'Content-Type': 'multipart/form-data'
        }).then(
            response => response.data
        );
    },

    saveProfile(profileData) {
       return instance.put('/profile', profileData).then(
           response => response.data
       );
    }
}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get('security/get-captcha-url')
        .then( response => response.data );
    }
}
