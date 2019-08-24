import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { GEO_HASH, TABBAR_INFOR, CATEGORY_LIST, NEARBY_SHOP } from './actionTypes'

const initialState = {
    geo_hash: '',
    tabbar_info_list: {},
    category_list: [],
    nearby_shop_list: []
}

export const takeoutReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GEO_HASH:
            return { ...state, ...payload }

        case TABBAR_INFOR:
            return { ...state, ...{ tabbar_info_list: payload } }

        case CATEGORY_LIST:
            return { ...state, ...{ category_list: payload } }

        case NEARBY_SHOP:
            return { ...state, ...{ nearby_shop_list: payload } }

        default:
            return state
    }
}

/**
 * home页面的轮播商品分类
 */
export const takeoutPersistConfig = {
    key: 'take_out',
    storage,
    whitelist: ['geo_hash']
}
