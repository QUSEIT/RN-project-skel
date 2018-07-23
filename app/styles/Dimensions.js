import React from 'react'
import {Dimensions} from "react-native";
import AppUtil from "../common/AppUtil";

export default class Dimension{
    static windowWidth  = Dimensions.get('window').width;
    static windowHeight  = Dimensions.get('window').height;
    static topBlankHeight = AppUtil.isAnfroid()?0:20;
}