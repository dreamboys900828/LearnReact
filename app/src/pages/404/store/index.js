import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { ADD_NUMBER } from './actionTypes'

const initialState = {
    counter: 0,
    page: '404'
}

export const notFoundReducer = (state = initialState, { type, payload }) => {
    // 深拷贝state对象， 直接修改state在redux-redux中 监听不到修改
    let newState = JSON.parse(JSON.stringify(state));
    switch (type) {

        case ADD_NUMBER:
            newState.counter = newState.counter + payload;
            return newState;

        default:
            return state
    }
}

/**
 * 404
 */
export const notFoundPersistConfig = {
    key: 'not_found',
    storage,
    whitelist: ['counter']
}
