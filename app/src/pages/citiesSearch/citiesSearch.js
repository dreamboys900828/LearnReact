import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

import { NavBar, Icon } from 'antd-mobile';

import styles from "./citiesSearch.module.scss";

import { get_address_list, flush_history_list } from './store/actionCreator'
import { searchplace } from '../../service';

class CitiesSearchComponent extends Component {

    // 动态路由的参数信息都爱this.props中保存
    render() {
        const { id, name } = this.props.match.params;
        const { list: { address_history_list }, deleteItem } = this.props;
        return (
            <div>
                {/* 头部 */}
                <div className={styles.header}>
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.go(-1)}
                        rightContent={[
                            <span key="0" onClick={() => this.props.history.push('/')}>切换城市</span>
                        ]}
                    >{name}</NavBar>
                </div>
                {/* 搜索体 */}
                <div className={styles.searchContainer}>

                    <section className={styles.searchInput}>
                        <input type="text" ref="searchInput" placeholder="输入学校、商务楼、地址" className={styles.sInput} />
                        <button className={styles.btn} onClick={this.getSearchAddress.bind(this, id)}>提交</button>
                    </section>

                    {
                        address_history_list.length > 0 && <p className={styles.sHistory}>搜索历史</p>
                    }
                    <ul className={styles.getpois_ul}>
                        {
                            address_history_list.length > 0 && address_history_list.map((v, k) => {

                                return (
                                    <li
                                        key={k + v}
                                        className={styles.getpois_li
                                        }>
                                        <NavLink to={'/home/takeout?geohash=' + v.geohash}>
                                            <h4 className={`${styles['address-tittle']} ellipsis`}>{v.name}</h4>
                                            <p className={`${styles['address-desc']} ellipsis`}>{v.address}</p>
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {
                        address_history_list.length > 0
                        &&
                        <div
                            className={styles.clearAll}
                            onClick={() => {
                                deleteItem()
                            }}
                        >
                            <p>清空所有</p>
                        </div >
                    }


                </div >
            </div >
        )
    }


    // 获取搜索数据
    getSearchAddress = (id) => {
        const keyword = this.refs.searchInput.value
        searchplace(id, keyword).then((res) => {
            this.props.getData(res.data)
        })
    }


}
const mapStateToProps = (state, ownProps) => {

    return {
        list: state.address_history_list
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getData: (res) => {
            dispatch(get_address_list(res))
        },
        deleteItem: () => {
            dispatch(flush_history_list([]))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CitiesSearchComponent)
