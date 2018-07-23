import {Platform} from "react-native";

export default class AppUtil{
    static isAnfroid(){
        return Platform.OS === 'android'
    }
}