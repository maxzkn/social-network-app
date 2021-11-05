// простой селектор который возвращает обьект
import {createSelector} from "reselect";

const getUsersSelector = (state) => {
    return state.usersPage.users;
};

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
};

// селектор который хочет произвести какую то манипуляцию и возвращает новый обьект
// запускается логика каждый раз
// и поэтому каждый раз перерисовывается компонента что есть плохо
// export const getUsersFilterSelector = (state) => {
//     return getUsers(state).filter(u => true);
// };

// реселект помогает это исправить и запускает логику только если надо
// поэтому передаем dependencies и если что-то нужное в стейте поменялось тогда логика запускается
// если не поменялось тогда возвращает кэшированный ранее просчитанный логикой стэйт
export const getUsers = createSelector(getUsersSelector, getIsFetching, (users, isFetching) => {
    return users.filter(u => true);
});

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
};

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
};

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
};

export const getUserFollowInProgress = (state) => {
    return state.usersPage.userFollowInProgress;
};
