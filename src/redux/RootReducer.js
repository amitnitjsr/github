import storage from 'redux-persist/lib/storage'
import { persistCombineReducers } from 'redux-persist'
import BaseReducer from './BaseReducer';
import user from '../Container/User/Reducer';

const rootReducer = {
    baseReducer: BaseReducer,
    user
}

export const persistConfig = {
    key: 'Project.0.0',
    storage,
    blacklist: [
        'user',
    ]
}

const appReducer = persistCombineReducers(persistConfig, rootReducer)

const reducer = (state, action) => {
    return appReducer(state, action)
};

export default reducer;