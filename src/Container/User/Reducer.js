import * as types from './ActionTypes';

const initialState = {
    userDetails: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER:
            return {
                ...state,
                userDetails: action.payload,
            }
        default:
            return state
    }
}