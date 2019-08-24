import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, List } from 'antd'

import { changeInputAction, addTodoList, deleteIndex } from '../../store/todolist/actionCreators'

class TodoList extends Component {

    render() {
        const { value, addList, changeInputValue, deleteItem } = this.props;
        return (
            <div style={{ margin: '.1rem' }}>
                <div>
                    <Input
                        ref="input"
                        placeholder={value.inputValue}
                        style={{ width: '250px', marginRight: '.1rem' }}
                        onChange={(e) => {
                            changeInputValue(e.target.value)
                        }}
                    />
                    <Button
                        type='primary'
                        onClick={() => {
                            addList(value.inputValue)
                        }}
                    >增加</Button>
                </div>
                <div style={{ margin: '.1rem', width: '300px' }}>
                    <List
                        bordered
                        dataSource={value.list}
                        renderItem={(item, key) => (<List.Item onClick={() => {
                            deleteItem(key)
                        }}>{item}</List.Item>)}
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        value: state.todo_list
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeInputValue: (value) => {
            console.log(value)
            dispatch(changeInputAction(value))
        },
        addList: (value) => {
            dispatch(addTodoList(value))
        },
        deleteItem: (key) => {
            dispatch(deleteIndex(key))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
