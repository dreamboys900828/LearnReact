import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Carousel, WingBlank } from 'antd-mobile'
import { NavBar, Icon } from 'antd-mobile';
import { NavLink } from 'react-router-dom'
import style from './takeout.module.scss'
import { msiteAddress, msiteFoodTypes, shopLists } from '../../service';
import { user_geo_hash, tabbar_info_list, category_list, nearby_shop_list } from './store/actionCreator';
import { ShopListStatelessUI } from '../common/shoplist/ShopListStatelessUI';

export class TakeoutComponent extends Component {

    componentDidMount() {

        let { change_geo_hash, change_tarbar_info, change_category_list } = this.props;
        let query = this.props.history.location.search;

        let queArr = query.substr(1).split('=')
        let geo_hash = queArr[1];

        // if (geo_hash === this.props.geo_hash) return;

        // 存储reducer 点击的城市经纬度(以后都会用到这个经纬度)
        change_geo_hash(geo_hash)
        // 调取接口查询当前详细位置信息
        msiteAddress(geo_hash).then((res) => {
            // 传输给reducer 存储
            change_tarbar_info(res.data)
        }).catch(err => {
            throw new Error(err + 'the resource is empty!')
        })
        let [latitude, longitude] = geo_hash.split(',')
        // 存储reducer 分类信息
        msiteFoodTypes(geo_hash)
            .then((res) => {
                // 传输给reducer 存储
                change_category_list(res.data)
            }).catch(err => {
                throw new Error(err + 'the resource is empty!')
            })
        // 存储reducer 初始的20家商铺列表
        this.getShopist({ latitude, longitude, offset: 0, limit: 20 })

    }

    // 调取商铺列表
    getShopist = (req) => {
        let { change_nearby_shop_list } = this.props
        shopLists(req)
            .then((res) => {
                change_nearby_shop_list(res.data)
            }).catch(err => {
                change_nearby_shop_list([])
            })
    }

    render() {
        let { geo_hash, tabbar_info_list, category_list, nearby_shop_list } = this.props;

        let newArr = [];
        newArr.push(category_list.slice(0, category_list.length / 2));
        newArr.push(category_list.slice(category_list.length / 2));

        return (
            <div>
                {/* 头部 */}
                <section className="header">
                    <NavBar
                        mode="dark"
                        icon={<Icon type="search" />}
                        onLeftClick={() => this.props.history.go(-1)}
                        rightContent={[
                            <span key="0" onClick={() => this.props.history.push('/')}>登录</span>
                        ]}
                    >
                        {tabbar_info_list.name}
                    </NavBar>
                </section>
                {/* 中间区域 */}
                <section className={style.main}>
                    {/* 分类导航区域 */}
                    <section className={style.msite_nav}>
                        <WingBlank className={style.wink}>
                            <Carousel
                                autoplay
                                infinite
                                dots={false}
                            >
                                {
                                    newArr && newArr.map((value, index) => (
                                        <ul className={style.food_types_container} key={index}>
                                            {
                                                value.map(v => (
                                                    <li className={style.link_to_food} key={v.id}>
                                                        <NavLink to={'/food/id' + v.id}>
                                                            <div className={style.child_con}>
                                                                <img src={`https://fuss10.elemecdn.com/${v.image_url}`} alt="" />
                                                                <span>{v.title}</span>
                                                            </div>
                                                        </NavLink>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    ))
                                }

                            </Carousel>
                        </WingBlank>
                    </section>
                    <section className={style.msite_main}>
                        <div className={style['shop-header']}>
                            <i className={`myFont ${style['shop-collect-o']}`}></i>
                            <span className={style['span-title']}>附近商家</span>
                            {/* 建议组件分离 */}
                            {
                                nearby_shop_list.length > 0 && <ShopListStatelessUI geo_hash={geo_hash} shoplist={nearby_shop_list} />
                            }
                        </div>
                    </section>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        geo_hash: state.take_out.geo_hash,
        tabbar_info_list: state.take_out.tabbar_info_list,
        category_list: state.take_out.category_list,
        nearby_shop_list: state.take_out.nearby_shop_list
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        change_geo_hash: (geo_hash) => {
            dispatch(user_geo_hash({ geo_hash }))
        },
        change_tarbar_info: (res) => {
            dispatch(tabbar_info_list(res))
        },
        change_category_list: (res) => {
            dispatch(category_list(res))
        },
        change_nearby_shop_list: (res) => {
            dispatch(nearby_shop_list(res))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TakeoutComponent)
