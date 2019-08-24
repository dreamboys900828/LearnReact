import { TABBAR_INFOR, CATEGORY_LIST, NEARBY_SHOP, GEO_HASH } from './actionTypes'

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


