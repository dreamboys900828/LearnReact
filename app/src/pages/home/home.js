import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

import styles from './home.module.scss'

export class HomeComponent extends Component {
    render() {
        return (
            <div>
                {this.props.children}
                {/* 类似vue的 <Router-view /> */}
                <div className={styles.navbar}>

                    <div className={styles.item}>
                        <NavLink to='/home/takeout' activeStyle={{ color: '#ff6600' }}>
                            <i className='myFont'>&#xe60c;</i>
                            <p>外卖</p>
                        </NavLink>
                    </div>
                    <div className={styles.item}>
                        <NavLink to='/home/search' activeStyle={{ color: '#ff6600' }}>
                            <i className='myFont'>&#xe711;</i>
                            <p>搜索</p>
                        </NavLink>
                    </div>
                    <div className={styles.item}>
                        <NavLink to='/home/order' activeStyle={{ color: '#ff6600' }}>
                            <i className='myFont'>&#xe631;</i>
                            <p>订单</p>
                        </NavLink>
                    </div>
                    <div className={styles.item}>
                        <NavLink to='/home/mine' activeStyle={{ color: '#ff6600' }}>
                            <i className='myFont'>&#xe685;</i>
                            <p>我的</p>
                        </NavLink>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
