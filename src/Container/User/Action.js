import * as types from './ActionTypes';

export const setUserData = (data) => {
    const { allData } = data;
    return (dispatch, getState) => {
        return dispatch({ type: types.GET_USER, payload: allData });
    }
}
