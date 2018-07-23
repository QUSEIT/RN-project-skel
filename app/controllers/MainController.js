import React from 'react'
import MainView from '../views/MainView'
import {connect} from "react-redux";
import BaseController from "./BaseController";
import {
    Alert
} from 'react-native'

@connect()
export default class MainController extends BaseController{


    _rightPress = ()=>{
        Alert.alert("Message","Welcome to React Native.")
    };

    render(){
        return(
            <MainView
                back={this.back}
                rightPress={this._rightPress}
            />
        )
    }
}