import { TABBAR_INFOR, CATEGORY_LIST, NEARBY_SHOP, GEO_HASH } from './actionTypes'
import { msiteAddress } from '../../../service';

export const user_geo_hash = (geo_hash) => ({
    type: GEO_HASH,
    payload: geo_hash
})

export const tabbar_info_list = (tabbar_info_list) => ({
    type: TABBAR_INFOR,
    payload: tabbar_info_list
})
export const category_list = (category_list) => ({
    type: CATEGORY_LIST,
    payload: category_list
})

export const nearby_shop_list = (nearby_shops) => ({
    type: NEARBY_SHOP,
    payload: nearby_shops
})
// redux-thunk 格式的 dispatch
// 存储经纬度
export const CHANGE_GEO_HASH = (geo_hash) => {
    return (dispatch) => {
        dispatch(user_geo_hash(geo_hash))
    }
}

export const CHANGE_TAB_INFO_LIST = (geo_hash) => {
    return (dispatch) => {
        msiteAddress(geo_hash).then((res) => {
            dispatch(tabbar_info_list(res.data))
        }).catch(err => {
            throw new Error(err + 'the resource is empty!')
        })
    }
}



