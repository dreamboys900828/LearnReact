import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addAction } from './store/action'

class Component404 extends Component {
    render() {
        const { value, add } = this.props;
        return (
            <div>
                <h1>404界面</h1>
                <p>{value}</p>
                <button onClick={() => { add(100) }}>点击修改</button>
            </div>
        )
    }
}

// connect作用 和 store 产生连接
const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {
        value: state.not_found.counter
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    // 返回的这个对象，就是我们组建的props
    return {
        add: (num) => {
            dispatch(addAction(num))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Component404)
