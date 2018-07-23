import React from 'react'
import {connect} from "react-redux";
import SplashView from "../views/SplashView";
import {delay} from "../common";
import NavigationActions from "react-navigation/src/NavigationActions";


@connect()
export default class SplashController extends React.PureComponent{


    componentDidMount(){
        this.checkLogin();
    }

    render(){
        return(
            <SplashView/>
        )
    }

    checkLogin = async () =>{
        await delay(2000);
        this.props.dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'main'})],
        }));
    }
}