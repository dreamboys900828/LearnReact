import React from 'react';
//后缀是.js的可以省略
import CitiesComponent from '../pages/cities/cities';
import CitiesSearchComponent from '../pages/citiesSearch/citiesSearch';
import Component404 from '../pages/404/404';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import TodoList from '../pages/todolist/TodoList';
import { HomeComponent } from '../pages/home/home';
import TakeoutComponent from '../pages/takeout/takeout';
import SearchComponent from '../pages/search/search';
import OrderComponent from '../pages/order/order';
import MineComponent from '../pages/mine/mine';


export default function RouterComponent() {
    return (
        <div>
            {/*HashRouter / BrowserRouter：是对路由配置的容器，不能省略 */}
            <BrowserRouter>
                {/* 
        1.只能在 <Switch> 组件内使用 <Redirect from>，以匹配一个位置。
        2.没有switch，可能会匹配多个Route， 加上后，只显示第一个匹配成功的Route
         */}
                <Switch>
                    {/*  根路径/ 默认可以匹配到所有
         exact: 默认情况下， 浏览器的地址/b/c会和path中/b匹配成功，加上exact后，必须完全相等才能匹配
         */}
                    <Route exact path='/' component={CitiesComponent} />
                    <Route exact path='/city/:id/:name' component={CitiesSearchComponent} />


                    {/* 外卖页 多级路由 */}
                    <Route path='/home' render={() => {
                        return (
                            <HomeComponent>
                                <Route exact path='/home/takeout' component={TakeoutComponent} />
                                <Route exact path='/home/search' component={SearchComponent} />
                                <Route exact path='/home/order' component={OrderComponent} />
                                <Route exact path='/home/mine' component={MineComponent} />
                            </HomeComponent>
                        )
                    }} />


                    <Redirect from="/fuck" to="/" />
                    <Route path='/todolist' component={TodoList}></Route>
                    {/* 只要上面匹配不到，都可以让我匹配 */}
                    <Route component={Component404} />
                </Switch>
            </BrowserRouter>

        </div>
    );
}