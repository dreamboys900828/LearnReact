import React, { Component } from 'react';
import styles from "./cities.module.scss";
import axios from "axios";
import { NavBar, Icon } from 'antd-mobile';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { mapCitiesAction } from './store/action';

class CitiesComponent extends Component {

    render() {
        let { guessCity, hotCities, groupCities } = this.props;

        return (
            <div className={styles['cities-wrap']}>
                <NavBar
                    mode="dark"
                >城市选择</NavBar>
                <div className={styles['cities-content']}>
                    <div className={styles.guest}>
                        <div>
                            <p>当前定位城市：</p>
                            <p>定位不准时，请在城市列表中选择</p>
                        </div>
                        <NavLink to={'/city/' + guessCity.id + '/' + guessCity.name}>
                            <span>{guessCity && guessCity.name}</span>
                            <Icon type="right" />
                        </NavLink>
                    </div>
                    {/* guest-end */}
                    <div className={styles.hot}>
                        <ul>
                            {hotCities && hotCities.map((hotCity) => {
                                return (<li key={hotCity.id}>
                                    <NavLink to={'/city/' + hotCity.id + '/' + hotCity.name}>
                                        {hotCity.name}
                                    </NavLink>
                                </li>);
                            })}
                        </ul>
                    </div>
                    {/*hot-end  */}

                    <div className={styles.group}>
                        {groupCities && Object.keys(groupCities).map((k) => {
                            return (
                                <div key={k}>
                                    <p className={styles.key}> {k} </p>
                                    <ul>
                                        {groupCities[k].map(groupCity => {
                                            return <li className='ellipsis' key={groupCity.id}>
                                                <NavLink to={'/city/' + groupCity.id + '/' + groupCity.name}>
                                                    {groupCity.name}
                                                </NavLink>
                                            </li>
                                        })

                                        }
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                    {/* group-end */}
                </div>
                {/* cities-content-end */}
            </div>
        );
    }
    // 定位城市
    requestCities(type) {
        return axios.get("/v1/cities?type=" + type);
    }
    componentDidMount() {
        // 借助缓存 判断是偶第一次加载 每次进来页面，state都被初始化了
        // 防止多次请求 优化请求
        let { groupCities } = this.props;
        if (Object.keys(groupCities).length !== 0) { return }
        // console.log('componentDidMount')
        // 处理一个界面，多个请求；可以监听所有请求都成功的回调
        let guess = this.requestCities("guess");
        let hot = this.requestCities("hot");
        let group = this.requestCities("group");
        axios.all([guess, hot, group])
            .then((res) => {
                this.props.mapCities(res)
            });

    }
}

//所有城市排序
const sortCities = (unordered) => {
    const ordered = {};
    Object.keys(unordered).sort().forEach(function (key) {
        ordered[key] = unordered[key];
    });
    return ordered;
}

const mapStateToProps = (state, ownProps) => {
    let { guessCity, hotCities, groupCities } = state.page_city
    return { guessCity, hotCities, groupCities }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        mapCities: (res) => {
            // 让reducer保存城市信息
            let guessCity = res[0].data
            let hotCities = res[1].data
            let groupCities = sortCities(res[2].data)
            dispatch(mapCitiesAction({ guessCity, hotCities, groupCities }))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CitiesComponent)