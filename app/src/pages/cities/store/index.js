import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { MAP_CITIES_TYPE } from './actionTypes'

const initialState = {
    // 数据类型根据返回值设置
    guessCity: {},
    hotCities: [],
    groupCities: {}
    // 历史记录
    // 搜索结果
}

export const citiesReducer = (state = initialState, { type, guessCity, hotCities, groupCities }) => {
    switch (type) {

        case MAP_CITIES_TYPE:
            return { ...state, guessCity, hotCities, groupCities }

        default:
            return state
    }
}

/**
 * 首页城市列表
 */
export const cityPersistConfig = {
    key: 'page_city',
    storage,
    // 配置白名单，pageCity将会被缓存
    whitelist: ['guessCity', 'hotCities', 'groupCities']
}

