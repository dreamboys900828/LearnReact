import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from './actionTypes'

const initialState = {
    inputValue: 'Write Something',
    list: [
        '早上 9 点, 分配大家今天的代码',
        '早上 10 点，与项目经理开需求沟通会',
        '晚 5 点， 与项目组成员组织Review代码'
    ]
}

export default (state = initialState, { type, payload }) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (type) {

        case CHANGE_INPUT:
            newState.inputValue = payload
            return newState

        case ADD_ITEM:
            console.log(payload)
            newState.inputValue = payload
            newState.list.push(payload)
            return newState

        case DELETE_ITEM:
            newState.inputValue = payload
            newState.list.splice(payload, 1)
            return newState

        default:
            return state
    }
}
