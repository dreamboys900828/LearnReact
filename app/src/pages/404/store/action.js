// 创建、记录当前组件所有action
// Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。
/*
{
  type: "ADD_TODO",
  text: 'Build my first Redux app'
}
*/
import { ADD_NUMBER } from './actionTypes'
export const addAction = (payload) => ({
    type: ADD_NUMBER,
    payload
})

