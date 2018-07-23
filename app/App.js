/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import {create} from 'dva-core'
import {Provider} from 'react-redux'
import Router, {routerMiddleware} from "./router/Router";
import models from './models'

//创建dva app
const app = create();
//注册所有的model
models.forEach(model => app.model(model));
//启动app
app.start();
//初始化底层视图
const App = () => <Provider store={app._store}><Router/></Provider>;

export default App;