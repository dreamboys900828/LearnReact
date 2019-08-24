import { getUrl } from './helpers'
import axios from 'axios'
/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => axios.get(getUrl(
    '/v1/pois/',
    {
        city_id: cityid,
        keyword: value
    }
))

/**
 * 获取msite页面地址信息
 */

export const msiteAddress = geohash => axios.get('/v2/pois/' + geohash);

/**
 * 获取msite页面食品分类列表
 */

export const msiteFoodTypes = geohash => axios.get(getUrl('/v2/index_entry', {
    geohash,
    group_type: '1',
    'flags[]': 'F'
}));

/**
 * 获取msite商铺列表
 */
export const shopLists = ({ latitude, longitude, offset, limit, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = [] }) => {
    let supportStr = '';
    support_ids.forEach(value => {
        if (value) {
            supportStr += '&support_ids[]=' + value;
        }
    });
    let data = {
        latitude,
        longitude,
        offset,
        limit,
        'extras[]': 'activities',
        keyword: '',
        restaurant_category_id,
        'restaurant_category_ids[]': restaurant_category_ids,
        order_by,
        'delivery_mode[]': delivery_mode + supportStr
    };
    return axios.get(getUrl('/shopping/restaurants', data));
};


/**
 * 获取food页面的 category 种类列表
 */

export const foodCategory = (latitude, longitude) => axios.get(getUrl('/shopping/v2/restaurant/category', {
    latitude,
    longitude
}));