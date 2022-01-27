// простой селектор который возвращает обьект
import {createSelector} from "reselect";
import {AppStateType} from "../../redux/redux-store";

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
};

export const getIsFetching = (state: AppStateType) => {
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

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
};

// export const getPortionNumber = (state: AppStateType) => {
//     return state.usersPage.portionNumber;
// };

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
};

export const gettotalItemsCount = (state: AppStateType) => {
    return state.usersPage.totalItemsCount;
};

export const getUserFollowInProgress = (state: AppStateType) => {
    return state.usersPage.userFollowInProgress;
};
