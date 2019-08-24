import { ADDRESS_LIST, FLUSH_HISTORY_LIST } from './actionType'

export const get_address_list = (address_history_list) => ({
    type: ADDRESS_LIST,
    address_history_list
})
export const flush_history_list = (address_history_list) => ({
    type: FLUSH_HISTORY_LIST,
    address_history_list
})

