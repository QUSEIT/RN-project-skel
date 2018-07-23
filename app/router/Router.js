import React, {PureComponent} from 'react';
import {BackHandler, Animated, Easing} from 'react-native';
import {
    addNavigationHelpers,
    StackNavigator,
    NavigationActions,
} from 'react-navigation';
import {connect} from 'react-redux';
import {
    initializeListeners,
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import StackRouteConfigs from "./StackRouteConfigs";

const StackNavigatorConfigs = {
    headerMode: 'none',
    mode: 'card',
    navigationOptions: {
        gesturesEnabled: false,
    },
    //配置转场效果
    transitionConfig: () => ({
        transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            const {layout, position, scene} = sceneProps;
            const {index} = scene;
            const width = layout.initWidth;
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [width, 0, 0],
            });
            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            });
            return {opacity, transform: [{translateX}]}
        },
    }),
};

/**
 * app的导航组件，所有的页面都要在此注册，才能跳转
 * */
const AppNavigator = StackNavigator(
    //注册所有的页面
    StackRouteConfigs,
    StackNavigatorConfigs
);

//用于做路由跳转
const routerReducer = (state, action = {}) => {
    console.log("navigation", action.type);
    return AppNavigator.router.getStateForAction(action, state)
};

const routerMiddleware = createReactNavigationReduxMiddleware("root", state => state.router);
const addListener = createReduxBoundAddListener("root");

/**
 * 获取当前的页面
 * */
function getCurrentScreen(navigationState) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getCurrentScreen(route)
    }
    return route.routeName
}

let lastTime = 0;

/**
 * 添加connect装饰器在打开该页面时注入model
 * */
@connect(({router}) => ({router}))
export default class Router extends PureComponent {

    componentWillMount() {
        //在页面挂载前添加返回键监视器
        BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }

    componentDidMount() {
        //初始化root监视器
        initializeListeners('root', this.props.router)
    }

    componentWillUnmount() {
        //在页面卸载时移除返回键监视器
        BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }

    /**
     * 处理返回事件
     * */
    backHandle = () => {
        const currentScreen = getCurrentScreen(this.props.router);

        if (currentScreen === 'splash' || currentScreen === 'main' || currentScreen === 'login') {

            const now = new Date().getTime();
            const delta = now - lastTime;
            lastTime = now;
            return delta > 2000
        } else {
            this.props.dispatch(NavigationActions.back());
            return true
        }
    };

    render() {
        const {dispatch, router} = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            state: router,
            addListener,
        });
        return <AppNavigator navigation={navigation}/>
    }
}

export {routerReducer, routerMiddleware, addListener}


