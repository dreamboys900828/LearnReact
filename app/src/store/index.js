import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

/**
 * 持久化插件 reducer
 */

import { persistStore, persistReducer } from 'redux-persist'
/**
 * storage 在每个reducer文件内引入
 */

// 城市列表
import { cityPersistConfig, citiesReducer } from '../pages/cities/store';
// 搜索地址历史
import { addressHistoryPersistConfig, historySearchReducer } from '../pages/citiesSearch/store';
// 外卖首页
import { takeoutPersistConfig, takeoutReducer } from '../pages/takeout/store';
// 404 页面
import { notFoundPersistConfig, notFoundReducer } from '../pages/404/store';



// 合并reducer
const allReducer = combineReducers({
    page_city: persistReducer(cityPersistConfig, citiesReducer),
    take_out: persistReducer(takeoutPersistConfig, takeoutReducer),
    address_history_list: persistReducer(addressHistoryPersistConfig, historySearchReducer),
    not_found: persistReducer(notFoundPersistConfig, notFoundReducer),
})
/**
 * combineReducers 默默的产生了一个最大的state
 * bigState = {page404:{counter: 0, page: '404'},...}
 */

/**
 * 持久化根reducer
 */
// const persistedReducer = persistReducer(rootPersistConfig, allReducer)

// 增强函数
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))

// /* eslint-disable no-underscore-dangle */
const store = createStore(
    allReducer,
    enhancer
    // /* preloadedState, */
);
const persistor = persistStore(store)
export { store, persistor }
// /* eslint-enable */