import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from './actionTypes'

export const changeInputAction = (payload) => ({
    type: CHANGE_INPUT,
    payload
})

export const addTodoList = (payload) => ({
    type: ADD_ITEM,
    payload
})
export const deleteIndex = (payload) => ({
    type: DELETE_ITEM,
    payload
})


