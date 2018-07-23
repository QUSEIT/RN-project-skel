import React from 'react'
import NavigationActions from "react-navigation/src/NavigationActions";

export default class BaseController extends React.PureComponent{
    back = ()=>{
        this.props.dispatch(NavigationActions.back())
    }
}