import React from "react";
import SplashController from "../controllers/SplashController";
import MainController from "../controllers/MainController";


//注册所有的页面路由
const StackRouteConfigs = {
    splash:{
        screen: SplashController
    },
    main:{
        screen: MainController
    }
};

export default StackRouteConfigs