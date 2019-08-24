import { ADDRESS_LIST, FLUSH_HISTORY_LIST } from './actionType'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const initialState = {
    address_history_list: [], // 地址列表也是历史列表
}

export const historySearchReducer = (state = initialState, { type, address_history_list }) => {

    switch (type) {
        case ADDRESS_LIST:
            return { ...state, address_history_list }

        case FLUSH_HISTORY_LIST:
            return { ...state, address_history_list }

        default:
            return state
    }
}

/**
 * citySearch搜索地址历史记录
 */
export const addressHistoryPersistConfig = {
    key: 'address_history_list',
    storage,
    whitelist: ['address_history_list']
}
