import React from 'react'
import {
    View,
    StyleSheet,
    Text
} from 'react-native'
import Color from "../styles/Color";
import BaseView from "./BaseView";

export default class MainView extends BaseView {

    static defaultProps={
        title:'Main',
        showLeftIcon:false,
        showRightIcon:true,
        toolbarShowable: true,
    };

    renderContent() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Main Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.white
    },
    text: {
        fontSize: 24,
        color: Color.black
    }
});


