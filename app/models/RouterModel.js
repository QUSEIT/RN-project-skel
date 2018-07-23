import {routerReducer} from "../router/Router";
import NavigationActions from "react-navigation/src/NavigationActions";
import {delay} from "../common";

const actions = [
    NavigationActions.BACK,
    NavigationActions.INIT,
    NavigationActions.NAVIGATE,
    NavigationActions.RESET,
    NavigationActions.SET_PARAMS,
    NavigationActions.URI,
];

/**
 * 路由相关
 * */
const RouterModel = {
    namespace: 'router',
    state: {
        ...routerReducer(),
    },
    reducers: {
        //改变路由状态
        apply(state, {payload: action}) {
            return routerReducer(state, action)
        },
    },
    effects: {
        //监视所有的事件
        watch: [
            function* watch({take, call, put}) {
                while (true) {
                    const payload = yield take(actions);
                    yield put({
                        type: 'apply',
                        payload,
                    });
                    if (payload.type === 'Navigation/NAVIGATE') {
                        yield call(delay, 500)
                    }
                }
            },
            {type: 'watcher'},
        ],
    },
};
export default RouterModel