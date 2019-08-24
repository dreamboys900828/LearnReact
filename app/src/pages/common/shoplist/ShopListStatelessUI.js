import React from 'react'

import style from './shoplist.module.scss'

/**
 * 商铺列表布局UI
 * @param {props} props 父组件传递的参数
 */
export const ShopListStatelessUI = (props) => {
    const { shoplist } = props;

    return (
        <div className={style.shop_main}>
            <ul className={style.shoplist_container}>
                {
                    shoplist && shoplist.map(v => {
                        return (
                            <ListStatelessUI key={v.id} item={v}></ListStatelessUI>
                        )
                    })
                }
            </ul>
        </div>
    )
}

/**
 * 商铺列表的li项
 * @param {props} props 父组件传递的参数
 */
export const ListStatelessUI = (props) => {
    const { item } = props;
    return (
        <li className={`clearfix ${style.shop_li}`}>
            <section>
                <img src={`http://elm.cangdu.org/img/${item.image_path}`} className={style.shop_img} alt="" />
            </section>
            <hgroup className={style.shop_right}>
                <header className={style.shop_detail_header}>
                    <h4>{omitEd(item.name)}</h4>

                    <ul className={style.shop_detail_ul}>
                        {
                            item.supports.length > 0 && item.supports.map(sup => {
                                return (
                                    <li className={style.supports} key={sup.id}>
                                        {sup.icon_name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </header>
                <h5 className={style.rating_order_num}>
                    <section className={style.rating_order_num_left}>
                        <span className={style.rating_section}>123</span>
                        <span className={style.rating_num}>{item.rating}</span>
                        <span className={style.order_section}>月售{item.rating_count}单</span>
                    </section>
                    <section className={style.rating_order_num_right}>
                        <span className={`${style.delivery_style} ${style.delivery_left}`}>蜂鸟快送</span>
                        <span className={`${style.delivery_style} ${style.delivery_right}`}>准时达</span>
                    </section>
                </h5>
                <h5 className={style.fee_distance}>
                    <p className={style.fee}>¥{item.float_minimum_order_amount}起送<span className={style.segmentation}>/</span>配送费约¥{item.float_delivery_fee}</p>
                    <p className={style.distance_time}>
                        <span>{item.distance}</span>
                        <span className={style.segmentation}>/</span>
                        <span className={style.order_time}>{item.order_lead_time}</span>
                    </p>
                </h5>
            </hgroup>
        </li>
    )
}

const omitEd = (value) => {
    if (value.length > 5) {
        return value.replace(value.substr(8), '...');
    } else {
        return value;
    }
}
