// 核心react文件，必须要引入
import React from 'react';
import ReactDOM from 'react-dom';
// 全局样式
import './index.css';
// 引入App组件
import App from './App';
// 引入监听屏幕尺寸，设置html的字体大小文件
import './assets/js/resize';
// 引入所有antd-mobile的UI样式
import 'antd-mobile/dist/antd-mobile.css';
// 引入所有antd-pc的UI样式
import 'antd/dist/antd.css';
// 引入 axios api接口配置文件
import './axios';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById('root'));

